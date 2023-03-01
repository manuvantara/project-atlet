export enum ActivityTypes {
  CYCLING = 'CYCLING',
  WALKING = 'WALKING',
  SCOOTERING = 'SCOOTERING',
  RUNNING = 'RUNNING',
  DRIVING = 'DRIVING',
}

export enum OperatingSystemTypes {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}

export enum Sensor {
  ACCELEROMETER = 'ACCELEROMETER',
  GYROSCOPE = 'GYROSCOPE',
  MAGNETOMETER = 'MAGNETOMETER',
}

export enum SmartphonePositions {
  HANDLEBAR = 'HANDLEBAR',
  HANDLEBAR_BAG = 'HANDLEBAR_BAG',
  HANDLEBAR_AND_PLASTIC_BAG = 'HANDLEBAR_AND_PLASTIC_BAG',
  FRAME_BAG = 'FRAME_BAG',
  BASKET = 'BASKET',
  BACKPACK = 'BACKPACK',
  PANTS_POCKET = 'PANTS_POCKET',
  JERSEY_POCKET = 'JERSEY_POCKET',
  ARMBAND = 'ARMBAND',
  WAISTBAND = 'WAISTBAND',
  HAND = 'HAND',
}

export enum SurfaceTypes {
  PAVED = 'PAVED',
  DIRT = 'DIRT',
  GRAVEL = 'GRAVEL',
  BIKE_TRAIL = 'BIKE_TRAIL',
  SNOW = 'SNOW',
}

// export const WeatherConditions = {
//
// }

export enum BicycleTypes {
  MOUNTAIN = 'MOUNTAIN',
  ROAD = 'ROAD',
  HYBRID = 'HYBRID',
  CYCLOCROSS = 'CYCLOCROSS',
  FIXED_GEAR = 'FIXED_GEAR',
  TIME_TRIAL = 'TIME_TRIAL',
  TOURING = 'TOURING',
  TANDAM = 'TANDAM',
  FATBIKE = 'FATBIKE',
  BMX = 'BMX',
  FOLDING = 'FOLDING',
  BEACH_CRUISER = 'BEACH_CRUISER',
  RECUMBENT = 'RECUMBENT',
  TRIKE = 'TRIKE',
  CRUISER = 'CRUISER',
}

export type SessionMetadata = {
  activity: ActivityTypes;
  sessionMetadataSchemaVersion: '1.0.0';

  // accountId: string,

  operatingSystem: OperatingSystemTypes.ANDROID;
  smartphoneModel: string; // e.g. Samsung Galaxy S23 Ultra

  smartphonePosition: SmartphonePositions | SmartphonePositions[];

  surface?: SurfaceTypes;
  bicycleType?: BicycleTypes;
  isElectric?: boolean; // e.g. there are folding bicycles as well as electric folding bicycles

  // Desired interval in milliseconds between sensor updates
  sensorUpdateInterval: 16;
};

// export type SessionMetadata = CyclingSessionMetadata;

export type Task = {
  taskId: number;
  creatorId: string;
  createdAt: Date;
  description: string;
  sessionMetadata: SessionMetadata;
};
