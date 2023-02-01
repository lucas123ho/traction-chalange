import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from 'components/Logo';

import theme from 'styles/theme';

import CompaniesMenu from './menus/companies';
import UnitsMenu from './menus/units';
import UsersMenu from './menus/users';
import * as S from './styles';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <S.Container>
        <S.LogoContainer>
          <Link to="/">
            <Logo />
          </Link>
        </S.LogoContainer>
        <S.Flex className="hidden-sm">
          <CompaniesMenu />
          <UnitsMenu />
          <UsersMenu />
        </S.Flex>
        <Button className='visible-sm' onClick={() => setMobileMenuOpen(true)} type="ghost">
          <MenuOutlined style={{ color: theme.white, fontSize: '1.8rem' }} />
        </Button>
      </S.Container>
      <Drawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        style={{ backgroundColor: theme.primary }}
      >
        <Space direction="vertical" size='large'>
          <CompaniesMenu />
          <UnitsMenu />
          <UsersMenu />
        </Space>
      </Drawer>
    </>
  );
}
