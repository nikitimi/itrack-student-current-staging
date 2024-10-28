import type { UserRole } from '@/lib/enums/userRole';
import type { AuthenticationStatus } from '@/lib/enums/authenticationStatus';
import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

import { EMPTY_STRING } from '@/utils/constants';

type InitialState = {
  status: AuthenticationStatus;
  userId: string;
  userType: UserRole | 'anonymous';
};
/** `studentNumber`: ***'null'*** if userType is ***'anonymous'***.
 *
 * `studentType`: Validation of student number to the year is dependent here,
 * if ***'null'*** there is no student logged in aka. ***'anonymous'***.
 *
 * `userType`: ***'admin'*** is logged in, ***'student'*** is logged in. else ***'anonymous'***.
 * */
const initialState: InitialState = {
  status: 'initializing',
  userId: EMPTY_STRING,
  userType: 'anonymous',
};

/** This is for managing the state in authentication module of students. */
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticationSetStatus(
      state,
      action: { payload: InitialState['status'] }
    ) {
      state.status = action.payload;
    },
    authenticationSetUserID(
      state,
      action: { payload: InitialState['userId'] }
    ) {
      state.userId = action.payload;
    },
    authenticationSetUserType(
      state,
      action: { payload: InitialState['userType'] }
    ) {
      state.userType = action.payload;
    },
    authenticationResetState(state) {
      state.status = initialState.status;
      state.userId = initialState.userId;
      state.userType = initialState.userType;
    },
  },
});

// SELECTORS.
export const authenticationStatus = (a: RootState['authentication']) =>
  a.status;
export const authenticationUserID = (a: RootState['authentication']) =>
  a.userId;
export const authenticationUserType = (a: RootState['authentication']) =>
  a.userType;

// ACTIONS.
export const {
  authenticationResetState,
  authenticationSetStatus,
  authenticationSetUserID,
  authenticationSetUserType,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
