import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './src/screens/Navigation';
import { usePrivateKeyStore } from './src/stores/privateKey.store';

import 'expo-dev-client';

const requestStoragePermission = async () => {
  // eslint-disable-next-line no-useless-catch
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
      Alert.alert(
        'Error',
        'Storage permission is required to download files, make sure to grant it in the app settings',
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]
      );
    }
  } catch (err) {
    throw err;
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

  const handleError = (error: Error, stackTrace: string) => {
    Alert.alert(
      'Error',
      `An error has occurred. Please restart the app. ${error.message}`,
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]
    );
  };

  // TODO: Add a loading screen or something (maybe a splash screen)
  if (!hasHydrated) return null;

  return (
    <ErrorBoundary onError={handleError}>
      <NavigationContainer theme={DarkTheme}>
        <NativeBaseProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar style='auto' />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
