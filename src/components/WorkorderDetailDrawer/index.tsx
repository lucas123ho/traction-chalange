import {
  Avatar,
  Checkbox,
  Divider,
  Drawer,
  Space,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import AssetCard from 'components/AssetCard';
import CustomAvatar from 'components/CustomAvatar';

import {
  WORKORDER_PRIORITY_COLOR,
  WORKORDER_STATUS_COLOR,
  WORKORDER_STATUS_LABEL
} from 'constants/workorders';

import useUsers from 'hooks/useUsers';

import {
  WorkorderPriority,
  WorkorderStatus,
  WorkorderWithUsersAndAssets
} from 'services/workorder/type';

interface Props {
  workorder: WorkorderWithUsersAndAssets | null;
  removeSelectedWorkorder: () => void;
}

export default function WorkorderDetailDrawer({
  workorder,
  removeSelectedWorkorder
}: Props) {
  const navigate = useNavigate();
  const { selectedUser } = useUsers();
  const myResponsible = useMemo(() => {
    if (!selectedUser) {
      return false;
    }

    return workorder?.assignedUserIds.includes(selectedUser.id);
  }, [workorder]);

  return (
    <Drawer
      title="Ordem de Serviço"
      placement="right"
      onClose={() => removeSelectedWorkorder()}
      open={!!workorder}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space align="center">
          <Typography.Title style={{ margin: 0 }} level={2}>
            {workorder?.title}
          </Typography.Title>
          <Avatar.Group>
            {workorder?.assignedUsers.map((user) => (
              <Tooltip title={`${user.name} - ${user.email}`}>
                <CustomAvatar name={user.name} />
              </Tooltip>
            ))}
          </Avatar.Group>
        </Space>
        <div>
          <Tag
            color={WORKORDER_STATUS_COLOR[workorder?.status as WorkorderStatus]}
          >
            {WORKORDER_STATUS_LABEL[workorder?.status as WorkorderStatus]}
          </Tag>
          <Tag
            color={
              WORKORDER_PRIORITY_COLOR[workorder?.priority as WorkorderPriority]
            }
          >
            {workorder?.priority}
          </Tag>
          {myResponsible && <Tag>Sua responsabilidade</Tag>}
        </div>
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          {workorder?.description}
        </Typography.Paragraph>
      </Space>
      <Divider />
      <Typography.Title level={4}>Checklist</Typography.Title>
      <Space style={{ width: '100%' }} direction="vertical">
        {workorder?.checklist.map((item) => (
          <Checkbox
            disabled={!myResponsible}
            defaultChecked={item.completed}
          >
            {item.task}
          </Checkbox>
        ))}
      </Space>
      <Space
        style={{ marginTop: '2.4rem', width: '100%' }}
        direction="vertical"
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Ativo
        </Typography.Title>
        {workorder?.asset && (
          <AssetCard
            onClick={() => navigate(`/assets/${workorder.asset.id}`)}
            {...workorder.asset}
          />
        )}
      </Space>
    </Drawer>
  );
}
