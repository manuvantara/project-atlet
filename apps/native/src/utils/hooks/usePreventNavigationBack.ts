import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';

export const usePreventNavigationBack = (
  navigation: NativeStackNavigationProp<any>,
  sessionIsRunning: boolean
) => {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (sessionIsRunning) {
          // Prevent default behavior of leaving the screen
          e.preventDefault();
        }
      }),
    [navigation, sessionIsRunning]
  );
};
