import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import {
  Button,
  Heading,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptySessionsHistory from '../components/EmptySessionsHistory';
import { usePrivateKeyStore } from '../stores/privateKey.store';
import { useSelectedSession } from '../stores/selectedSession.store';
import type { HistoryScreenProps } from '../types/navigation';
import SessionsLocalService, { shareFile } from '../utils/SessionsLocalService';

export default function SessionsHistoryScreen({
  navigation,
}: HistoryScreenProps<'SessionsHistoryScreen'>) {
  const isFocused = useIsFocused();

  const privateKey = usePrivateKeyStore((state) => state.privateKey);

  const [sessionsLocalService] = useState(
    () => new SessionsLocalService(privateKey)
  );

  const [sessions, setSessions] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const setSelectedSessionFileUris = useSelectedSession(
    (state) => state.setSessionFileUris
  );

  const getSessions = async () => {
    const localSessions = await sessionsLocalService.getSessions();
    setSessions(
      localSessions.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
    );
    setLoading(false);
  };

  const shareSession = async (fileUri: string) => {
    await shareFile(fileUri);
  };

  const handleSessionPress = async (fileUris: {
    sessionFileUri: string;
    sensorReadingsFileUri: string;
  }) => {
    setSelectedSessionFileUris(fileUris);

    navigation.navigate('SessionViewScreen');
  };

  // TODO: fix type
  const renderItem = ({ item }: { item: any }) => {
    const fileUris = sessionsLocalService.generateFileUrisFromSessionId(
      item.sessionId
    );

    return (
      <TouchableOpacity onPress={() => handleSessionPress(fileUris)}>
        <HStack
          rounded={6}
          p={2}
          space={4}
          alignItems='center'
          justifyContent='center'
          className='bg-secondary w-full'
        >
          <Text fontSize='lg' maxW={100} className='flex-shrink'>
            {item.sessionId}
          </Text>
          <VStack space={2}>
            <Button
              leftIcon={<Icon as={FontAwesome} name='share' color='white' />}
              onPress={() => shareSession(fileUris.sessionFileUri)}
            >
              session.json
            </Button>
            <Button
              leftIcon={<Icon as={FontAwesome} name='share' color='white' />}
              onPress={() => shareSession(fileUris.sensorReadingsFileUri)}
            >
              sensorReadings.csv
            </Button>
          </VStack>
        </HStack>
      </TouchableOpacity>
    );
  };

  const itemSeparator = () => <View className='h-4' />;

  useEffect(() => {
    if (isFocused) {
      getSessions();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className='flex-1 items-center h-full px-4 bg-primary pb-10'>
      <Heading size='2xl' className='mb-4 pt-36'>
        Sessions History
      </Heading>
      {loading ? (
        <HStack space={4} pt={20} justifyContent='center' alignItems='center'>
          <Spinner size={72} />
        </HStack>
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparator}
          ListEmptyComponent={EmptySessionsHistory}
          keyExtractor={(item) => item.sessionId}
        />
      )}
    </SafeAreaView>
  );
}
