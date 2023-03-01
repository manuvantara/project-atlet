import { Box, FlatList, Heading, HStack, Text, VStack } from 'native-base';
import { TouchableOpacity, View } from 'react-native';

import { useSelectedTask } from '../stores/selectedTask.store';
import type { ScreenProps } from '../types/navigation';
import type { Task } from '../types/session-metadata';
import { TASKS } from '../utils/constants';

export default function TasksScreen({
  navigation,
}: ScreenProps<'TasksScreen'>) {
  const setSelectedTask = useSelectedTask((state) => state.setSelectedTask);

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    navigation.navigate<any>('SelectedTaskConfirmationScreen');
  };

  const renderTaskListItem = ({ item }: { item: Task }) => {
    return (
      <Box w='100%' className='bg-secondary' rounded='md' p={4} my={2}>
        <TouchableOpacity onPress={() => handleTaskPress(item)}>
          <HStack>
            <VStack>
              <Heading size='md'>Task #{item.taskId}</Heading>
              <Text>Activity: {item.sessionMetadata.activity}</Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <View className='flex-1 bg-primary justify-center h-full px-4 pb-10'>
      <View className='flex-row justify-between pt-36 mb-4'>
        <Heading size='2xl'>Tasks</Heading>
      </View>
      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.taskId.toString()}
        renderItem={renderTaskListItem}
      />
    </View>
  );
}
