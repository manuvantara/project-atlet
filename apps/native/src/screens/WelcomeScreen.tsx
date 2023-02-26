import { Button, Center, Heading, Input, Text } from 'native-base';
import { keyStores, utils } from 'near-api-js';
import { useState } from 'react';

import { usePrivateKeyStore } from '../stores/privateKey.store';

export default function WelcomeScreen() {
  const [privateKeyInput, setPrivateKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const setSignedIn = usePrivateKeyStore((state) => state.setSignedIn);
  const setPrivateKey = usePrivateKeyStore((state) => state.setPrivateKey);

  const fetchAccountIdFromPublicKey = async (publicKey: string) => {
    const INDEXER_SERVICE_URL = 'https://testnet-api.kitwallet.app';

    const CUSTOM_REQUEST_HEADERS = {
      'X-requestor': 'near',
    };

    const response = await fetch(
      `${INDEXER_SERVICE_URL}/publicKey/${publicKey}/accounts`,
      {
        headers: CUSTOM_REQUEST_HEADERS,
      }
    );

    return response.json();
  };

  const handleSignIn = async () => {
    // setLoading(true);
    // const keyStore = await new keyStores.InMemoryKeyStore();
    // const keyPair = await new utils.KeyPairEd25519(
    //   privateKeyInput.replace('ed25519:', '')
    // );
    //
    // const accountIds = await fetchAccountIdFromPublicKey(
    //   keyPair.publicKey.toString()
    // );
    // const accountId = accountIds.find((id: string) => id.includes('testnet'));
    //
    // await keyStore.setKey('testnet', accountId, keyPair);
    //
    // setPrivateKey(privateKeyInput);
    // setLoading(false);
  };

  return (
    <Center flex={1} px={4}>
      <Heading size='2xl' className='mb-4'>
        Welcome!
      </Heading>
      <Text className='mb-4'>Enter your private key here:</Text>
      <Input
        mx='3'
        size='lg'
        value={privateKeyInput}
        onChangeText={setPrivateKeyInput}
        placeholder='Your private key here'
        w='100%'
      />
      <Button onPress={handleSignIn} isLoading={loading}>
        Sign in
      </Button>
    </Center>
  );
}
