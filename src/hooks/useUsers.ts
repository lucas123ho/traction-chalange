import { useCallback, useMemo } from 'react';

import UserService from 'services/user';
import { User } from 'services/user/type';

import {
  resetError,
  setAllUsers,
  setError,
  setLoading,
  setSelectedUser,
  setUsers
} from 'store/slices/user';
import { UserState } from 'store/slices/user/type';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
// import { useCompanies } from './useCompanies';
import useUnits from './useUnits';

interface UseUsersResponse extends UserState {
  usersWithoutSelected: User[];
  getAllUsers: () => void;
  getAllUsersBySelectedUnit: () => void;
  handleChangeSelectedUser: (user: User) => void;
}

const userServiceInstance = new UserService();

export default function useUsers(): UseUsersResponse {
  const { selectedUser, users, error, loading, allUsers } = useAppSelector(
    (state) => state.user
  );
  const { selectedUnit } = useUnits();
  // const { selectedCompany } = useCompanies();
  const dispatch = useAppDispatch();

  const usersWithoutSelected = useMemo(() => {
    if (!users) {
      return [];
    }

    return users.filter((user) => user.id !== selectedUser?.id);
  }, [users, selectedUser]);

  const call = useCallback(
    async <T = void>(callHandler: () => Promise<T>) => {
      dispatch(setLoading(true));
      dispatch(resetError());

      try {
        return await callHandler();
      } catch (e: unknown) {
        dispatch(setError((e as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const getAllUsers = useCallback(async () => {
    const users = await call<User[]>(() => {
      return userServiceInstance.getAllUsers();
    });

    if (!users) {
      return;
    }

    dispatch(setAllUsers(users));
  }, [userServiceInstance, call]);

  const getAllUsersBySelectedUnit = useCallback(async () => {
    if (!selectedUnit) {
      return;
    }

    const users = await call<User[]>(() => {
      return userServiceInstance.getAllUsersByUnitId(selectedUnit.id);
    });

    if (!users) {
      return;
    }

    dispatch(setUsers(users));
  }, [userServiceInstance, selectedUnit, call]);

  const handleChangeSelectedUser = useCallback(
    (user: User) => {
      dispatch(setSelectedUser(user));
    },
    [dispatch]
  );

  return {
    selectedUser,
    users,
    error,
    loading,
    getAllUsers,
    usersWithoutSelected,
    handleChangeSelectedUser,
    getAllUsersBySelectedUnit,
    allUsers
  };
}
