import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

import GradeInfo from '@/utils/types/gradeInfo';

type InitialState = {
  grades: GradeInfo[];
};
const initialState: InitialState = {
  grades: [],
};

/** This is for managing the state in grade module of students. */
const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {
    gradesAdd(state, action: { payload: InitialState['grades'][number] }) {
      state.grades.push(action.payload);
    },

    gradeResetState(state) {
      state.grades.splice(0);
    },
  },
});

// SELECTORS.
export const grades = (s: RootState['grade']) => s.grades;

// ACTIONS.
export const { gradesAdd, gradeResetState } = gradeSlice.actions;
export default gradeSlice.reducer;
