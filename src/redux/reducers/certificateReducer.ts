import type { Certificate } from '@/lib/enums/certificate';
import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  certificateModuleCompleted: boolean;
  certificateList: Certificate[];
};
const initialState: InitialState = {
  certificateModuleCompleted: false,
  certificateList: [],
};

/** This is for managing the state in certificate module of students. */
const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {
    certificateAdd(
      state,
      action: { payload: (typeof initialState)['certificateList'][number] }
    ) {
      if (!state.certificateList.includes(action.payload)) {
        state.certificateList.push(action.payload);
      }
    },
    certificateRemove(
      state,
      action: { payload: (typeof initialState)['certificateList'][number] }
    ) {
      if (state.certificateList.includes(action.payload)) {
        const index = state.certificateList.indexOf(action.payload);
        state.certificateList.splice(index, 1);
      }
    },
    certificateModuleStateUpdate(
      state,
      action: { payload: (typeof initialState)['certificateModuleCompleted'] }
    ) {
      state.certificateModuleCompleted = action.payload;
    },
    certificateResetState(state) {
      state.certificateList.splice(0);
      state.certificateModuleCompleted =
        initialState.certificateModuleCompleted;
    },
  },
});

// SELECTORS.

export const certificateList = (s: RootState['certificate']) =>
  s.certificateList;
/** Controls whether the student can input in certificate module.  */
export const certificateModuleCompleted = (s: RootState['certificate']) =>
  s.certificateModuleCompleted;

// ACTIONS.
export const {
  certificateAdd,
  certificateRemove,
  certificateModuleStateUpdate,
  certificateResetState,
} = certificateSlice.actions;
export default certificateSlice.reducer;
