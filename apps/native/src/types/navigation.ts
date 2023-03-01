import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  TabNavigator: undefined;
  SelectedTaskConfirmationScreen: undefined;
  SessionScreen: undefined;
  SummaryScreen: {
    totalTimeSpent: number;
    totalSensorReadings: number;
    sessionFileUri: string;
    sensorReadingsFileUri: string;
  };
  SessionViewScreen: undefined;
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
