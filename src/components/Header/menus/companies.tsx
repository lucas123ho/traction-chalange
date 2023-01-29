import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';
import { useMemo } from 'react';

import { useCompanies } from 'hooks/useCompanies';

import * as S from '../styles';

export default function CompaniesMenu() {
  const {
    companies,
    loading: loadingCompanies,
    handleChangeSelectedCompany,
    selectedCompany
  } = useCompanies();

  const companiesMenu = useMemo((): MenuProps['items'] => {
    return companies.map((company) => ({
      label: company.name,
      key: String(company.id),
      onClick: () => handleChangeSelectedCompany(company)
    }));
  }, [companies, handleChangeSelectedCompany]);

  return (
    <Dropdown
      disabled={loadingCompanies}
      menu={{
        items: companiesMenu,
        selectable: true,
        selectedKeys: [String(selectedCompany?.id)]
      }}
      trigger={['click']}
    >
      <S.DropdownButton title="Mudar empresa">
        <S.DropdownButtonTitle>Empresa</S.DropdownButtonTitle>
        <Space>
          {loadingCompanies ? 'Carregando empresas...' : selectedCompany?.name}
          {loadingCompanies ? <LoadingOutlined /> : <DownOutlined />}
        </Space>
      </S.DropdownButton>
    </Dropdown>
  );
}
