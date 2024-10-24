import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  studentNumber: 'null' | number;
  studentType: 'regular' | 'irregular' | 'null';
  userType: 'admin' | 'student' | 'anonymous';
};
/** `studentNumber`: ***'null'*** if userType is ***'anonymous'***.
 *
 * `studentType`: Validation of student number to the year is dependent here,
 * if ***'null'*** there is no student logged in aka. ***'anonymous'***.
 *
 * `userType`: ***'admin'*** is logged in, ***'student'*** is logged in. else ***'anonymous'***.
 * */
const initialState: InitialState = {
  studentNumber: 'null',
  studentType: 'null',
  userType: 'anonymous',
};

/** This is for managing the state in authentication module of students. */
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticationSetStudentNumber(
      state,
      action: { payload: InitialState['studentNumber'] }
    ) {
      state.studentNumber = action.payload;
    },
    authenticationSetStudentType(
      state,
      action: { payload: InitialState['studentType'] }
    ) {
      state.studentType = action.payload;
    },
    authenticationSetUserType(
      state,
      action: { payload: InitialState['userType'] }
    ) {
      state.userType = action.payload;
    },
    authenticationResetState(state) {
      state.studentNumber = initialState.studentNumber;
      state.studentType = initialState.studentType;
      state.userType = initialState.userType;
    },
  },
});

// SELECTORS.
export const studentNumber = (s: RootState) => s.authentication.studentNumber;
export const studentType = (s: RootState) => s.authentication.studentType;
export const userType = (s: RootState) => s.authentication.userType;

// ACTIONS.
export const {
  authenticationSetStudentNumber,
  authenticationSetStudentType,
  authenticationSetUserType,
  authenticationResetState,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
