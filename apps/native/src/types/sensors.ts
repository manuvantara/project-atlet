import type { Sensor } from './session-metadata';

export type SensorReading = {
  timestamp: number;
  sensor: Sensor;
  xAxis: number;
  yAxis: number;
  zAxis: number;
};
