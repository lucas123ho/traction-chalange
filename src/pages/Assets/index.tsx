import { Col, Empty, Row, Select, Space, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AssetCard from 'components/AssetCard';

import {
  ASSET_COLORS_BY_STATUS,
  ASSET_LABEL_BY_STATUS
} from 'constants/assets';

import useAssets from 'hooks/useAssets';
import useDebounce from 'hooks/useDebounce';

import { Status } from 'services/asset/type';

const statusOptions = Object.keys(ASSET_LABEL_BY_STATUS).map((key) => ({
  label: ASSET_LABEL_BY_STATUS[key as Status],
  value: key
}));

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={ASSET_COLORS_BY_STATUS[value as Status]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export default function Assets() {
  const {
    filter: storedFilter,
    filteredAssets,
    getFilteredAssets,
    loading: loadingAssets
  } = useAssets();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Status[]>(storedFilter.status);
  const debouncedFilter = useDebounce(filter, 1000);

  useEffect(() => {
    getFilteredAssets({ status: debouncedFilter });
  }, [debouncedFilter]);

  return (
    <>
      <Space>
        Filtro:
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          defaultValue={[]}
          value={filter}
          onChange={(value) => setFilter(value)}
          placeholder="Filtrar por status"
          style={{ minWidth: '20rem' }}
          options={statusOptions}
        />
      </Space>
      {filteredAssets.length || loadingAssets ? (
        <Row style={{ marginTop: '2rem' }} gutter={[20, 20]}>
          {loadingAssets ? (
            <>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <AssetCard.Loading />
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <AssetCard.Loading />
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <AssetCard.Loading />
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <AssetCard.Loading />
              </Col>
            </>
          ) : (
            filteredAssets.map((asset) => (
              <Col key={asset.id} xs={24} sm={24} md={6} lg={6} xl={6}>
                <AssetCard
                  onClick={() => navigate(`/assets/${asset.id}`)}
                  {...asset}
                />
              </Col>
            ))
          )}
        </Row>
      ) : (
        <Empty description="Nenhum ativo encontrado" />
      )}
    </>
  );
}
