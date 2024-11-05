import type { PromptType } from '@/lib/enums/prompType';
import type { ModuleList } from '@/lib/schema/moduleList';
import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

type InitialState = ModuleList & {};

// PAYLOAD TYPES.
type SetPrompTypePayload = {
  promptType: PromptType;
  key: keyof ModuleList;
};

const initialState: InitialState = {
  certificateModule: 'waiting',
  gradeModule: 'waiting',
  internshipModule: 'waiting',
};

/** This is for managing the state in grade module of students. */
const inputControl = createSlice({
  name: 'inputControl',
  initialState,
  reducers: {
    inputControlSetPromptType(state, action: { payload: SetPrompTypePayload }) {
      const { key, promptType } = action.payload;
      state[key] = promptType;
    },
    inputControlResetter(state) {
      state.certificateModule = initialState.certificateModule;
      state.gradeModule = initialState.gradeModule;
      state.internshipModule = initialState.internshipModule;
    },
  },
});

// SELECTORS.
export const certificateModuleInputControl = (s: RootState['inputControl']) =>
  s.certificateModule;
export const gradeModuleInputControl = (s: RootState['inputControl']) =>
  s.gradeModule;
export const internshipModuleInputControl = (s: RootState['inputControl']) =>
  s.internshipModule;

// ACTIONS.
export const { inputControlSetPromptType, inputControlResetter } =
  inputControl.actions;
export default inputControl.reducer;
