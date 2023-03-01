import * as FileSystem from 'expo-file-system';
import Share from 'react-native-share';

import type { SensorReading, Session } from '../types/sensors';
import type { SessionMetadata } from '../types/session-metadata';

export default class SessionsLocalService {
  private readonly _accountId: string;
  private _sessionId: string | null = null;
  private _totalSensorReadings = 0;

  private readonly _documentDirectory: string;

  private _sessionFileUri: string | null = null;
  private _sensorReadingsFileUri: string | null = null;

  constructor(accountId: string) {
    this._accountId = accountId;

    if (!FileSystem.documentDirectory) {
      throw new Error('Document directory is not accessible');
    }

    this._documentDirectory = FileSystem.documentDirectory;
  }

  get sessionFileUri() {
    return this._sessionFileUri;
  }

  get sensorReadingsFileUri() {
    return this._sensorReadingsFileUri;
  }

  public async createSession(sessionMetadata: SessionMetadata) {
    if (this._sessionId) {
      throw new Error('Session already exists');
    }

    this._sessionId = `${this._accountId}-${Date.now()}`;

    this._sessionFileUri =
      FileSystem.documentDirectory + `${this._sessionId}-session.json`;
    this._sensorReadingsFileUri =
      FileSystem.documentDirectory + `${this._sessionId}-sensor-readings.csv`;

    // TODO: Create `${sessionId}-session.json`
    const sessionFileUri = this._sessionFileUri;

    const session: Session = {
      sessionSchemaVersion: '1.0.0',
      sensorReadingSchemaVersion: '1.0.0',
      sessionId: this._sessionId,
      accountId: this._accountId,
      createdAt: new Date(),
      destroyedAt: null,
      sessionMetadata,
      totalSensorReadings: 0,
    };

    await FileSystem.writeAsStringAsync(
      sessionFileUri,
      JSON.stringify(session),
      {
        encoding: FileSystem.EncodingType.UTF8,
      }
    );

    // TODO: Create `${sessionId}-sensor-readings.csv` file
    const sensorReadingsFileUri =
      FileSystem.documentDirectory + `${this._sessionId}-sensor-readings.csv`;

    const sensorReadingsFileHeader = 'timestamp,sensor,xAxis,yAxis,zAxis\n';

    await FileSystem.writeAsStringAsync(
      sensorReadingsFileUri,
      sensorReadingsFileHeader,
      {
        encoding: FileSystem.EncodingType.UTF8,
      }
    );

    return session;
  }

  // TODO: set SENSOR_READINGS_BATCH_SIZE to 375
  public async writeSensorReadingBatch(sensorReadings: SensorReading[]) {
    const sensorReadingsFileUri = this._sensorReadingsFileUri;

    if (!sensorReadingsFileUri) {
      throw new Error('File that contains sensor readings is not accessible');
    }

    let sensorReadingsFile = await FileSystem.readAsStringAsync(
      sensorReadingsFileUri,
      {
        encoding: FileSystem.EncodingType.UTF8,
      }
    );

    for (const sensorReading of sensorReadings) {
      const sensorReadingRow = `${sensorReading.timestamp},${sensorReading.sensor},${sensorReading.xAxis},${sensorReading.yAxis},${sensorReading.zAxis}\n`;

      sensorReadingsFile += sensorReadingRow;
      this._totalSensorReadings += 1;
    }

    // Update `${sessionId}-sensor-readings.csv` with new sensor readings
    await FileSystem.writeAsStringAsync(
      sensorReadingsFileUri,
      sensorReadingsFile,
      {
        encoding: FileSystem.EncodingType.UTF8,
      }
    );
  }

  public async destroySession() {
    const sessionFileUri = this._sessionFileUri;

    if (!sessionFileUri) {
      throw new Error('File that contains session data is not accessible');
    }

    const sessionFile = await FileSystem.readAsStringAsync(sessionFileUri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const session: Session = JSON.parse(sessionFile);

    session.destroyedAt = new Date();
    session.totalSensorReadings = this._totalSensorReadings;

    // Update `${sessionId}-session.json` with new destroyedAt and totalSensorReadings values
    await FileSystem.writeAsStringAsync(
      sessionFileUri,
      JSON.stringify(session),
      {
        encoding: FileSystem.EncodingType.UTF8,
      }
    );

    // Reset class properties
    this._sessionId = null;
    this._sessionFileUri = null;
    this._sensorReadingsFileUri = null;
    this._totalSensorReadings = 0;

    return session;
  }

  public async getSessions(): Promise<Session[]> {
    const sessions: Session[] = [];
    const documentDirectory = this._documentDirectory;

    const sessionFilenames = await FileSystem.readDirectoryAsync(
      documentDirectory
    );

    for (const sessionFilename of sessionFilenames) {
      if (sessionFilename.endsWith('-session.json')) {
        const sessionFile = await FileSystem.readAsStringAsync(
          documentDirectory + sessionFilename,
          {
            encoding: FileSystem.EncodingType.UTF8,
          }
        );

        const session: Session = JSON.parse(sessionFile);
        sessions.push(session);
      }
    }

    return sessions;
  }

  public async getSessionByFileUri(sessionFileUri: string): Promise<Session> {
    const sessionFile = await FileSystem.readAsStringAsync(sessionFileUri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // BREAKING: Parse session file to Session type object and return it to the caller function (e.g. SessionsScreen)
    const session: Session = JSON.parse(sessionFile);

    return session;
  }

  public generateFileUrisFromSessionId(sessionId: string) {
    return {
      sessionFileUri: `${this._documentDirectory}${sessionId}-session.json`,
      sensorReadingsFileUri: `${this._documentDirectory}${sessionId}-sensor-readings.csv`,
    };
  }
}

export async function shareFile(fileUri: string) {
  try {
    await Share.open({
      url: fileUri,
    });
  } catch (error) {
    // The error is thrown when the user cancels the share action
    return false;
  }
}
