import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import Navigation from './src/screens/Navigation';
import { usePrivateKeyStore } from './src/stores/privateKey.store';
import 'expo-dev-client';

export default function App() {
  const hasHydrated = usePrivateKeyStore((state) => state._hasHydrated);

  // TODO: Add a loading screen or something (maybe a splash screen)
  if (!hasHydrated) return null;

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Navigation />
        <StatusBar style='auto' />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
