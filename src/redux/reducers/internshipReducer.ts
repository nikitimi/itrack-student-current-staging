import type { InternshipTask } from '@/lib/enums/internshipTask';
import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

type InternshipTaskProps = {
  name: InternshipTask;
};

type InitialState = {
  internshipCompanyQuestion: boolean;
  internshipGrade: number;
  internshipModuleCompleted: boolean;
  internshipTasks: InternshipTaskProps[];
};
const initialState: InitialState = {
  internshipCompanyQuestion: true,
  internshipGrade: 0,
  internshipModuleCompleted: false,
  internshipTasks: [],
};

/** This is for managing the state in internship module of students. */
const internshipSlice = createSlice({
  name: 'internship',
  initialState,
  reducers: {
    internshipCompanyQuestionUpdate(
      state,
      action: { payload: (typeof initialState)['internshipCompanyQuestion'] }
    ) {
      state.internshipCompanyQuestion = action.payload;
    },
    internshipGradeUpdate(
      state,
      action: { payload: (typeof initialState)['internshipGrade'] }
    ) {
      state.internshipGrade = action.payload;
    },
    internshipModuleStateUpdate(
      state,
      action: { payload: (typeof initialState)['internshipModuleCompleted'] }
    ) {
      state.internshipModuleCompleted = action.payload;
    },
    internshipTaskAdd(
      state,
      action: { payload: (typeof initialState)['internshipTasks'][number] }
    ) {
      state.internshipTasks.push(action.payload);
    },
    internshipResetState(state) {
      state.internshipCompanyQuestion = initialState.internshipCompanyQuestion;
      state.internshipGrade = initialState.internshipGrade;
      state.internshipTasks = initialState.internshipTasks;
    },
  },
});

// SELECTORS.
export const internshipCompanyQuestion = (s: RootState) =>
  s.internship.internshipCompanyQuestion;
export const internshipGrade = (s: RootState) => s.internship.internshipGrade;
/** This controls whether the student can update their internship module. */
export const internshipModuleCompleted = (s: RootState) =>
  s.internship.internshipModuleCompleted;
export const internshipTasks = (s: RootState) => s.internship.internshipTasks;

// ACTIONS.
export const {
  internshipCompanyQuestionUpdate,
  internshipGradeUpdate,
  internshipTaskAdd,
} = internshipSlice.actions;
export default internshipSlice.reducer;
