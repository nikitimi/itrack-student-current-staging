import type { Certificate } from '@/lib/enums/certificate';
import type { RootState } from '@/redux/store';

import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  certificateList: Certificate[];
};
const initialState: InitialState = {
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
    certificateResetState(state) {
      state.certificateList.splice(0);
    },
  },
});

// SELECTORS.

export const certificateList = (s: RootState['certificate']) =>
  s.certificateList;

// ACTIONS.
export const { certificateAdd, certificateRemove, certificateResetState } =
  certificateSlice.actions;
export default certificateSlice.reducer;
