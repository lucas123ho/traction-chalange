import {
  DesktopOutlined,
  SettingOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Visão Geral',
    key: '/',
    icon: <DesktopOutlined />
  },
  {
    label: 'Ativos',
    key: '/assets',
    icon: <SettingOutlined />
  },
  {
    label: 'Ordens de Serviço',
    key: '/workorders',
    icon: <ToolOutlined />
  }
];

export default function TabsNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const current = useMemo(() => {
    const firstPath = pathname.split('/')[1];

    return `/${firstPath}`;
  }, [pathname]);

  return (
    <Menu
      mode="horizontal"
      onClick={(e) => navigate(`${e.key}`)}
      selectable
      selectedKeys={[current]}
      items={items}
    />
  );
}
