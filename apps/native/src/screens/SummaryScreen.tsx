import { Button, Heading, Text, VStack } from 'native-base';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '../types/navigation';
import { shareFile } from '../utils/SessionsLocalService';
import { usePreventNavigationBack } from '../utils/hooks/usePreventNavigationBack';

export default function SummaryScreen({
  navigation,
  route,
}: RootStackScreenProps<'SummaryScreen'>) {
  usePreventNavigationBack(navigation);

  const {
    totalTimeSpent,
    totalSensorReadings,
    sensorReadingsFileUri,
    sessionFileUri,
  } = route.params;

  const redirectToSessionsHistoryScreen = () => {
    navigation.navigate<any>('HomeScreen'); // TODO: fix type
  };

  const shareSessionSummary = async (fileUri: string) => {
    await shareFile(fileUri);
  };

  return (
    <SafeAreaView className='flex-1 px-4 pb-10 bg-primary'>
      <View className='pt-36'>
        <Heading size='2xl' className='mb-4 text-center'>
          Thank you very much for your contribution!
        </Heading>
        <Text className='mb-4 text-center'>
          You have spent {totalTimeSpent.toFixed(0)} seconds and recorded{' '}
          {totalSensorReadings} sensor readings.
        </Text>
      </View>
      <VStack className='mb-4' space={6}>
        <View>
          <Text className='text-md mb-2 leading-tight tracking-tighter'>
            {sessionFileUri.split('/')[8]}
          </Text>
          <Button onPress={() => shareSessionSummary(sessionFileUri)}>
            Share session.json
          </Button>
        </View>
        <View>
          <Text className='text-md mb-2 leading-tight tracking-tighter'>
            {sensorReadingsFileUri.split('/')[8]}
          </Text>
          <Button onPress={() => shareSessionSummary(sensorReadingsFileUri)}>
            Share sensor-readings.csv
          </Button>
        </View>
      </VStack>
      <Button className='mt-auto' onPress={redirectToSessionsHistoryScreen}>
        Continue
      </Button>
    </SafeAreaView>
  );
}
