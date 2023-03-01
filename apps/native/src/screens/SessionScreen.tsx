import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import { Button, Center, Heading, HStack, Text } from 'native-base';
import { useRef, useState } from 'react';
import { Alert, View } from 'react-native';

import { usePrivateKeyStore } from '../stores/privateKey.store';
import { useSelectedTask } from '../stores/selectedTask.store';
import type { RootStackScreenProps } from '../types/navigation';
import type { SensorReading } from '../types/sensors';
import { Sensor } from '../types/session-metadata';
import SessionsLocalService from '../utils/SessionsLocalService';
import { SENSOR_READINGS_BATCH_SIZE } from '../utils/constants';
import { usePreventNavigationBack } from '../utils/hooks/usePreventNavigationBack';

export default function SessionScreen({
  navigation,
}: RootStackScreenProps<'SessionScreen'>) {
  usePreventNavigationBack(navigation);

  const selectedTask = useSelectedTask((state) => state.selectedTask);
  const privateKey = usePrivateKeyStore((state) => state.privateKey);

  const [isRecording, setIsRecording] = useState(false);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [sessionsLocalService] = useState(
    () => new SessionsLocalService(privateKey)
  );

  const [
    totalWrittenSensorReadingsBatches,
    setTotalWrittenSensorReadingsBatches,
  ] = useState(0);
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

          // Should be without await
          sessionsLocalService.writeSensorReadingBatch(
            temporarySensorReadingsBatch.current
          );

          setTotalWrittenSensorReadingsBatches(
            (prevTotalWrittenSensorReadingsBatches) =>
              prevTotalWrittenSensorReadingsBatches + 1
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

          // Should be without await
          sessionsLocalService.writeSensorReadingBatch(
            temporarySensorReadingsBatch.current
          );

          setTotalWrittenSensorReadingsBatches(
            (prevTotalWrittenSensorReadingsBatches) =>
              prevTotalWrittenSensorReadingsBatches + 1
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

          // Should be without await
          sessionsLocalService.writeSensorReadingBatch(
            temporarySensorReadingsBatch.current
          );

          setTotalWrittenSensorReadingsBatches(
            (prevTotalWrittenSensorReadingsBatches) =>
              prevTotalWrittenSensorReadingsBatches + 1
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

  const handleStartRecording = async () => {
    setIsRecording(true);

    Accelerometer.setUpdateInterval(
      selectedTask.sessionMetadata.sensorUpdateInterval
    );
    _accelerometerSubscribe();

    Gyroscope.setUpdateInterval(
      selectedTask.sessionMetadata.sensorUpdateInterval
    );
    _gyroscopeSubscribe();

    Magnetometer.setUpdateInterval(
      selectedTask.sessionMetadata.sensorUpdateInterval
    );
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

    await sessionsLocalService.createSession(selectedTask.sessionMetadata);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);

    _accelerometerUnsubscribe();
    _gyroscopeUnsubscribe();
    _magnetometerUnsubscribe();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const sessionFileUri = sessionsLocalService.sessionFileUri;
    const sensorReadingsFileUri = sessionsLocalService.sensorReadingsFileUri;

    if (!sessionFileUri || !sensorReadingsFileUri) {
      throw new Error(
        'Session file uri or sensor readings file uri is not defined'
      );
    }

    const { totalSensorReadings } = await sessionsLocalService.destroySession();

    if (!startTime || !now) {
      throw new Error('Start time or now is not defined');
    }

    navigation.navigate('SummaryScreen', {
      totalTimeSpent: (now - startTime) / 1000,
      totalSensorReadings,
      sessionFileUri,
      sensorReadingsFileUri,
    });
  };

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  const formatSecondsPassed = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const handleCancelSession = () => {
    Alert.alert(
      'Are you sure you want to cancel this session?',
      'All data will be lost',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate<any>('TasksScreen');
          },
        },
      ]
    );
  };

  return (
    <Center flex={1} px={4} className='bg-primary'>
      {!isRecording && (
        <HStack w='100%' mb={4}>
          <Button onPress={handleCancelSession}>Back</Button>
        </HStack>
      )}
      <Heading size='2xl' className='mb-4'>
        Session
      </Heading>
      <View className='mb-4'>
        <Heading size='md' className='mb-2'>
          Description
        </Heading>
        <Text className='text-lg'>{selectedTask.description}</Text>
      </View>
      <View className='flex-col w-full mb-6'>
        <View className='flex-row justify-between items-center w-full bg-secondary p-2 rounded-md mb-2'>
          <View className='flex-row p-1 bg-quinary opacity-80 rounded-md'>
            <Text className='text-lg'>Time spent: </Text>
          </View>
          <Text className='text-lg'>{formatSecondsPassed(secondsPassed)}</Text>
        </View>
        <View className='flex-row justify-between items-center w-full bg-secondary p-2 rounded-md mb-2'>
          <View className='flex-row p-1 bg-quinary opacity-80 rounded-md'>
            <Text className='text-lg'>Sensor readings collected: </Text>
          </View>
          <Text className='text-lg'>
            {totalWrittenSensorReadingsBatches * SENSOR_READINGS_BATCH_SIZE}
          </Text>
        </View>
      </View>
      {isRecording ? (
        <Button className='w-full' onPress={handleStopRecording}>
          Stop recording
        </Button>
      ) : (
        <Button className='w-full' onPress={handleStartRecording}>
          Start recording
        </Button>
      )}
    </Center>
  );
}
