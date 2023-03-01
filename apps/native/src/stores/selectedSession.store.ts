import { create } from 'zustand';

export interface SelectedSessionState {
  sessionFileUris: {
    sessionFileUri: string;
    sensorReadingsFileUri: string;
  };
  setSessionFileUris: (fileUris: {
    sessionFileUri: string;
    sensorReadingsFileUri: string;
  }) => void;
}

export const useSelectedSession = create<SelectedSessionState>((set) => ({
  sessionFileUris: {
    sessionFileUri: '',
    sensorReadingsFileUri: '',
  },
  setSessionFileUris: (fileUris) => set({ sessionFileUris: fileUris }),
}));
