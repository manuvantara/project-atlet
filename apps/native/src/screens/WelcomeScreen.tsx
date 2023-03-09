import { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  HelperText,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const hasError = () => {
    return !validatePrivateKey(privateKeyInput) && privateKeyInput.length > 0;
  };

  return (
    <SafeAreaView className='flex-1'>
      <Surface className='flex-1 justify-center items-center px-4'>
        <Text variant='headlineLarge' className='mb-8'>
          Welcome!
        </Text>
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
        {/*<FormControl isInvalid={!isPrivateKeyValid} w='100%' mb={6}>*/}
        {/*  <FormControl.Label>Enter your username below:</FormControl.Label>*/}
        {/*  <Input*/}
        {/*    size='lg'*/}
        {/*    value={privateKeyInput}*/}
        {/*    onChangeText={setPrivateKeyInput}*/}
        {/*    placeholder='pantemon'*/}
        {/*    w='100%'*/}
        {/*  />*/}
        {/*  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>*/}
        {/*    You can use only a-Z and 0-9. Minimum length is 5 characters.*/}
        {/*  </FormControl.ErrorMessage>*/}
        {/*</FormControl>*/}
        <View className='w-full'>
          <TextInput
            label='Enter your username below:'
            value={privateKeyInput}
            onChangeText={setPrivateKeyInput}
            placeholder='pantemon'
            right={<TextInput.Icon icon='account' />}
            error={hasError()}
          />
          <HelperText type='error' visible={hasError()}>
            You can use only a-Z and 0-9. Minimum length is 5 characters.
          </HelperText>
        </View>
        <View className='w-full'>
          <Button
            mode='contained'
            onPress={handleSignIn}
            disabled={!validatePrivateKey(privateKeyInput)}
          >
            Sign in
          </Button>
        </View>
      </Surface>
    </SafeAreaView>
  );
}
