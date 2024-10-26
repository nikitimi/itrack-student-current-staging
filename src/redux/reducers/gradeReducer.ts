import gradeLevelEnum from '@/lib/enums/gradeLevel';
import semesterEnum from '@/lib/enums/semester';
import type { RootState } from '@/redux/store';
import type { SubjectCodesFor2018CurriculumEnum } from '@/lib/enums/subjectCodesFor2018Curriculum';

import { createSlice } from '@reduxjs/toolkit';

function getGradeModuleCompletionList() {
  const list: string[] = [];
  gradeLevelEnum.options.forEach((gradeLevel) =>
    semesterEnum.options.forEach((semester) => {
      // TODO: Infer this type to the `list`.
      const value = `${gradeLevel}-${semester}` as const;
      list.push(value);
    })
  );
  return list;
}

type Grade = {
  code: SubjectCodesFor2018CurriculumEnum;
  grade: string;
};
type GradeModuleCompletionList = ReturnType<
  typeof getGradeModuleCompletionList
>;

type InitialState = {
  grades: Grade[];
  gradeModuleCompletionList: GradeModuleCompletionList;
};
const initialState: InitialState = {
  grades: [],
  gradeModuleCompletionList: getGradeModuleCompletionList(),
};

/** This is for managing the state in grade module of students. */
const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {
    gradesAdd(state, action: { payload: InitialState['grades'][number] }) {
      state.grades.push(action.payload);
    },
    gradeModuleCompletionListUpdate(
      state,
      action: { payload: InitialState['gradeModuleCompletionList'][number] }
    ) {
      const index = state.gradeModuleCompletionList.indexOf(action.payload);
      if (typeof index === 'number') {
        state.gradeModuleCompletionList.splice(index, 1);
      }
    },
    gradeResetState(state) {
      /** Retain the object reference of the array. */
      state.gradeModuleCompletionList.splice(0);
      getGradeModuleCompletionList().forEach((v) =>
        state.gradeModuleCompletionList.push(v)
      );

      state.grades.splice(0);
    },
  },
});

// SELECTORS.
export const grades = (s: RootState) => s.grade.grades;
/** This will handle the permission of student to upload COG. */
export const gradeModuleCompletionList = (s: RootState) =>
  s.grade.gradeModuleCompletionList;

// ACTIONS.
export const { gradesAdd, gradeModuleCompletionListUpdate, gradeResetState } =
  gradeSlice.actions;
export default gradeSlice.reducer;
