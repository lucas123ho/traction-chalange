import { PayloadAction } from '@reduxjs/toolkit';

import { StateWithRequestStatus } from './type';

export const requestStatusReducer = {
  setLoading: (
    state: StateWithRequestStatus,
    action: PayloadAction<boolean>
  ) => {
    state.loading = action.payload;
  },
  setError: (state: StateWithRequestStatus, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  resetError: (state: StateWithRequestStatus) => {
    state.error = null;
  }
};
