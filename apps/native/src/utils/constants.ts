import * as Device from 'expo-device';

import {
  ActivityTypes,
  OperatingSystemTypes,
  SmartphonePositions,
  Task,
} from '../types/session-metadata';

export const SENSOR_READINGS_BATCH_SIZE = 375;

export const SMARTPHONE_MODEL = Device.manufacturer + ' ' + Device.modelName;

export const TASKS: Task[] = [
  {
    taskId: 1,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Plan the route for approximately 10 minutes that will involve downhill, uphill and flat surface cycling. Start cycling as soon as you started recording. Please, stop recording if you need to stop more than for 5 seconds.',
    sessionMetadata: {
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.PANTS_POCKET,
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 2,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Plan the route for approximately 10 minutes that will involve downhill, uphill and flat surface cycling. Ideally, this route should repeat the previous one. Start cycling as soon as you started recording. Please, stop recording if you need to stop more than for 5 seconds.',
    sessionMetadata: {
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.JERSEY_POCKET,
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 3,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Plan the route for approximately 10 minutes that will involve downhill, uphill and flat surface cycling. Ideally, this route should repeat the previous one. Start cycling as soon as you started recording. Please, stop recording if you need to stop more than for 5 seconds.',
    sessionMetadata: {
      activity: ActivityTypes.CYCLING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.BACKPACK,
        SmartphonePositions.HANDLEBAR,
        SmartphonePositions.HANDLEBAR_BAG,
        SmartphonePositions.FRAME_BAG,
      ],
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 4,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start running as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      activity: ActivityTypes.RUNNING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.JERSEY_POCKET,
        SmartphonePositions.PANTS_POCKET,
      ],
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 5,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start running as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      activity: ActivityTypes.RUNNING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.BACKPACK,
        SmartphonePositions.HANDLEBAR,
        SmartphonePositions.HANDLEBAR_BAG,
        SmartphonePositions.FRAME_BAG,
      ],
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 6,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start walking as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      activity: ActivityTypes.WALKING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.JERSEY_POCKET,
        SmartphonePositions.PANTS_POCKET,
      ],
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 7,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start walking as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      activity: ActivityTypes.WALKING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: [
        SmartphonePositions.BACKPACK,
        SmartphonePositions.HANDLEBAR,
        SmartphonePositions.HANDLEBAR_BAG,
        SmartphonePositions.FRAME_BAG,
      ],
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 8,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start riding as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      activity: ActivityTypes.SCOOTERING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.PANTS_POCKET,
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 9,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start riding as soon as you started recording. Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      activity: ActivityTypes.SCOOTERING,
      sessionMetadataSchemaVersion: '1.0.0',
      operatingSystem: OperatingSystemTypes.ANDROID,
      smartphoneModel: SMARTPHONE_MODEL,
      smartphonePosition: SmartphonePositions.BACKPACK,
      sensorUpdateInterval: 16,
    },
  },
  {
    taskId: 10,
    creatorId: 'pantemon.testnet',
    createdAt: new Date('2023-02-25T22:58:00.000Z'),
    description:
      'Start recording as soon as you are in the fixed position in the car or public transport (seated or standing). Stop recording if you need to stop for longer than 5 seconds. Recommended route length is 10 minutes.',
    sessionMetadata: {
      activity: ActivityTypes.DRIVING,
      sessionMetadataSchemaVersion: '1.0.0',
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
      sensorUpdateInterval: 16,
    },
  },
];
