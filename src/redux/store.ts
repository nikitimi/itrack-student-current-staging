import { configureStore } from '@reduxjs/toolkit';
import certificateReducer from '@/redux/reducers/certificateReducer';
import gradeReducer from '@/redux/reducers/gradeReducer';
import internshipReducer from '@/redux/reducers/internshipReducer';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    certificate: certificateReducer,
    grade: gradeReducer,
    internship: internshipReducer,
  },
});

export default store;
