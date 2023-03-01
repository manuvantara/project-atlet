import { Center, Heading, Text } from 'native-base';
import { useEffect, useState } from 'react';

import { usePrivateKeyStore } from '../stores/privateKey.store';
import { useSelectedSession } from '../stores/selectedSession.store';
import type { Session } from '../types/sensors';
import SessionsLocalService from '../utils/SessionsLocalService';

export default function SessionViewScreen() {
  const privateKey = usePrivateKeyStore((state) => state.privateKey);
  const [sessionsLocalService] = useState(
    () => new SessionsLocalService(privateKey)
  );

  const [sessionData, setSessionData] = useState<Session | null>(null);

  const sessionFileUris = useSelectedSession((state) => state.sessionFileUris);

  const getSessionDataByFileUri = async (fileUri: string) => {
    const localSessionData = await sessionsLocalService.getSessionByFileUri(
      fileUri
    );
    setSessionData(localSessionData);
  };

  useEffect(() => {
    getSessionDataByFileUri(sessionFileUris.sessionFileUri);
  }, []);

  return (
    <Center flex={1} px={4} className='bg-primary'>
      <Heading size='2xl' className='mb-4'>
        Session #{sessionData?.sessionId}
      </Heading>
      {sessionData && (
        <>
          <Text>{JSON.stringify(sessionData)}</Text>
        </>
      )}
    </Center>
  );
}
