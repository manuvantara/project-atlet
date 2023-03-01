import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './src/screens/Navigation';
import { usePrivateKeyStore } from './src/stores/privateKey.store';
import 'expo-dev-client';

const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to download files',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function App() {
  const hasHydrated = usePrivateKeyStore((state) => state._hasHydrated);

  const theme = extendTheme({
    config: {
      initialColorMode: 'dark',
    },
  });

  useEffect(() => {
    requestStoragePermission();
  }, []);

  // TODO: Add a loading screen or something (maybe a splash screen)
  if (!hasHydrated) return null;

  return (
    <NavigationContainer theme={DarkTheme}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar style='auto' />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
