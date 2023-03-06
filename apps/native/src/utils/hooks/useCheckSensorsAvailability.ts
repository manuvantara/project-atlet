import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Sensor } from '../../types/session-metadata';

type AvailableSensors = {
  [key in Sensor]: boolean;
};

// TODO: Write tests

type CheckSensorsAvailabilityReturnValues = {
  isSensorsAvailabilityChecked: boolean;
  availableSensors: AvailableSensors;
};

export const useCheckSensorsAvailability =
  (): CheckSensorsAvailabilityReturnValues => {
    const [isSensorsAvailabilityChecked, setIsSensorsAvailabilityChecked] =
      useState(false);
    const [availableSensors, setAvailableSensors] = useState<AvailableSensors>({
      [Sensor.ACCELEROMETER]: false,
      [Sensor.GYROSCOPE]: false,
      [Sensor.MAGNETOMETER]: false,
    });

    useEffect(() => {
      const checkSensorsAvailability = async (): Promise<void> => {
        try {
          const availability: AvailableSensors = {
            [Sensor.ACCELEROMETER]: await Accelerometer.isAvailableAsync(),
            [Sensor.GYROSCOPE]: await Gyroscope.isAvailableAsync(),
            [Sensor.MAGNETOMETER]: await Magnetometer.isAvailableAsync(),
          };
          setAvailableSensors(availability);
        } catch (error) {
          Alert.alert(
            'Error',
            `There was an error while checking sensors availability: ${error}`
          );
        } finally {
          setIsSensorsAvailabilityChecked(true);
        }
      };

      checkSensorsAvailability();
    }, []);

    return {
      isSensorsAvailabilityChecked,
      availableSensors,
    };
  };
