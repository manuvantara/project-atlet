import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import SelectedTaskConfirmationScreen from './SelectedTaskConfirmationScreen';
import SessionScreen from './SessionScreen';
import SessionsHistoryScreen from './SessionsHistoryScreen';
import SettingsScreen from './SettingsScreen';
import SummaryScreen from './SummaryScreen';
import TasksScreen from './TasksScreen';
import WelcomeScreen from './WelcomeScreen';
import TabBarIcon from '../components/TabBarIcon';
import { usePrivateKeyStore } from '../stores/privateKey.store';
import type {
  RootStackParamList,
  TabNavigatorParamList,
} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export default function Navigation() {
  const isSignedIn = usePrivateKeyStore((state) => state.signedIn);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name='TabNavigator' component={BottomTabNavigator} />
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name='WelcomeScreen'
          component={WelcomeScreen}
        />
      )}
      <Stack.Screen
        name='SelectedTaskConfirmationScreen'
        component={SelectedTaskConfirmationScreen}
      />
      <Stack.Screen name='SessionScreen' component={SessionScreen} />
      <Stack.Screen name='SummaryScreen' component={SummaryScreen} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
        name='HomeScreen'
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='tasks' color={color} />,
        }}
        name='TasksScreen'
        component={TasksScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='history' color={color} />
          ),
        }}
        name='HistoryScreen'
        component={SessionsHistoryScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='gears' color={color} />,
        }}
        name='SettingsScreen'
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
