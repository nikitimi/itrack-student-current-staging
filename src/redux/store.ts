import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '@/redux/reducers/authenticationReducer';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;
