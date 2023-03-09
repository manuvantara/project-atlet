import { Button, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePrivateKeyStore } from '../stores/privateKey.store';

export default function SettingsScreen() {
  const signOut = usePrivateKeyStore((state) => state.signOut);

  return (
    <SafeAreaView className='flex-1'>
      <Surface className='flex-1 justify-center items-center gap-4'>
        <Text variant='headlineLarge'>Settings</Text>
        <Button mode='contained' onPress={signOut}>
          Sign Out
        </Button>
      </Surface>
    </SafeAreaView>
  );
}
