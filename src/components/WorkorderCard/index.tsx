import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Card, Space, Tag } from 'antd';
import { useMemo } from 'react';

import { WORKORDER_PRIORITY_COLOR } from 'constants/workorders';

import { Workorder } from 'services/workorder/type';

import theme from 'styles/theme';

interface Props extends Workorder {
  onClick: () => void;
}

export default function WorkorderCard({
  onClick,
  status,
  priority,
  title,
  description,
  checklist
}: Props) {
  const completedTasks = useMemo(() => {
    return checklist.filter((task) => task.completed);
  }, [checklist]);

  return (
    <Card hoverable onClick={onClick}>
      <Card.Meta
        avatar={
          <Space direction="vertical">
            {status === 'completed' ? (
              <CheckCircleOutlined
                style={{
                  fontSize: '2.4rem',
                  color: theme.green
                }}
              />
            ) : (
              <MinusCircleOutlined
                style={{
                  fontSize: '2.4rem',
                  color: theme.orange
                }}
              />
            )}
            <Tag color={WORKORDER_PRIORITY_COLOR[priority]}>{priority}</Tag>
          </Space>
        }
        title={`${title} (${completedTasks.length}/${checklist.length})`}
        description={description}
      />
    </Card>
  );
}
