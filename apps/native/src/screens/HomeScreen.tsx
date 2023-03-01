import { Button, Center, Heading } from 'native-base';

import type { ScreenProps } from '../types/navigation';

export default function HomeScreen({ navigation }: ScreenProps<'HomeScreen'>) {
  const startSession = () => {
    navigation.navigate('TasksScreen');
  };

  return (
    <Center flex={1} px={4} className='bg-primary'>
      <Heading size='2xl' className='mb-4'>
        Welcome!
      </Heading>
      <Button onPress={startSession}>Start a session!</Button>
    </Center>
  );
}
