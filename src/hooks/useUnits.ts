import { useCallback, useMemo } from 'react';

import UnitService from 'services/unit';
import { Unit } from 'services/unit/type';

import {
  resetError,
  setError,
  setLoading,
  setSelectedUnit,
  setUnits
} from 'store/slices/unit';
import { UnitState } from 'store/slices/unit/type';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useCompanies } from './useCompanies';

interface UseUnitsResponse extends UnitState {
  unitsWithoutSelected: Unit[];
  getAllUnits: () => void;
  handleChangeSelectedUnit: (unit: Unit) => void;
}

const unitService = new UnitService();

export default function useUnits(): UseUnitsResponse {
  const { units, selectedUnit, error, loading } = useAppSelector(
    (state) => state.unit
  );
  const { selectedCompany } = useCompanies();
  const dispatch = useAppDispatch();

  const unitsWithoutSelected = useMemo(() => {
    if (!units) {
      return [];
    }

    return units.filter((unit) => unit.id !== selectedUnit?.id);
  }, [units, selectedUnit]);

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

  const getAllUnits = useCallback(async () => {
    if (!selectedCompany) {
      return;
    }

    const units = await call(() => {
      return unitService.getAllUnitsByCompanyId(selectedCompany.id);
    });

    if (!units) {
      return;
    }

    dispatch(setUnits(units));
  }, [unitService, selectedCompany]);

  const handleChangeSelectedUnit = useCallback(
    (unit: Unit) => {
      dispatch(setSelectedUnit(unit));
    },
    [dispatch]
  );

  return {
    units,
    selectedUnit,
    error,
    loading,
    getAllUnits,
    handleChangeSelectedUnit,
    unitsWithoutSelected
  };
}
