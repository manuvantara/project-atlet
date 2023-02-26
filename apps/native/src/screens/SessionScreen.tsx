import { Button, Center, Heading } from 'native-base';
import type { RootStackScreenProps } from '../types/navigation';
import { useRef, useState } from 'react';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import { Sensor } from '../types/session-metadata';
import { SENSOR_READINGS_BATCH_SIZE } from '../utils/constants';
import SessionsLocalService from '../utils/SessionsLocalService';
import type { SensorReading } from '../types/sensors';
import { usePrivateKeyStore } from '../stores/privateKey.store';

export default function SessionScreen({
                                        navigation,
                                        route,
                                      }: RootStackScreenProps<'SessionScreen'>) {
  const { sessionMetadata } = route.params;
  const privateKey = usePrivateKeyStore((state) => state.privateKey);

  const [isRecording, setIsRecording] = useState(false);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sessionsLocalService = useRef(new SessionsLocalService(privateKey));

  const temporarySensorReadingsBatch = useRef<SensorReading[]>([]);

  const [accelerometerSubscription, setAccelerometerSubscription] = useState<{
    remove: () => void;
  } | null>(null);
  const [gyroscopeSubscription, setGyroscopeSubscription] = useState<{
    remove: () => void;
  } | null>(null);
  const [magnetometerSubscription, setMagnetometerSubscription] = useState<{
    remove: () => void;
  } | null>(null);

  const _accelerometerSubscribe = () => {
    setAccelerometerSubscription(
      Accelerometer.addListener(({ x, y, z }) => {
        if (
          temporarySensorReadingsBatch.current.length ===
          SENSOR_READINGS_BATCH_SIZE
        ) {
          console.log('batch full');

          // TODO: test with await and without await
          sessionsLocalService.current.writeSensorReadingBatch(
            temporarySensorReadingsBatch.current
          );

          temporarySensorReadingsBatch.current = [];
        }

        temporarySensorReadingsBatch.current.push({
          timestamp: Date.now(),
          sensor: Sensor.ACCELEROMETER,
          xAxis: x,
          yAxis: y,
          zAxis: z,
        });
      })
    );
  };

  const _gyroscopeSubscribe = () => {
    setGyroscopeSubscription(
      Gyroscope.addListener(({ x, y, z }) => {
        if (
          temporarySensorReadingsBatch.current.length ===
          SENSOR_READINGS_BATCH_SIZE
        ) {
          console.log('batch full');

          // TODO: test with await and without await
          sessionsLocalService.current.writeSensorReadingBatch(
            temporarySensorReadingsBatch.current
          );

          temporarySensorReadingsBatch.current = [];
        }

        temporarySensorReadingsBatch.current.push({
          timestamp: Date.now(),
          sensor: Sensor.GYROSCOPE,
          xAxis: x,
          yAxis: y,
          zAxis: z,
        });
      })
    );
  };

  const _magnetometerSubscribe = () => {
    setMagnetometerSubscription(
      Magnetometer.addListener(({ x, y, z }) => {
        if (
          temporarySensorReadingsBatch.current.length ===
          SENSOR_READINGS_BATCH_SIZE
        ) {
          console.log('batch full');

          // TODO: test with await and without await
          sessionsLocalService.current.writeSensorReadingBatch(
            temporarySensorReadingsBatch.current
          );

          temporarySensorReadingsBatch.current = [];
        }

        temporarySensorReadingsBatch.current.push({
          timestamp: Date.now(),
          sensor: Sensor.MAGNETOMETER,
          xAxis: x,
          yAxis: y,
          zAxis: z,
        });
      })
    );
  };

  const _accelerometerUnsubscribe = () => {
    accelerometerSubscription && accelerometerSubscription.remove();
    setAccelerometerSubscription(null);
  };

  const _gyroscopeUnsubscribe = () => {
    gyroscopeSubscription && gyroscopeSubscription.remove();
    setGyroscopeSubscription(null);
  };

  const _magnetometerUnsubscribe = () => {
    magnetometerSubscription && magnetometerSubscription.remove();
    setMagnetometerSubscription(null);
  };

  // useEffect(() => {
  //   Accelerometer.setUpdateInterval(16);
  //   _gyroscopeSubscribe();
  //
  //   return () => _accelerometerUnsubscribe();
  // }, [isRecording]);

  const handleStartRecording = async () => {
    setIsRecording(true);

    Accelerometer.setUpdateInterval(sessionMetadata.sensorUpdateInterval);
    _accelerometerSubscribe();

    Gyroscope.setUpdateInterval(sessionMetadata.sensorUpdateInterval);
    _gyroscopeSubscribe();

    Magnetometer.setUpdateInterval(sessionMetadata.sensorUpdateInterval);
    _magnetometerSubscribe();

    setStartTime(Date.now());
    setNow(Date.now());

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    await sessionsLocalService.current.createSession(sessionMetadata);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);

    _accelerometerUnsubscribe();
    _gyroscopeUnsubscribe();
    _magnetometerUnsubscribe();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const sessionFileUri = sessionsLocalService.current.sessionFileUri;
    const sensorReadingsFileUri =
      sessionsLocalService.current.sensorReadingsFileUri;

    if (!sessionFileUri || !sensorReadingsFileUri) {
      throw new Error(
        'Session file uri or sensor readings file uri is not defined'
      );
    }

    // TODO: redirect to summary screen after session is destroyed with total timeSpent and totalSensorReadings

    const { totalSensorReadings } =
      await sessionsLocalService.current.destroySession();

    if (!startTime || !now) {
      throw new Error('Start time or now is not defined');
    }

    navigation.navigate('SummaryScreen', {
      totalTimeSpent: (now - startTime) / 1000,
      totalSensorReadings,
      sessionFileUri,
      sensorReadingsFileUri,
    });

    // await shareFile(sessionFileUri);
    // await shareFile(sensorReadingsFileUri);
  };

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <Center flex={1} px={4}>
      <Heading size='2xl' className='mb-4'>
        Session
      </Heading>
      <Heading size='lg' className='mb-4'>
        {secondsPassed}
      </Heading>
      {isRecording ? (
        <Button onPress={handleStopRecording}>Stop recording</Button>
      ) : (
        <Button onPress={handleStartRecording}>Start recording</Button>
      )}
    </Center>
  );
}
