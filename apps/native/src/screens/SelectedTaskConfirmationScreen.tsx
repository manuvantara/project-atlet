import { Button, Heading, Text } from 'native-base';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelectedTask } from '../stores/selectedTask.store';
import type { TasksScreenProps } from '../types/navigation';

export default function SelectedTaskConfirmationScreen({
  navigation,
}: TasksScreenProps<'SelectedTaskConfirmationScreen'>) {
  const selectedTask = useSelectedTask((state) => state.selectedTask);

  return (
    <SafeAreaView className='flex-1 bg-primary px-4 justify-center items-center'>
      <View className='pt-20 w-full'>
        <View className='mb-4'>
          <Heading size='2xl' className='mb-4'>
            Task #{selectedTask.taskId}
          </Heading>
          <View>
            <Heading size='md' className='mb-2'>
              Description
            </Heading>
            <Text className='text-lg'>{selectedTask.description}</Text>
          </View>
        </View>
        <ScrollView className='max-h-[200px]'>
          {Object.entries(selectedTask.sessionMetadata).map(([key, value]) => (
            <View
              className='flex-row justify-between items-center w-full bg-secondary p-2 rounded-md mb-2'
              key={key}
            >
              <View className='flex-row p-1 bg-quinary opacity-80 rounded-md mr-2'>
                <Text className='text-lg'>{key}</Text>
              </View>
              <Text className='text-lg flex-shrink text-right'>
                {typeof value === 'object' ? value.join('\n') : value}
              </Text>
            </View>
          ))}
        </ScrollView>
        <Button
          size='lg'
          onPress={() => navigation.navigate('SessionScreen')}
          className='mt-4 w-full'
        >
          Confirm
        </Button>
      </View>
    </SafeAreaView>
  );
}
