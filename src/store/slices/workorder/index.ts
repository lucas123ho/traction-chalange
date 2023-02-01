import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import {
  Workorder,
  WorkorderFilter,
  WorkorderWithUsersAndAssets
} from 'services/workorder/type';

import { requestStatusReducer } from '../request';
import { WorkorderState } from './type';

const initialState: WorkorderState = {
  workorders: [],
  loading: true,
  error: null,
  workorderSelected: null,
  filteredWorkorders: [],
  filter: null
};

const workorderSlice = createSlice({
  name: 'workorder',
  initialState,
  reducers: {
    setWorkorders: (
      state: WorkorderState,
      action: PayloadAction<Workorder[]>
    ) => {
      if (!action.payload.length) {
        state = initialState;
      }

      state.workorders = action.payload;
      state.filteredWorkorders = action.payload;
      state.filter = initialState.filter;
    },
    setFilter: (
      state: WorkorderState,
      action: PayloadAction<WorkorderFilter>
    ) => {
      state.filter = action.payload;
    },
    setFilteredWorkorders: (
      state: WorkorderState,
      action: PayloadAction<Workorder[]>
    ) => {
      state.filteredWorkorders = action.payload;
    },
    setSelectedWorkorder: (
      state: WorkorderState,
      action: PayloadAction<WorkorderWithUsersAndAssets | null>
    ) => {
      state.workorderSelected = action.payload;
    },
    setNewWorkorder: (
      state: WorkorderState,
      action: PayloadAction<Omit<Workorder, 'id'>>
    ) => {
      state.filteredWorkorders = [
        { ...action.payload, id: 0 },
        ...state.filteredWorkorders
      ];
      state.workorders = [{ ...action.payload, id: 0 }, ...state.workorders];
    },
    ...requestStatusReducer
  }
});

export const {
  setWorkorders,
  resetError,
  setError,
  setLoading,
  setFilter,
  setFilteredWorkorders,
  setSelectedWorkorder,
  setNewWorkorder
} = workorderSlice.actions;

export default workorderSlice.reducer;
