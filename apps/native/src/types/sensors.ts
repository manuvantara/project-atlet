import type { Sensor, SessionMetadata } from './session-metadata';

export type SensorReading = {
  timestamp: number;
  sensor: Sensor;
  xAxis: number;
  yAxis: number;
  zAxis: number;
};

export type Session = {
  sessionSchemaVersion: string;
  sensorReadingSchemaVersion: string;
  sessionId: string;
  accountId: string;
  createdAt: Date;
  destroyedAt: Date | null;
  sessionMetadata: SessionMetadata;
  totalSensorReadings: number;
};
