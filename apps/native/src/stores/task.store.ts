import { create } from 'zustand';
import type { Task } from '../types/session-metadata';

export interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => set({ tasks }),
}));
