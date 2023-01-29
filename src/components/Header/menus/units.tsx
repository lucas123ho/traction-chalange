import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';
import { useMemo } from 'react';

import useUnits from 'hooks/useUnits';

import * as S from '../styles';

export default function UnitsMenu() {
  const {
    selectedUnit,
    loading: loadingUnits,
    handleChangeSelectedUnit,
    units
  } = useUnits();

  const unitsMenu = useMemo((): MenuProps['items'] => {
    return units.map((unit) => ({
      label: unit.name,
      key: String(unit.id),
      onClick: () => handleChangeSelectedUnit(unit)
    }));
  }, [units, handleChangeSelectedUnit]);

  return (
    <Dropdown
      disabled={loadingUnits}
      menu={{
        items: unitsMenu,
        selectable: true,
        selectedKeys: [String(selectedUnit?.id)]
      }}
      trigger={['click']}
    >
      <S.DropdownButton title="Mudar unidade">
        <S.DropdownButtonTitle>Unidade</S.DropdownButtonTitle>
        <Space>
          {loadingUnits ? 'Carregando unidades...' : selectedUnit?.name}
          {loadingUnits ? <LoadingOutlined /> : <DownOutlined />}
        </Space>
      </S.DropdownButton>
    </Dropdown>
  );
}
