import { create } from 'zustand';

import type { Task } from '../types/session-metadata';

interface SelectedTaskState {
  selectedTask: Task;
  setSelectedTask: (task: Task) => void;
}

export const useSelectedTask = create<SelectedTaskState>((set) => ({
  selectedTask: {} as Task,
  setSelectedTask: (task: Task) => set({ selectedTask: task }),
}));
