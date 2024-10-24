import { configureStore } from '@reduxjs/toolkit';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {},
});

export default store;
