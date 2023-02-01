import { useCallback } from 'react';

import AssetService from 'services/asset';

import {
  resetError,
  setAllAssets,
  setAssets,
  setError,
  setFilter,
  setFilteredAssets,
  setLoading,
  setSelectedAsset
} from 'store/slices/asset';
import { AssetFilter, AssetState } from 'store/slices/asset/type';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useUnits from './useUnits';

interface UseAssetsResponse extends AssetState {
  getAllAssets: () => void;
  getFilteredAssets: (filter: AssetFilter) => void;
  getAllAssetsBySelectedUnit: () => void;
  getAssetById: (id: number) => void;
}

const assetService = new AssetService();

export default function useAssets(): UseAssetsResponse {
  const {
    assets,
    assetSelected,
    loading,
    error,
    filter,
    filteredAssets,
    allAssets
  } = useAppSelector((state) => state.asset);
  const { selectedUnit } = useUnits();
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

  const getAllAssets = useCallback(async () => {
    const assets = await call(() => {
      return assetService.getAllAssets();
    });

    if (!assets) {
      return;
    }

    dispatch(setAllAssets(assets));
  }, [dispatch]);

  const getAllAssetsBySelectedUnit = useCallback(async () => {
    if (!selectedUnit) {
      return;
    }

    const assets = await call(() => {
      return assetService.getAllAssetsByUnitId(selectedUnit?.id);
    });

    if (!assets) {
      return;
    }

    dispatch(setAssets(assets));
  }, [dispatch, selectedUnit]);

  const getFilteredAssets = useCallback(
    async (filter: AssetFilter) => {
      if (!selectedUnit) {
        return;
      }

      dispatch(setFilter(filter));

      const assets = await call(() => {
        return assetService.getAllAssetsByUnitId(selectedUnit?.id, filter);
      });

      if (!assets) {
        return;
      }

      dispatch(setFilteredAssets(assets));
    },
    [dispatch, selectedUnit, filter]
  );

  const getAssetById = useCallback(
    async (id: number) => {
      const asset = await call(() => {
        return assetService.getAssetById(id);
      });

      if (!asset) {
        return;
      }

      dispatch(setSelectedAsset(asset));
    },
    [dispatch]
  );

  return {
    assets,
    assetSelected,
    loading,
    error,
    getAllAssets,
    filter,
    filteredAssets,
    getFilteredAssets,
    getAssetById,
    allAssets,
    getAllAssetsBySelectedUnit
  };
}
