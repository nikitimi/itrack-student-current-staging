import type { InternshipTask } from '@/lib/enums/internshipTask';
import type { RootState } from '@/redux/store';
import type { InitializingState } from '@/utils/types/initializingState';

import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  internshipCompanyQuestion: boolean | InitializingState;
  internshipGrade: number | InitializingState;
  internshipModuleCompleted: boolean | InitializingState;
  internshipTasks: InternshipTask[];
};
const initialState: InitialState = {
  internshipCompanyQuestion: 'initializing',
  internshipGrade: 'initializing',
  internshipModuleCompleted: 'initializing',
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
    internshipSetCompletion(
      state,
      action: { payload: (typeof initialState)['internshipModuleCompleted'] }
    ) {
      state.internshipModuleCompleted = action.payload;
    },
    internshipTaskRemove(
      state,
      action: { payload: (typeof initialState)['internshipTasks'][number] }
    ) {
      const index = state.internshipTasks.indexOf(action.payload);
      state.internshipTasks.splice(index, 1);
    },
    internshipResetState(state) {
      state.internshipCompanyQuestion = initialState.internshipCompanyQuestion;
      state.internshipGrade = initialState.internshipGrade;
      state.internshipTasks = initialState.internshipTasks;
    },
  },
});

// SELECTORS.
export const internshipCompanyQuestion = (s: RootState['internship']) =>
  s.internshipCompanyQuestion;
export const internshipGrade = (s: RootState['internship']) =>
  s.internshipGrade;
/** This controls whether the student can update their internship module. */
export const internshipModuleCompleted = (s: RootState['internship']) =>
  s.internshipModuleCompleted;
export const internshipTasks = (s: RootState['internship']) =>
  s.internshipTasks;

// ACTIONS.
export const {
  internshipCompanyQuestionUpdate,
  internshipSetCompletion,
  internshipGradeUpdate,
  internshipTaskAdd,
  internshipTaskRemove,
} = internshipSlice.actions;
export default internshipSlice.reducer;
