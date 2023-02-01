import {
  AimOutlined,
  DeploymentUnitOutlined,
  FireOutlined,
  HomeOutlined,
  SyncOutlined,
  TeamOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { Avatar, List, Tag, Tooltip } from 'antd';
import { useMemo } from 'react';

import CustomAvatar from 'components/CustomAvatar';

import useAssets from 'hooks/useAssets';
import useUnits from 'hooks/useUnits';

import theme from 'styles/theme';

import * as S from './styles';

export default function AssetDetailList() {
  const { assetSelected } = useAssets();
  const { selectedUnit } = useUnits();
  
  const detailItem = useMemo(() => {
    if (!assetSelected) {
      return [];
    }

    const items = [
      {
        title: 'Unidade',
        value: selectedUnit?.name,
        icon: (
          <HomeOutlined style={{ color: theme.primary, fontSize: '1.8rem' }} />
        )
      },
      {
        title: 'Sensor(es)',
        value: assetSelected.sensors.map((sensor, index) => {
          const isLastItem = index === assetSelected.sensors.length - 1;
          return (
            <Tag key={sensor} style={{ marginInlineEnd: isLastItem ? 0 : '0.8rem' }}>
              {sensor}
            </Tag>
          );
        }),
        icon: (
          <AimOutlined style={{ color: theme.primary, fontSize: '1.8rem' }} />
        )
      },
      {
        title: 'Modelo',
        value: assetSelected.model.toUpperCase(),
        icon: (
          <DeploymentUnitOutlined
            style={{ color: theme.primary, fontSize: '1.8rem' }}
          />
        )
      },
      {
        title: 'Responsáveis',
        value: (
          <Avatar.Group maxCount={3}>
            {assetSelected.assignedUsers?.map((user) => (
              <Tooltip key={user.email} title={user.name}>
                <CustomAvatar name={user.name} />
              </Tooltip>
            ))}
          </Avatar.Group>
        ),
        icon: (
          <TeamOutlined style={{ color: theme.primary, fontSize: '1.8rem' }} />
        )
      }
    ];

    if (assetSelected.specifications.maxTemp) {
      items.push({
        title: 'Temperatura Limite',
        value: `${assetSelected.specifications.maxTemp} °C`,
        icon: (
          <FireOutlined style={{ color: theme.primary, fontSize: '1.8rem' }} />
        )
      });
    }

    if (assetSelected.specifications.power) {
      items.push({
        title: 'Potência',
        value: `${assetSelected.specifications.power} kWh`,
        icon: (
          <ThunderboltOutlined
            style={{ color: theme.primary, fontSize: '1.8rem' }}
          />
        )
      });
    }

    if (assetSelected.specifications.rpm) {
      items.push({
        title: 'RPM',
        value: `${assetSelected.specifications.rpm}`,
        icon: (
          <SyncOutlined style={{ color: theme.primary, fontSize: '1.8rem' }} />
        )
      });
    }

    return items;
  }, [assetSelected]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={detailItem}
      renderItem={(item) => (
        <List.Item style={{ padding: '1.2rem 0' }}>
          <List.Item.Meta
            title={
              <S.DetailTitle>
                {item.icon} {item.title}
              </S.DetailTitle>
            }
          />
          <div>{item.value}</div>
        </List.Item>
      )}
    />
  );
}
