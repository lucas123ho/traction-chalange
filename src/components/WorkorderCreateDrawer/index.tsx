import {
  CheckSquareOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Select,
  Typography
} from 'antd';

import {
  WORKORDER_PRIORITIES,
  WORKORDER_PRIORITY_LABEL
} from 'constants/workorders';

import useAssets from 'hooks/useAssets';
import useUsers from 'hooks/useUsers';

import { WorkorderPriority } from 'services/workorder/type';

interface FormFields {
  asset: number;
  assignedUsers: number[];
  description: string;
  priority: WorkorderPriority;
  tasks: string[];
  title: string;
}

interface Props extends DrawerProps {
  onClose: () => void;
  onSuccess: (values:FormFields ) => void;
}

function getFirstName(name: string): string {
  return name.split(' ')[0];
}

export default function WorkorderCreateDrawer({
  open,
  onClose,
  onSuccess
}: Props) {
  const [form] = Form.useForm();
  const { allUsers } = useUsers();
  const { allAssets } = useAssets();

  const onFinish = (values: FormFields) => {
    onReset();
    onClose();
    onSuccess(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Drawer
      title="Criar Order de Serviço"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <Form layout="vertical" form={form} name="workorder" onFinish={onFinish}>
        <Form.Item
          rules={[{ required: true, message: 'Adicione um título' }]}
          label="Título"
          name="title"
        >
          <Input
            size="large"
            style={{ fontWeight: 600 }}
            placeholder="Manutenção no motor..."
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Adicione uma descrição' }]}
          label="Descrição"
          name="description"
        >
          <Input.TextArea
            placeholder="No geral o que vai precisar ser feito"
            autoSize={{ minRows: 3, maxRows: 5 }}
            size="large"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Adicione responsáveis' }]}
          label="Responsáveis"
          name="assignedUsers"
        >
          <Select
            mode="multiple"
            showArrow
            size="large"
            defaultValue={[]}
            placeholder="Quais serão os responsáveis?"
            options={allUsers.map((user) => ({
              label: `${getFirstName(user.name)} - ${user.email}`,
              value: user.id
            }))}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Adicione uma prioridade' }]}
          label="Prioridade"
          name="priority"
        >
          <Select
            showArrow
            size="large"
            defaultValue={[]}
            placeholder="Quais a prioridade?"
            options={WORKORDER_PRIORITIES.map((priority) => ({
              label: `${WORKORDER_PRIORITY_LABEL[priority]} (${priority})`,
              value: priority
            }))}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Selecione um ativo' }]}
          label="Ativo"
          name="asset"
        >
          <Select
            showArrow
            size="large"
            defaultValue={[]}
            placeholder="Qual ativo será reparado?"
            options={allAssets.map((asset) => ({
              label: `${asset.name} (${asset.sensors[0]})`,
              value: asset.id
            }))}
          />
        </Form.Item>
        <Typography.Title level={4}>Checklist</Typography.Title>
        <Typography.Paragraph>
          Tente separar em tarefas o que será feito.
        </Typography.Paragraph>
        <Form.List
          rules={[
            {
              validator: async (_, tasks) => {
                if (!tasks || tasks.length < 1) {
                  return Promise.reject(new Error('Adicione ao menos uma tarefa'));
                }
              }
            }
          ]}
          name="tasks"
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Form.Item key={field.key}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.8rem'
                    }}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Descreva a tarefa ou apague este campo'
                        }
                      ]}
                      noStyle
                    >
                      <Input
                        autoFocus
                        prefix={<CheckSquareOutlined />}
                        placeholder="Descreva a tarefa"
                        onKeyDown={(e) => {
                          if (e.code === 'Enter') {
                            add();
                          }
                        }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </div>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Adicionar tarefa
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Divider />
        <Form.Item>
          <Button
            size="large"
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
          >
            Adicionar Ordem de Serviço
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
