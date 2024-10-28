import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '@/redux/reducers/authenticationReducer';
import certificateReducer from '@/redux/reducers/certificateReducer';
import gradeReducer from '@/redux/reducers/gradeReducer';
import internshipReducer from '@/redux/reducers/internshipReducer';
import studentInfoReducer from '@/redux/reducers/studentInfoReducer';
import studentTemporaryReducer from './reducers/studentTemporaryReducer';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    certificate: certificateReducer,
    grade: gradeReducer,
    internship: internshipReducer,
    studentInfo: studentInfoReducer,
    studentTemporary: studentTemporaryReducer,
  },
});

export default store;
