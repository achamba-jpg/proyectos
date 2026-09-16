export type Priority = 'low' | 'medium' | 'high';
export type Filter = 'all' | 'pending' | 'completed';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}

export interface TaskState {
  tasks: Task[];
  filter: Filter;
}
