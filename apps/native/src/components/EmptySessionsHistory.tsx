import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function EmptySessionsHistory() {
  const { navigate } = useNavigation();

  const navigateToTasksScreen = () => {
    navigate('TabNavigator', {
      screen: 'Tasks',
      params: { screen: 'TasksScreen' },
    });
  };

  const plusIcon = () => (
    <MaterialCommunityIcons name='plus' size={24} color='white' />
  );

  return (
    <View className='flex-1 justify-center items-center h-full px-4 pt-10'>
      <MaterialCommunityIcons name='emoticon-sad-outline' size={100} />
      <Text variant='bodyLarge' className='text-center my-4'>
        You haven't completed any sessions yet.
      </Text>
      <Button
        mode='contained'
        onPress={navigateToTasksScreen}
        className='w-full'
        icon={plusIcon}
      >
        Start Session
      </Button>
    </View>
  );
}
