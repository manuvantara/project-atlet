import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';

export const usePreventNavigationBack = (
  navigation: NativeStackNavigationProp<any>
) => {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // if (!hasUnsavedChanges) {
        //   // If we don't have unsaved changes, then we don't need to do anything
        //   return;
        // }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation]
  );
};
