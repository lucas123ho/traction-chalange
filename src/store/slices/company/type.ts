import { Company } from 'services/company/type';

import { StateWithRequestStatus } from '../type';

export interface CompanyState extends StateWithRequestStatus {
  companies: Company[];
  selectedCompany: Company | null;
}
