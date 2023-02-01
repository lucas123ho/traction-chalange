import { DownOutlined } from '@ant-design/icons';
import CustomAvatar from 'components/CustomAvatar';

import * as S from './styles';

interface Props {
  name: string;
  email?: string;
  dropdown?: boolean;
  dark?: boolean;
}

export default function Person({ name, email, dropdown, dark = false }: Props) {
  return (
    <S.Container role="button" dark={dark}>
      <CustomAvatar name={name} />
      <div>
        <S.Name>{name}</S.Name>
        {!!email && <S.Email>{email}</S.Email>}
      </div>
      {dropdown && <DownOutlined />}
    </S.Container>
  );
}
