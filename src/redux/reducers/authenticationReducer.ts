import type { StudentType } from '@/lib/enums/studentType';
import type { UserRole } from '@/lib/enums/userRole';
import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

import { EMPTY_STRING, WRONG_NUMBER } from '@/utils/constants';
import { Specialization } from '@/lib/enums/specialization';

type InitialState = {
  specialization: Specialization | 'null';
  studentNumber: number;
  studentType: StudentType | 'null';
  userType: UserRole | 'anonymous';
  userId: string;
};
/** `studentNumber`: ***'null'*** if userType is ***'anonymous'***.
 *
 * `studentType`: Validation of student number to the year is dependent here,
 * if ***'null'*** there is no student logged in aka. ***'anonymous'***.
 *
 * `userType`: ***'admin'*** is logged in, ***'student'*** is logged in. else ***'anonymous'***.
 * */
const initialState: InitialState = {
  specialization: 'null',
  studentNumber: WRONG_NUMBER,
  studentType: 'null',
  userType: 'anonymous',
  userId: EMPTY_STRING,
};

/** This is for managing the state in authentication module of students. */
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticationSetStudentSpecialization(
      state,
      action: { payload: InitialState['specialization'] }
    ) {
      state.specialization = action.payload;
    },
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
    authenticationSetUserID(
      state,
      action: { payload: InitialState['userId'] }
    ) {
      state.userId = action.payload;
    },
    authenticationResetState(state) {
      state.studentNumber = initialState.studentNumber;
      state.studentType = initialState.studentType;
      state.userId = initialState.userId;
      state.userType = initialState.userType;
    },
  },
});

// SELECTORS.
export const specialization = (a: RootState['authentication']) =>
  a.specialization;
export const studentNumber = (a: RootState['authentication']) =>
  a.studentNumber;
export const studentType = (a: RootState['authentication']) => a.studentType;
export const userType = (a: RootState['authentication']) => a.userType;
export const userId = (a: RootState['authentication']) => a.userId;

// ACTIONS.
export const {
  authenticationSetStudentSpecialization,
  authenticationSetStudentNumber,
  authenticationSetStudentType,
  authenticationSetUserType,
  authenticationResetState,
  authenticationSetUserID,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
