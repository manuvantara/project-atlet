import { ScrollView, View } from 'react-native';
import { Button, Divider, List, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelectedTask } from '../stores/selectedTask.store';
import type { TasksScreenProps } from '../types/navigation';

export default function SelectedTaskConfirmationScreen({
  navigation,
}: TasksScreenProps<'SelectedTaskConfirmationScreen'>) {
  const selectedTask = useSelectedTask((state) => state.selectedTask);

  return (
    <SafeAreaView className='flex-1'>
      <Surface className='flex-1 justify-center items-center'>
        <View className='mb-4 px-4'>
          <Text variant='headlineLarge' className='mb-4'>
            Task #{selectedTask.taskId}
          </Text>
          <View className='gap-2'>
            <Text variant='titleLarge'>Description</Text>
            <Divider bold />
            <Text variant='bodyLarge'>{selectedTask.description}</Text>
          </View>
        </View>
        <ScrollView
          className='max-h-[280px] w-full gap-2'
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {Object.entries(selectedTask.sessionMetadata).map(([key, value]) => (
            <View className='flex-1 overflow-hidden rounded-md' key={key}>
              <Surface className='flex-1' elevation={4}>
                <List.Item
                  title={key}
                  titleStyle={{ marginBottom: 4 }}
                  description={
                    typeof value === 'object' ? value.join(', ') : value
                  }
                  descriptionNumberOfLines={6}
                  left={(props) => (
                    <List.Icon {...props} icon='information-outline' />
                  )}
                />
              </Surface>
            </View>
          ))}
        </ScrollView>
        <View className='w-full px-4 mt-4'>
          <Button
            mode='contained'
            onPress={() => navigation.navigate('SessionScreen')}
          >
            Confirm
          </Button>
        </View>
      </Surface>
    </SafeAreaView>
  );
}
