import flatten from 'flat';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, List, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePrivateKeyStore } from '../stores/privateKey.store';
import { useSelectedSession } from '../stores/selectedSession.store';
import type { HistoryScreenProps } from '../types/navigation';
import type {
  FlattenedSessionWithoutSessionMetadataPrefix,
  Session,
} from '../types/session';
import SessionsLocalService from '../utils/SessionsLocalService';

export default function SessionViewScreen({
  navigation,
}: HistoryScreenProps<'SessionViewScreen'>) {
  const privateKey = usePrivateKeyStore((state) => state.privateKey);
  const [sessionsLocalService] = useState(
    () => new SessionsLocalService(privateKey)
  );

  const sessionFileUris = useSelectedSession((state) => state.sessionFileUris);
  const [flattenedSessionData, setFlattenedSessionData] =
    useState<FlattenedSessionWithoutSessionMetadataPrefix | null>(null);

  const getSessionDataByFileUri = async (fileUri: string) => {
    const localSessionData = await sessionsLocalService.getSessionByFileUri(
      fileUri
    );

    const flattenedSessionData = flatten<
      Session,
      FlattenedSessionWithoutSessionMetadataPrefix
    >(localSessionData, {
      transformKey: (key) => key.replace('sessionMetadata', ''),
    });

    setFlattenedSessionData(flattenedSessionData);
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getSessionDataByFileUri(sessionFileUris.sessionFileUri);
  }, [sessionFileUris.sessionFileUri]);

  return (
    <SafeAreaView className='flex-1'>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Content title='Session View' />
      </Appbar.Header>
      <Surface className='flex-1'>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}
        >
          {flattenedSessionData &&
            Object.entries(flattenedSessionData).map(([key, value]) => (
              <Surface key={key} className='my-1.5 rounded-md' elevation={3}>
                <List.Item
                  title={key}
                  description={JSON.stringify(value)}
                  key={key}
                />
              </Surface>
            ))}
        </ScrollView>
      </Surface>
    </SafeAreaView>
  );
}
