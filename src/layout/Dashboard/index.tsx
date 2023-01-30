import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import TabsNavigation from 'components/TabsNavigation';

import { useCompanies } from 'hooks/useCompanies';
import useUnits from 'hooks/useUnits';
import useUsers from 'hooks/useUsers';

import * as S from './styles';

export default function Dashboard() {
  const { selectedUnit, getAllUnits } = useUnits();
  const { getAllUsers } = useUsers();
  const { selectedCompany, getAllCompanies } = useCompanies();

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

  return (
    <S.Container>
      <Header />
      <S.Content>
        <TabsNavigation />
        <Outlet />
      </S.Content>
    </S.Container>
  );
}
