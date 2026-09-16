import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter, Priority, Task, TaskState } from './types';

const storedTasks = localStorage.getItem('todoApp_tasks');
const initialTasks: Task[] = storedTasks ? JSON.parse(storedTasks) as Task[] : [];

const initialState: TaskState = { tasks: initialTasks, filter: 'all' };

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.unshift({
        id: Date.now(),
        text: action.payload,
        completed: false,
        priority: 'medium',
        createdAt: new Date().toLocaleString('es-ES'),
      });
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    changePriority: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) return;
      const priorities: Priority[] = ['low', 'medium', 'high'];
      task.priority = priorities[(priorities.indexOf(task.priority) + 1) % priorities.length];
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
    sortTasks: (state) => {
      const order: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
      state.tasks.sort((a, b) => order[b.priority] - order[a.priority]);
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    importTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = [...state.tasks, ...action.payload];
    },
    resetTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const {
  addTask, toggleTask, deleteTask, changePriority, clearCompleted,
  sortTasks, setFilter, importTasks, resetTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
