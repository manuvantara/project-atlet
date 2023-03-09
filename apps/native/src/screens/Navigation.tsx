import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import SelectedTaskConfirmationScreen from './SelectedTaskConfirmationScreen';
import SessionScreen from './SessionScreen';
import SessionViewScreen from './SessionViewScreen';
import SessionsHistoryScreen from './SessionsHistoryScreen';
import SettingsScreen from './SettingsScreen';
import SummaryScreen from './SummaryScreen';
import TasksScreen from './TasksScreen';
import WelcomeScreen from './WelcomeScreen';
import TabBarIcon from '../components/TabBarIcon';
import { usePrivateKeyStore } from '../stores/privateKey.store';
import type {
  HistoryScreenParamList,
  RootStackParamList,
  TabNavigatorParamList,
  TasksScreenParamList,
} from '../types/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();

const HistoryStack = createNativeStackNavigator<HistoryScreenParamList>();
const TasksStack = createNativeStackNavigator<TasksScreenParamList>();
export default function Navigation() {
  const isSignedIn = usePrivateKeyStore((state) => state.signedIn);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <RootStack.Screen name='TabNavigator' component={BottomTabNavigator} />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name='WelcomeScreen'
          component={WelcomeScreen}
        />
      )}
    </RootStack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      id='TabNavigation'
      sceneAnimationEnabled
      sceneAnimationType='shifting'
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
        name='Home'
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='format-list-checks' color={color} />
          ),
        }}
        name='Tasks'
        component={TasksStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='history' color={color} />
          ),
        }}
        name='History'
        component={HistoryStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='account-cog' color={color} />
          ),
        }}
        name='Settings'
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

function HistoryStackNavigator() {
  return (
    <HistoryStack.Navigator
      initialRouteName='SessionsHistoryScreen'
      screenOptions={{ headerShown: false }}
    >
      <HistoryStack.Screen
        name='SessionsHistoryScreen'
        component={SessionsHistoryScreen}
      />
      <HistoryStack.Screen
        name='SessionViewScreen'
        component={SessionViewScreen}
      />
    </HistoryStack.Navigator>
  );
}

function TasksStackNavigator() {
  return (
    <TasksStack.Navigator
      id='TasksStackNavigator'
      initialRouteName='TasksScreen'
      screenOptions={{
        headerShown: false,
      }}
    >
      <TasksStack.Screen name='TasksScreen' component={TasksScreen} />
      <TasksStack.Screen
        name='SelectedTaskConfirmationScreen'
        component={SelectedTaskConfirmationScreen}
      />
      <TasksStack.Screen name='SessionScreen' component={SessionScreen} />
      <TasksStack.Screen name='SummaryScreen' component={SummaryScreen} />
    </TasksStack.Navigator>
  );
}
