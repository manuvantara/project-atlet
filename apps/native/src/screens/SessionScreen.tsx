import { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  Appbar,
  Button,
  Divider,
  List,
  Surface,
  Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  accelerometer,
  gyroscope,
  magnetometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import type { Subscription } from 'rxjs';

import { usePrivateKeyStore } from '../stores/privateKey.store';
import { useSelectedTask } from '../stores/selectedTask.store';
import type { TasksScreenProps } from '../types/navigation';
import type { SensorReading } from '../types/sensors';
import { Sensor, SessionMetadata } from '../types/session-metadata';
import SessionsLocalService from '../utils/SessionsLocalService';
import { SENSOR_READINGS_BATCH_SIZE } from '../utils/constants';
import { useCheckSensorsAvailability } from '../utils/hooks/useCheckSensorsAvailability';
import { usePreventNavigationBack } from '../utils/hooks/usePreventNavigationBack';

export default function SessionScreen({
  navigation,
}: TasksScreenProps<'SessionScreen'>) {
  const { isSensorsAvailabilityChecked, availableSensors } =
    useCheckSensorsAvailability();

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

  const [accelerometerSubscription, setAccelerometerSubscription] =
    useState<Subscription | null>(null);
  const [gyroscopeSubscription, setGyroscopeSubscription] =
    useState<Subscription | null>(null);
  const [magnetometerSubscription, setMagnetometerSubscription] =
    useState<Subscription | null>(null);

  usePreventNavigationBack(navigation, isRecording);

  const _accelerometerSubscribe = () => {
    setAccelerometerSubscription(
      accelerometer.subscribe(({ x, y, z, timestamp }) => {
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
          timestamp,
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
      gyroscope.subscribe(({ x, y, z, timestamp }) => {
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
      magnetometer.subscribe(({ x, y, z, timestamp }) => {
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
          timestamp,
          sensor: Sensor.MAGNETOMETER,
          xAxis: x,
          yAxis: y,
          zAxis: z,
        });
      })
    );
  };

  const _accelerometerUnsubscribe = () => {
    accelerometerSubscription && accelerometerSubscription.unsubscribe();
    setAccelerometerSubscription(null);
  };

  const _gyroscopeUnsubscribe = () => {
    gyroscopeSubscription && gyroscopeSubscription.unsubscribe();
    setGyroscopeSubscription(null);
  };

  const _magnetometerUnsubscribe = () => {
    magnetometerSubscription && magnetometerSubscription.unsubscribe();
    setMagnetometerSubscription(null);
  };

  const handleStartRecording = async () => {
    setIsRecording(true);

    setUpdateIntervalForType(
      SensorTypes.accelerometer,
      selectedTask.sessionMetadata.sensorUpdateInterval
    );
    if (availableSensors.ACCELEROMETER) {
      _accelerometerSubscribe();
    }

    setUpdateIntervalForType(
      SensorTypes.gyroscope,
      selectedTask.sessionMetadata.sensorUpdateInterval
    );
    if (availableSensors.GYROSCOPE) {
      _gyroscopeSubscribe();
    }

    setUpdateIntervalForType(
      SensorTypes.magnetometer,
      selectedTask.sessionMetadata.sensorUpdateInterval
    );
    if (availableSensors.MAGNETOMETER) {
      _magnetometerSubscribe();
    }

    setStartTime(Date.now());
    setNow(Date.now());

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    const sessionMetadata: SessionMetadata = {
      ...selectedTask.sessionMetadata,
      isAccelerometerAvailable: availableSensors.ACCELEROMETER,
      isGyroscopeAvailable: availableSensors.GYROSCOPE,
      isMagnetometerAvailable: availableSensors.MAGNETOMETER,
    };

    await sessionsLocalService.createSession(sessionMetadata);
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

    navigation.replace('SummaryScreen', {
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
            navigation.navigate('TasksScreen');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className='flex-1'>
      <Appbar.Header>
        <Appbar.BackAction
          disabled={isRecording}
          onPress={handleCancelSession}
        />
        <Appbar.Content title='Session' />
      </Appbar.Header>
      <Surface className='flex-1 px-4'>
        <View className='mb-4 pt-8'>
          <Text variant='titleLarge'>Description</Text>
          <Divider bold className='my-2' />
          <Text variant='bodyLarge'>{selectedTask.description}</Text>
        </View>
        <Surface className='flex-col w-full rounded-md' elevation={4}>
          <List.Item
            title='Time'
            description={formatSecondsPassed(secondsPassed)}
            left={(props) => <List.Icon {...props} icon='clock' />}
          />
          <Divider />
          <List.Item
            title='Sensor readings'
            description={`${
              totalWrittenSensorReadingsBatches * SENSOR_READINGS_BATCH_SIZE
            } written`}
            left={(props) => <List.Icon {...props} icon='chart-line' />}
          />
        </Surface>
        <View className='w-full mt-4'>
          {isRecording ? (
            <Button mode='contained' onPress={handleStopRecording}>
              Stop recording
            </Button>
          ) : (
            <Button
              mode='contained'
              onPress={handleStartRecording}
              disabled={!isSensorsAvailabilityChecked}
            >
              Start recording
            </Button>
          )}
        </View>
      </Surface>
    </SafeAreaView>
  );
}
