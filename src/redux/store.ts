import { configureStore } from '@reduxjs/toolkit';
import gradeReducer from '@/redux/reducers/gradeReducer';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    grade: gradeReducer,
  },
});

export default store;
