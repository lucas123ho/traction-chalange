import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Unit } from 'services/unit/type';

import { requestStatusReducer } from '../request';
import { UnitState } from './type';

const initialState: UnitState = {
  selectedUnit: null,
  units: [],
  error: null,
  loading: true
};

export const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    setSelectedUnit: (state: UnitState, action: PayloadAction<Unit>) => {
      state.selectedUnit = action.payload;
    },
    setUnits: (state: UnitState, action: PayloadAction<Unit[]>) => {
      if (!action.payload.length) {
        state = initialState;
      }

      state.units = action.payload;
      state.selectedUnit = action.payload[0];
    },
    ...requestStatusReducer
  }
});

export const { setSelectedUnit, setUnits, setLoading, setError, resetError } =
  unitSlice.actions;

export default unitSlice.reducer;
