import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Divider, List, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { TasksScreenProps } from '../types/navigation';
import { shareFile } from '../utils/SessionsLocalService';

export default function SummaryScreen({
  navigation,
  route,
}: TasksScreenProps<'SummaryScreen'>) {
  const {
    totalTimeSpent,
    totalSensorReadings,
    sensorReadingsFileUri,
    sessionFileUri,
  } = route.params;

  const redirectToSessionsHistoryScreen = () => {
    const TasksStackNavigator = navigation.getParent('TasksStackNavigator');

    if (!TasksStackNavigator) {
      throw new Error('TasksStackNavigator is not defined');
    }

    // Pop to the top of the stack
    TasksStackNavigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'TasksScreen' }],
      })
    );

    // Don't know why on navigate method we don't have intellisense about available screens
    TasksStackNavigator.navigate('Home');
  };

  const shareSessionSummary = async (fileUri: string) => {
    await shareFile(fileUri);
  };

  return (
    <SafeAreaView className='flex-1'>
      <Surface className='flex-1 px-4'>
        <View className='pt-20 justify-center items-center'>
          <Text variant='headlineLarge' className='mb-4 text-center'>
            Thank you very much for your contribution!
          </Text>
          <MaterialCommunityIcons name='check-circle' size={72} color='green' />
          <Text variant='bodyLarge' className='mt-4 text-center'>
            You have contributed to the research by recording a session for{' '}
            {totalTimeSpent.toFixed(0)} seconds and {totalSensorReadings} sensor
            readings.
          </Text>
        </View>
        <Surface
          className='my-4 overflow-hidden rounded-md w-full'
          elevation={4}
        >
          <List.Item
            title={sessionFileUri.split('/')[8]}
            description='session.json'
            left={(props) => (
              <List.Icon {...props} icon='file-document-outline' />
            )}
            onPress={() => shareSessionSummary(sessionFileUri)}
          />
          <Divider />
          <List.Item
            title={sensorReadingsFileUri.split('/')[8]}
            description='sensor-readings.csv'
            left={(props) => (
              <List.Icon {...props} icon='file-document-outline' />
            )}
            onPress={() => shareSessionSummary(sensorReadingsFileUri)}
          />
        </Surface>
        <Button mode='contained' onPress={redirectToSessionsHistoryScreen}>
          Continue
        </Button>
      </Surface>
    </SafeAreaView>
  );
}
