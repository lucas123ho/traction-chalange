import {
  CarryOutOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  FloatButton,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Tag,
  notification
} from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import WorkorderCard from 'components/WorkorderCard';
import WorkorderCreateDrawer from 'components/WorkorderCreateDrawer';
import WorkorderDetailDrawer from 'components/WorkorderDetailDrawer';

import {
  WORKORDER_STATUS_COLOR,
  WORKORDER_STATUS_LABEL
} from 'constants/workorders';

import useDebounce from 'hooks/useDebounce';
import useWorkorder from 'hooks/useWorkorders';

import { ChecklistItem, WorkorderStatus } from 'services/workorder/type';

import theme from 'styles/theme';

const statusOptions = Object.keys(WORKORDER_STATUS_LABEL).map((key) => ({
  label: WORKORDER_STATUS_LABEL[key as WorkorderStatus],
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
      color={WORKORDER_STATUS_COLOR[value as WorkorderStatus]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export default function Workorders() {
  const [api, contextHolder] = notification.useNotification();
  const {
    filteredWorkorders,
    workorders,
    loading,
    getFilteredWorkorders,
    workorderSelected,
    getWorkorderById,
    removeSelectedWorkorder,
    createNewWorkorder
  } = useWorkorder();
  const params = useParams();
  const workorderId = params.workorderId;

  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const [filter, setFilter] = useState<WorkorderStatus[]>([]);
  const debouncedFilter = useDebounce(filter, 1000);

  const completedWorkorders = useMemo(() => {
    return workorders.filter((workorder) => workorder.status === 'completed');
  }, [workorders]);

  const uncompletedTasks = useMemo(() => {
    const tasks: ChecklistItem[] = [];

    workorders.forEach((workorder) => {
      workorder.checklist.forEach((task) => {
        if (!task.completed) {
          tasks.push(task);
        }
      });
    });

    return tasks;
  }, [workorders]);

  const handleGetWorkorder = useCallback((id: number) => {
    getWorkorderById(id);
  }, []);

  useEffect(() => {
    getFilteredWorkorders({ status: debouncedFilter });
  }, [debouncedFilter]);

  useEffect(() => {
    if (!workorderId) {
      return;
    }

    handleGetWorkorder(Number(workorderId));
  }, [workorderId, handleGetWorkorder]);

  return (
    <>
      <Row gutter={[20, 20]} align="top">
        <Col xs={24} sm={24} md={5} lg={5} xl={5}>
          <Space style={{ width: '100%' }} direction="vertical">
            <Card>
              <Statistic
                title="Em progresso"
                value={workorders.length - completedWorkorders.length}
                valueStyle={{ color: theme.orange }}
                prefix={<MinusCircleOutlined />}
              />
            </Card>
            <Card>
              <Statistic
                title="Concluídos"
                value={completedWorkorders.length}
                valueStyle={{ color: theme.green }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
            <Card>
              <Statistic
                title="Tarefas à fazer"
                value={uncompletedTasks.length}
                valueStyle={{ color: theme.orange }}
                prefix={<CarryOutOutlined />}
              />
            </Card>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={19} lg={19} xl={19}>
          <Row justify="space-between">
            <Col>
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
            </Col>
            <Col className="hidden-sm">
              <Button
                type="primary"
                onClick={() => setOpenCreateDrawer(true)}
                icon={<PlusOutlined />}
              >
                Adicionar Order de Serviço
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: '2rem' }} gutter={[20, 20]}>
            {loading ? (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Skeleton />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Skeleton />
                </Col>
              </>
            ) : (
              filteredWorkorders.map((workorder) => (
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <WorkorderCard
                    onClick={() => handleGetWorkorder(workorder.id)}
                    {...workorder}
                  />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
      <FloatButton
        className="visible-sm"
        shape="circle"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpenCreateDrawer(true)}
      />
      <WorkorderDetailDrawer
        workorder={workorderSelected}
        removeSelectedWorkorder={removeSelectedWorkorder}
      />
      <WorkorderCreateDrawer
        open={openCreateDrawer}
        onClose={() => setOpenCreateDrawer(false)}
        onSuccess={(values) => {
          api.success({ message: 'Ordem de Serviço adicionada com sucesso!' });
          createNewWorkorder({
            assetId: values.asset,
            assignedUserIds: values.assignedUsers,
            checklist: values.tasks.map((task) => ({ task, completed: false })),
            description: values.description,
            priority: values.priority,
            status: 'in progress',
            title: values.title
          });
        }}
      />
      {contextHolder}
    </>
  );
}
