import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Company } from 'services/company/type';

import { requestStatusReducer } from '../request';
import { CompanyState } from './type';

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null,
  error: null,
  loading: true
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setSelectedCompany: (
      state: CompanyState,
      action: PayloadAction<Company>
    ) => {
      state.selectedCompany = action.payload;
    },
    setCompanies: (state: CompanyState, action: PayloadAction<Company[]>) => {
      if (!action.payload.length) {
        state = initialState;
      }

      state.companies = action.payload;

      const selectedCompanyFromPayload = action.payload.find(
        (company) => company.id === state.selectedCompany?.id
      );

      state.selectedCompany = selectedCompanyFromPayload ?? action.payload[0];
    },
    ...requestStatusReducer
  }
});

export const {
  setSelectedCompany,
  resetError,
  setCompanies,
  setError,
  setLoading
} = companySlice.actions;

export default companySlice.reducer;
