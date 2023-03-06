import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  WelcomeScreen: undefined;
  TabNavigator: NavigatorScreenParams<TabNavigatorParamList>;
};

export type TabNavigatorParamList = {
  Home: undefined;
  Settings: undefined;
  Tasks: NavigatorScreenParams<TasksScreenParamList>;
  History: NavigatorScreenParams<HistoryScreenParamList>;
};

// RootStack Screens Props

export type RootStackScreenProps<ScreenName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, ScreenName>;

// TabNavigator Screens Props

export type TabScreenProps<ScreenName extends keyof TabNavigatorParamList> =
  BottomTabScreenProps<TabNavigatorParamList, ScreenName, 'TabNavigation'>;

// TasksStack Screens Param List

export type TasksScreenParamList = {
  TasksScreen: undefined;
  SelectedTaskConfirmationScreen: undefined;
  SessionScreen: undefined;
  SummaryScreen: {
    totalTimeSpent: number;
    totalSensorReadings: number;
    sessionFileUri: string;
    sensorReadingsFileUri: string;
  };
};

// TasksStack Screens Props

export type TasksScreenProps<ScreenName extends keyof TasksScreenParamList> =
  NativeStackScreenProps<
    TasksScreenParamList,
    ScreenName,
    // Navigator Id
    'TasksStackNavigator'
  >;

// HistoryStack Screens Param List

export type HistoryScreenParamList = {
  SessionsHistoryScreen: undefined;
  SessionViewScreen: undefined;
};

// HistoryStack Screens Props

export type HistoryScreenProps<
  ScreenName extends keyof HistoryScreenParamList
> = NativeStackScreenProps<HistoryScreenParamList, ScreenName>;
