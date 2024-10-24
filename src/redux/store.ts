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
