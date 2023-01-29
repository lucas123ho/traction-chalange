import { useEffect } from 'react';

import Header from 'components/Header';

import useUnits from 'hooks/useUnits';
import useUsers from 'hooks/useUsers';
import { useCompanies } from 'hooks/useCompanies';

export default function Home() {
  const { selectedUnit, getAllUnits } = useUnits();
  const { getAllUsers } = useUsers();
  const { getAllCompanies, selectedCompany } = useCompanies();

  useEffect(() => {
    getAllCompanies();
  }, []);

  useEffect(() => {
    if (!selectedCompany) {
      return;
    }

    getAllUnits();
  }, [selectedCompany]);

  useEffect(() => {
    if (!selectedUnit) {
      return;
    }

    getAllUsers();
  }, [selectedUnit]);

  return <Header />;
}
