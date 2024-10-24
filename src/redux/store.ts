import { configureStore } from '@reduxjs/toolkit';
import certificateReducer from '@/redux/reducers/certificateReducer';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    certificate: certificateReducer,
  },
});

export default store;
