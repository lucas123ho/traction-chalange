import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { User } from 'services/user/type';

import { requestStatusReducer } from '../request';
import { UserState } from './type';

const initialState: UserState = {
  selectedUser: null,
  error: null,
  users: [],
  loading: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state: UserState, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    setUsers: (state: UserState, action: PayloadAction<User[]>) => {
      if (!action.payload.length) {
        state = initialState;
      }

      state.users = action.payload;
      state.selectedUser = action.payload[0];
    },
    ...requestStatusReducer
  }
});

export const { setSelectedUser, setUsers, setLoading, setError, resetError } =
  userSlice.actions;

export default userSlice.reducer;
