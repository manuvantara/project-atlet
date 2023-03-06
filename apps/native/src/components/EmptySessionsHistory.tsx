import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Text, VStack } from 'native-base';

export default function EmptySessionsHistory() {
  const { navigate } = useNavigation();

  const navigateToTasksScreen = () => {
    navigate('TabNavigator', {
      screen: 'Tasks',
      params: { screen: 'TasksScreen' },
    });
  };

  return (
    <VStack flex={1} alignItems='center' justifyContent='center' mt={8}>
      <Icon as={FontAwesome} name='history' size='4xl' />
      <Text fontSize='xl' mt={4}>
        No sessions found
      </Text>
      <Button mt={4} onPress={navigateToTasksScreen}>
        Start a new session
      </Button>
    </VStack>
  );
}
