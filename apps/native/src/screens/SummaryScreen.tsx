import { Button, Heading, Text, VStack } from 'native-base';
import { View } from 'react-native';

import type { RootStackScreenProps } from '../types/navigation';
import { shareFile } from '../utils/SessionsLocalService';

export default function SummaryScreen({
  navigation,
  route,
}: RootStackScreenProps<'SummaryScreen'>) {
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
    <View className='flex-1 items-center justify-center h-full'>
      <Heading size='2xl' className='mb-4'>
        Thank you very much for your contribution!
      </Heading>
      <Text size='lg' className='mb-4'>
        You have spent {totalTimeSpent.toFixed(3)} seconds and recorded{' '}
        {totalSensorReadings} sensor readings.
      </Text>
      <VStack space={4} alignItems='center' flex={1} justifyContent='center'>
        <Heading size='md'>{sessionFileUri.split('/')[8]}</Heading>
        <Button onPress={() => shareSessionSummary(sessionFileUri)}>
          Share session file
        </Button>
      </VStack>
      <VStack space={4} alignItems='center' flex={1} justifyContent='center'>
        <Heading size='md'>{sensorReadingsFileUri.split('/')[8]}</Heading>
        <Button onPress={() => shareSessionSummary(sensorReadingsFileUri)}>
          Share session file
        </Button>
      </VStack>
      <Button onPress={redirectToSessionsHistoryScreen}>Continue</Button>
    </View>
  );
}
