import { Button, Center, Heading } from 'native-base';
import { usePrivateKeyStore } from '../stores/privateKey.store';

export default function SettingsScreen() {
  const signOut = usePrivateKeyStore((state) => state.signOut);

  return (
    <Center flex={1} px={4}>
      <Heading size='2xl' className='mb-4'>
        Settings
      </Heading>
      <Button onPress={signOut}>Sign out</Button>
    </Center>
  );
}
