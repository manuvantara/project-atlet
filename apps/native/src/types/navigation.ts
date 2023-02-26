import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SessionMetadata } from './session-metadata';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  TabNavigator: undefined;
  SelectedTaskConfirmationScreen: { taskId: number };
  SessionScreen: { sessionMetadata: SessionMetadata };
  SummaryScreen: {
    totalTimeSpent: number;
    totalSensorReadings: number;
    sessionFileUri: string;
    sensorReadingsFileUri: string;
  };
};

export type TabNavigatorParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
  TasksScreen: undefined;
  HistoryScreen: undefined;
};

export type RootStackScreenProps<ScreenName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, ScreenName>;

export type ScreenProps<ScreenName extends keyof TabNavigatorParamList> =
  BottomTabScreenProps<TabNavigatorParamList, ScreenName>;
