import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';

export const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await getItemAsync(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await deleteItemAsync(name);
  },
};

interface PrivateKeyStore {
  signedIn: boolean;
  privateKey: string;
  setPrivateKey: (privateKey: string) => void;
  setSignedIn: (signedIn: boolean) => void;
  signOut: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const usePrivateKeyStore = create(
  persist<PrivateKeyStore>(
    (set) => ({
      signedIn: false,
      privateKey: '',
      setPrivateKey: (privateKey: string) => set({ privateKey }),
      setSignedIn: (signedIn: boolean) => set({ signedIn }),
      signOut: () => set({ signedIn: false }),
      _hasHydrated: false,
      setHasHydrated: (hasHydrated: boolean) =>
        set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: 'private-key',
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
