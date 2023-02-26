import { Box, Center, Heading, HStack, VStack } from 'native-base';
import SessionsLocalService, { shareFile } from '../utils/SessionsLocalService';
import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { usePrivateKeyStore } from '../stores/privateKey.store';
import Share from 'react-native-share';

export default function SessionsHistoryScreen() {
  const privateKey = usePrivateKeyStore((state) => state.privateKey);
  const [sessionsLocalService] = useState(
    () => new SessionsLocalService(privateKey)
  );
  const [sessions, setSessions] = useState<any>([]);

  const getSessions = async () => {
    const sessions = await sessionsLocalService.getSessions();
    setSessions(sessions);
  };

  const shareSession = async (fileUri: string) => {
    console.log('fileUri', fileUri);
    await shareFile(fileUri);
  };

  // TODO: fix type
  const renderItem = ({ item }: { item: any }) => {
    const filesUris = sessionsLocalService.generateFileUrisFromSessionId(
      item.sessionId
    );

    return (
      <Box>
        <HStack space={4}>
          <VStack p={4} space={2}>
            <Text>{item.sessionId}</Text>
            <Share.Button
              iconSrc={require('../../assets/share.png')}
              onPress={() => shareSession(filesUris.sessionFileUri)}
            >
              session.json
            </Share.Button>
            <Share.Button
              iconSrc={require('../../assets/share.png')}
              onPress={() => shareSession(filesUris.sessionFileUri)}
            >
              sensorReadings.csv
            </Share.Button>
          </VStack>
        </HStack>
      </Box>
    );
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <Center flex={1} px={4}>
      <Heading size='2xl' className='mb-4'>
        Sessions History
      </Heading>
      <FlatList data={sessions} renderItem={renderItem} />
    </Center>
  );
}
