import * as Application from 'expo-application';
import * as Device from 'expo-device';

import {
  ActivityTypes,
  OperatingSystemTypes,
  SmartphonePositions,
  Task,
} from '../types/session-metadata';

export const SENSOR_READINGS_BATCH_SIZE = 375;

export const SMARTPHONE_MODEL = Device.manufacturer + ' ' + Device.modelName;

// Will be null on web, so we need to provide a default value to avoid type errors
export const APP_VERSION = Application.nativeApplicationVersion || '1.0.0';

export const SESSION_METADATA_SCHEMA_VERSION = '1.0.2';

let taskId = 0;

export const TASKS: Task[] = [
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Plan the route for approximately 10 minutes that will involve downhill, uphill and flat surface cycling. Start cycling as soon as you started recording. Please, stop recording if you need to stop more than for 5 seconds.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.PANTS_POCKET,
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Plan the route for approximately 10 minutes that will involve downhill, uphill and flat surface cycling. Ideally, this route should repeat the previous one. Start cycling as soon as you started recording. Please, stop recording if you need to stop more than for 5 seconds.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.JERSEY_POCKET,
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Plan the route for approximately 10 minutes that will involve downhill, uphill and flat surface cycling. Ideally, this route should repeat the previous one. Start cycling as soon as you started recording. Please, stop recording if you need to stop more than for 5 seconds.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.BACKPACK,
        SmartphonePositions.HANDLEBAR,
        SmartphonePositions.HANDLEBAR_BAG,
        SmartphonePositions.FRAME_BAG,
      ],
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Plan the route for approximately 10 minutes that will involve downhill, uphill and flat surface cycling. Ideally, this route should repeat the previous one. Start cycling as soon as you started recording. Please, stop recording if you need to stop more than for 5 seconds.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.BACKPACK,
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start running as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.RUNNING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.JERSEY_POCKET,
        SmartphonePositions.PANTS_POCKET,
      ],
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start running as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.RUNNING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.BACKPACK,
        SmartphonePositions.HANDLEBAR,
        SmartphonePositions.HANDLEBAR_BAG,
        SmartphonePositions.FRAME_BAG,
      ],
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start walking as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.WALKING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.JERSEY_POCKET,
        SmartphonePositions.PANTS_POCKET,
      ],
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start walking as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.WALKING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.BACKPACK,
        SmartphonePositions.HANDLEBAR,
        SmartphonePositions.HANDLEBAR_BAG,
        SmartphonePositions.FRAME_BAG,
      ],
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start riding as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.SCOOTERING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.PANTS_POCKET,
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start riding as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.SCOOTERING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.BACKPACK,
      sensorUpdateInterval: 50,
    },
  },
  {
    taskId: ++taskId,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start recording as soon as you are in the fixed position in the car or public transport (seated or standing). Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      appVersion: APP_VERSION,
      activity: ActivityTypes.DRIVING,
      sessionMetadataSchemaVersion: SESSION_METADATA_SCHEMA_VERSION,
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.BACKPACK,
        SmartphonePositions.HANDLEBAR,
        SmartphonePositions.HANDLEBAR_BAG,
        SmartphonePositions.FRAME_BAG,
        SmartphonePositions.JERSEY_POCKET,
        SmartphonePositions.PANTS_POCKET,
        SmartphonePositions.HANDLEBAR_AND_PLASTIC_BAG,
        SmartphonePositions.BASKET,
        SmartphonePositions.ARMBAND,
        SmartphonePositions.WAISTBAND,
        SmartphonePositions.HAND,
      ],
      sensorUpdateInterval: 50,
    },
  },
];
