import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { List, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelectedTask } from '../stores/selectedTask.store';
import type { TasksScreenProps } from '../types/navigation';
import type { Task } from '../types/session-metadata';
import { TASKS } from '../utils/constants';

export default function TasksScreen({
  navigation,
}: TasksScreenProps<'TasksScreen'>) {
  const setSelectedTask = useSelectedTask((state) => state.setSelectedTask);

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    navigation.navigate<any>('SelectedTaskConfirmationScreen');
  };

  const renderTaskListItem = ({ item }: { item: Task }) => {
    return (
      <View className='flex-1 rounded-md overflow-hidden'>
        <Surface className='flex-1' elevation={4}>
          <List.Item
            title={`Task #${item.taskId}`}
            description={`Activity: ${item.sessionMetadata.activity}`}
            descriptionStyle={{ textTransform: 'capitalize' }}
            left={(props) => (
              <List.Icon {...props} icon='checkbox-marked-circle-outline' />
            )}
            onPress={() => handleTaskPress(item)}
          />
        </Surface>
      </View>
    );
  };

  const itemSeparator = () => <View className='h-4' />;

  return (
    <SafeAreaView className='flex-1'>
      <Surface className='flex-1 justify-center pt-20'>
        <Text variant='headlineLarge' className='mb-4 px-4'>
          Tasks
        </Text>
        <FlashList
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
          data={TASKS}
          estimatedItemSize={50}
          keyExtractor={(item) => item.taskId.toString()}
          renderItem={renderTaskListItem}
          ItemSeparatorComponent={itemSeparator}
        />
      </Surface>
    </SafeAreaView>
  );
}
