import { Link } from 'react-router-dom';

import Logo from 'components/Logo';

import * as S from './styles';
import CompaniesMenu from './menus/companies';
import UnitsMenu from './menus/units';
import UsersMenu from './menus/users';

export default function Header() {
  return (
    <S.Container>
      <S.LogoContainer>
        <Link to="/">
          <Logo />
        </Link>
      </S.LogoContainer>
      <S.Flex>
        <CompaniesMenu />
        <UnitsMenu />
        <UsersMenu />
      </S.Flex>
    </S.Container>
  );
}



