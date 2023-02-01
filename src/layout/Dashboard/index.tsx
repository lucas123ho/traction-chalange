import { Alert } from 'antd';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import TabsNavigation from 'components/TabsNavigation';

import useAssets from 'hooks/useAssets';
import { useCompanies } from 'hooks/useCompanies';
import useUnits from 'hooks/useUnits';
import useUsers from 'hooks/useUsers';
import useWorkorder from 'hooks/useWorkorders';

import * as S from './styles';

export default function Dashboard() {
  const { selectedUnit, getAllUnits, error: unitEror } = useUnits();
  const {
    getAllUsers,
    getAllUsersBySelectedUnit,
    error: userError
  } = useUsers();
  const {
    selectedCompany,
    getAllCompanies,
    error: companyErro
  } = useCompanies();
  const {
    getAllAssets,
    getAllAssetsBySelectedUnit,
    error: assetError
  } = useAssets();
  const { getAllWorkorders, error: workorderError } = useWorkorder();

  useEffect(() => {
    getAllCompanies();
    getAllWorkorders();
    getAllAssets();
    getAllUsers();
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

    getAllUsersBySelectedUnit();
    getAllAssetsBySelectedUnit();
  }, [selectedUnit]);

  return (
    <S.Container>
      <Header />
      <S.Content>
        <TabsNavigation />
        <S.OutletContent>
          {!!unitEror && (
            <Alert
              description={`Erro na requisição das unidades: ${unitEror}`}
              type="error"
              style={{ marginBottom: '2rem' }}
              showIcon
              closable
            />
          )}
          {!!userError && (
            <Alert
              description={`Erro na requisição dos usuários: ${userError}`}
              type="error"
              style={{ marginBottom: '2rem' }}
              showIcon
              closable
            />
          )}
          {!!companyErro && (
            <Alert
              description={`Erro na requisição das empresas: ${companyErro}`}
              type="error"
              style={{ marginBottom: '2rem' }}
              showIcon
              closable
            />
          )}
          {!!workorderError && (
            <Alert
              description={`Erro na requisição das ordens de serviço: ${workorderError}`}
              type="error"
              style={{ marginBottom: '2rem' }}
              showIcon
              closable
            />
          )}
          {!!assetError && (
            <Alert
              description={`Erro na requisição dos ativos: ${assetError}`}
              type="error"
              style={{ marginBottom: '2rem' }}
              showIcon
              closable
            />
          )}
          <Outlet />
        </S.OutletContent>
      </S.Content>
    </S.Container>
  );
}
