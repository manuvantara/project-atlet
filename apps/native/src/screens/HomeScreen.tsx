import { Surface, Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { TabScreenProps } from '../types/navigation';

export default function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const startSession = () => {
    navigation.navigate('Tasks', { screen: 'TasksScreen' });
  };

  return (
    <SafeAreaView className='flex-1'>
      <Surface className='flex-1 justify-center items-center gap-4'>
        <Text variant='headlineLarge'>Home</Text>
        <Button mode='contained' onPress={startSession}>
          Start Session
        </Button>
      </Surface>
    </SafeAreaView>
  );
}
