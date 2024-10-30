import type { StudentType } from '@/lib/enums/studentType';
import type { Specialization } from '@/lib/enums/specialization';
import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

import { EMPTY_STRING } from '@/utils/constants';

type StudentInfo = {
  specialization: Specialization;
  studentNumber: string;
  studentType: StudentType;
};

type InitialState = StudentInfo;

/** `studentNumber`: ***'null'*** if userType is ***'anonymous'***.
 *
 * `studentType`: Validation of student number to the year is dependent here,
 * if ***'null'*** there is no student logged in aka. ***'anonymous'***.
 *
 * `userType`: ***'admin'*** is logged in, ***'student'*** is logged in. else ***'anonymous'***.
 * */
const initialState: InitialState = {
  specialization: 'BUSINESS_ANALYTICS',
  studentNumber: EMPTY_STRING,
  studentType: 'regular',
};

/** This is for managing the state in studentInfo module of students. */
const studentInfoSlice = createSlice({
  name: 'studentInfo',
  initialState,
  reducers: {
    studentInfoSetNumber(
      state,
      action: { payload: InitialState['studentNumber'] }
    ) {
      state.studentNumber = action.payload;
    },
    studentInfoSetSpecialization(
      state,
      action: { payload: InitialState['specialization'] }
    ) {
      state.specialization = action.payload;
    },
    studentInfoSetType(
      state,
      action: { payload: InitialState['studentType'] }
    ) {
      state.studentType = action.payload;
    },
    studentInfoResetState(state) {
      state.specialization = initialState.specialization;
      state.studentNumber = initialState.studentNumber;
      state.studentType = initialState.studentType;
    },
  },
});

// SELECTORS.
export const studentInfoNumber = (a: RootState['studentInfo']) =>
  a.studentNumber;
export const studentInfoSpecialization = (a: RootState['studentInfo']) =>
  a.specialization;
export const studentInfoType = (a: RootState['studentInfo']) => a.studentType;

// ACTIONS.
export const {
  studentInfoResetState,
  studentInfoSetNumber,
  studentInfoSetSpecialization,
  studentInfoSetType,
} = studentInfoSlice.actions;
export default studentInfoSlice.reducer;
