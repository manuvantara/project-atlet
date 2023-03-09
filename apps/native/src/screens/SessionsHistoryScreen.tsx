import { useIsFocused } from '@react-navigation/native';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { compareDesc } from 'date-fns';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  ActivityIndicator,
  MD3Colors,
  Surface,
  Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptySessionsHistory from '../components/EmptySessionsHistory';
import SessionCard from '../components/SessionCard';
import { usePrivateKeyStore } from '../stores/privateKey.store';
import type { Session } from '../types/session';
import SessionsLocalService from '../utils/SessionsLocalService';

export default function SessionsHistoryScreen() {
  const isFocused = useIsFocused();

  const privateKey = usePrivateKeyStore((state) => state.privateKey);

  const [sessionsLocalService] = useState(
    () => new SessionsLocalService(privateKey)
  );

  const [sessions, setSessions] = useState<Session[]>([]);
  const [initialLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getSessions = async () => {
    const localSessions = await sessionsLocalService.getSessions();
    setSessions(
      localSessions.sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      )
    );

    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getSessions();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      handleRefresh();
    }
  }, [isFocused]);

  const renderItem: ListRenderItem<Session> = ({ item: session }) => {
    const fileUris = sessionsLocalService.generateFileUrisFromSessionId(
      session.sessionId
    );

    return <SessionCard session={session} fileUris={fileUris} />;
  };

  const itemSeparator = () => <View className='h-4' />;

  return (
    <SafeAreaView className='flex-1'>
      <Surface className='flex-1'>
        <Text variant='headlineLarge' className='pt-20 mb-6 px-4'>
          Sessions History
        </Text>
        {initialLoading ? (
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator size={72} color={MD3Colors.primary50} />
          </View>
        ) : (
          <FlashList
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
            data={sessions}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={renderItem}
            estimatedItemSize={160}
            ItemSeparatorComponent={itemSeparator}
            ListEmptyComponent={EmptySessionsHistory}
            keyExtractor={(item) => item.sessionId}
          />
        )}
      </Surface>
    </SafeAreaView>
  );
}
