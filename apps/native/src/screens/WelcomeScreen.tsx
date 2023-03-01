import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  WarningOutlineIcon,
} from 'native-base';
import { useState } from 'react';

import { usePrivateKeyStore } from '../stores/privateKey.store';

export default function WelcomeScreen() {
  const [privateKeyInput, setPrivateKeyInput] = useState('');
  // const [loading, setLoading] = useState(false);
  const setSignedIn = usePrivateKeyStore((state) => state.setSignedIn);
  const setPrivateKey = usePrivateKeyStore((state) => state.setPrivateKey);

  const [isInvalid, setIsInvalid] = useState(false);

  // const fetchAccountIdFromPublicKey = async (publicKey: string) => {
  //   const INDEXER_SERVICE_URL = 'https://testnet-api.kitwallet.app';
  //
  //   const CUSTOM_REQUEST_HEADERS = {
  //     'X-requestor': 'near',
  //   };
  //
  //   const response = await fetch(
  //     `${INDEXER_SERVICE_URL}/publicKey/${publicKey}/accounts`,
  //     {
  //       headers: CUSTOM_REQUEST_HEADERS,
  //     }
  //   );
  //
  //   return response.json();
  // };

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
    setPrivateKey(privateKeyInput);
    setSignedIn(true);
  };
  const validatePrivateKey = (username: string) => {
    const regex = /^[a-zA-Z0-9]{5,32}$/;
    return regex.test(username);
  };

  const isPrivateKeyValid = validatePrivateKey(privateKeyInput);

  return (
    <Center flex={1} px={4} className='bg-primary'>
      <Heading size='2xl' className='mb-8'>
        Welcome!
      </Heading>
      {/*<Text className='mb-2 text-left w-full'>*/}
      {/*  Enter your username to sign in*/}
      {/*</Text>*/}
      {/*<Input*/}
      {/*  mx='3'*/}
      {/*  size='lg'*/}
      {/*  value={privateKeyInput}*/}
      {/*  onChangeText={setPrivateKeyInput}*/}
      {/*  placeholder='Enter your username here'*/}
      {/*  w='100%'*/}
      {/*  mb={4}*/}
      {/*/>*/}
      <FormControl isInvalid={!isPrivateKeyValid} w='100%' mb={6}>
        <FormControl.Label>Enter your username below:</FormControl.Label>
        <Input
          size='lg'
          value={privateKeyInput}
          onChangeText={setPrivateKeyInput}
          placeholder='pantemon'
          w='100%'
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
          You can use only a-Z and 0-9. Minimum length is 5 characters.
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        minW={150}
        w='100%'
        onPress={handleSignIn}
        disabled={!isPrivateKeyValid}
      >
        Sign in
      </Button>
    </Center>
  );
}
