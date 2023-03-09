import type { SessionMetadata } from './session-metadata';

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

type FlattenedSession = {
  [K in keyof Session | keyof SessionMetadata as K extends keyof Session
    ? K
    : `sessionMetadata.${K}`]: K extends keyof Session
    ? Session[K]
    : K extends keyof SessionMetadata
    ? SessionMetadata[K]
    : never;
} & { sessionMetadata: SessionMetadata };

type RemoveSessionMetadataPrefix<T> = {
  [K in keyof T as K extends `sessionMetadata.${infer U}` ? U : K]: T[K];
};

export type FlattenedSessionWithoutSessionMetadataPrefix =
  RemoveSessionMetadataPrefix<FlattenedSession>;
