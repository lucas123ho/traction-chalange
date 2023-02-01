import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Asset, AssetWithUsersAndWorkorders } from 'services/asset/type';

import { requestStatusReducer } from '../request';
import { AssetFilter, AssetState } from './type';

const initialState: AssetState = {
  assets: [],
  loading: true,
  error: null,
  assetSelected: null,
  filteredAssets: [],
  filter: {
    status: []
  },
  allAssets: [],
};

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setAssets: (state: AssetState, action: PayloadAction<Asset[]>) => {
      if (!action.payload.length) {
        state = initialState;
      }

      state.assets = action.payload;
      state.filteredAssets = action.payload;
      state.filter = initialState.filter;
    },
    setFilter: (state: AssetState, action: PayloadAction<AssetFilter>) => {
      state.filter = action.payload;
    },
    setFilteredAssets: (state: AssetState, action: PayloadAction<Asset[]>) => {
      state.filteredAssets = action.payload;
    },
    setSelectedAsset: (
      state: AssetState,
      action: PayloadAction<AssetWithUsersAndWorkorders>
    ) => {
      state.assetSelected = action.payload;
    },
    setAllAssets: (
      state: AssetState,
      action: PayloadAction<Asset[]>
    ) => {
      state.allAssets = action.payload;
    },
    ...requestStatusReducer
  }
});

export const {
  setAssets,
  resetError,
  setError,
  setLoading,
  setFilter,
  setFilteredAssets,
  setSelectedAsset,
  setAllAssets,
} = assetSlice.actions;

export default assetSlice.reducer;
