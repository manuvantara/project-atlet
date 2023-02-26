import { Button, Center, Heading } from 'native-base';
import { usePrivateKeyStore } from '../stores/privateKey.store';
import type { ScreenProps } from '../types/navigation';

export default function HomeScreen({ navigation }: ScreenProps<'HomeScreen'>) {

  const startSession = () => {
    navigation.navigate('TasksScreen');
  };

  return (
    <Center flex={1} px={4}>
      <Heading size='2xl' className='mb-4'>
        Welcome!
      </Heading>
      <Button onPress={startSession}>Start a session!</Button>
    </Center>
  );
}
