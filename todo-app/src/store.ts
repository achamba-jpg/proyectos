import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export const store = configureStore({ reducer: { tasks: taskReducer } });

store.subscribe(() => {
  localStorage.setItem('todoApp_tasks', JSON.stringify(store.getState().tasks.tasks));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
