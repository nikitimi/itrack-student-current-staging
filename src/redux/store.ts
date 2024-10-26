import { configureStore } from '@reduxjs/toolkit';
import certificateReducer from '@/redux/reducers/certificateReducer';
import gradeReducer from '@/redux/reducers/gradeReducer';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    certificate: certificateReducer,
    grade: gradeReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import internshipReducer from '@/redux/reducers/internshipReducer';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    internship: internshipReducer,
  },
});

export default store;
