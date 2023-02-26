import { Button, Center, Heading } from 'native-base';

import { useTaskStore } from '../stores/task.store';
import type { RootStackScreenProps } from '../types/navigation';

export default function SelectedTaskConfirmationScreen({
  navigation,
  route,
}: RootStackScreenProps<'SelectedTaskConfirmationScreen'>) {
  const tasks = useTaskStore((state) => state.tasks);
  const [task] = tasks.filter((t) => t.taskId === route.params.taskId);

  const redirectToSessionScreen = () => {
    navigation.navigate('SessionScreen', {
      sessionMetadata: task.sessionMetadata,
    });
  };

  return (
    <Center flex={1} px={4}>
      <Heading size='2xl' className='mb-4'>
        Task #{task.taskId}
      </Heading>
      <Button onPress={redirectToSessionScreen}>Confirm</Button>
    </Center>
  );
}
