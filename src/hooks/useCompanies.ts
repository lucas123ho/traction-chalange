import { useCallback } from 'react';

import CompanyService from 'services/company';
import { Company } from 'services/company/type';

import {
  resetError,
  setCompanies,
  setError,
  setLoading,
  setSelectedCompany
} from 'store/slices/company';
import { CompanyState } from 'store/slices/company/type';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export interface UseCompaniesResponse extends CompanyState {
  getAllCompanies: () => void;
  handleChangeSelectedCompany: (company: Company) => void;
}

const companyService = new CompanyService();

export function useCompanies(): UseCompaniesResponse {
  const { companies, selectedCompany, error, loading } = useAppSelector(
    (state) => state.company
  );
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

  const getAllCompanies = useCallback(async () => {
    const companies = await call(() => {
      return companyService.getAllCompanies();
    });

    if (!companies) {
      return;
    }

    dispatch(setCompanies(companies));
  }, [dispatch]);

  const handleChangeSelectedCompany = useCallback(
    (company: Company) => {
      dispatch(setSelectedCompany(company));
    },
    [dispatch]
  );

  return {
    companies,
    selectedCompany,
    error,
    loading,
    getAllCompanies,
    handleChangeSelectedCompany
  };
}
