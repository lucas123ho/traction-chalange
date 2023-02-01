import { useCallback } from 'react';

import WorkorderService from 'services/workorder';
import { Workorder, WorkorderFilter } from 'services/workorder/type';

import {
  resetError,
  setError,
  setFilter,
  setFilteredWorkorders,
  setLoading,
  setNewWorkorder,
  setSelectedWorkorder,
  setWorkorders
} from 'store/slices/workorder';
import { WorkorderState } from 'store/slices/workorder/type';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

interface UseWorkordersResponse extends WorkorderState {
  getAllWorkorders: () => void;
  getFilteredWorkorders: (filter: WorkorderFilter) => void;
  getWorkorderById: (id: number) => void;
  removeSelectedWorkorder: () => void;
  createNewWorkorder: (workorder: Omit<Workorder, 'id'>) => void;
}

const workorderServiceInstance = new WorkorderService();

export default function useWorkorder(): UseWorkordersResponse {
  const {
    workorders,
    workorderSelected,
    loading,
    error,
    filter,
    filteredWorkorders
  } = useAppSelector((state) => state.woekorder);
  const dispatch = useAppDispatch();

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

  const getAllWorkorders = useCallback(async () => {
    const workorders = await call(() => {
      return workorderServiceInstance.getWorkerorders();
    });

    if (!workorders) {
      return;
    }

    dispatch(setWorkorders(workorders));
  }, [dispatch]);

  const getFilteredWorkorders = useCallback(
    async (filter: WorkorderFilter) => {
      dispatch(setFilter(filter));

      const workorders = await call(() => {
        return workorderServiceInstance.getWorkerorders(filter);
      });

      if (!workorders) {
        return;
      }

      dispatch(setFilteredWorkorders(workorders));
    },
    [dispatch, filter]
  );

  const getWorkorderById = useCallback(
    async (id: number) => {
      const workorder = await call(() => {
        return workorderServiceInstance.getWorkorderById(id);
      });

      if (!workorder) {
        return;
      }

      dispatch(setSelectedWorkorder(workorder));
    },
    [dispatch]
  );

  const removeSelectedWorkorder = useCallback(() => {
    dispatch(setSelectedWorkorder(null));
  }, [dispatch]);

  const createNewWorkorder = useCallback(
    (workorder: Omit<Workorder, 'id'>) => {
      console.log(workorder);
      dispatch(setNewWorkorder(workorder));
    },
    [dispatch]
  );

  return {
    workorders,
    workorderSelected,
    loading,
    error,
    getAllWorkorders,
    filter,
    filteredWorkorders,
    getFilteredWorkorders,
    getWorkorderById,
    removeSelectedWorkorder,
    createNewWorkorder
  };
}
