import { DownOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

import { getFirstLetters } from 'utils/formatter';

import * as S from './styles';

interface Props {
  name: string;
  email?: string;
  dropdown?: boolean;
  dark?: boolean;
}

export default function Person({ name, email, dropdown, dark = false }: Props) {
  const firstLetters = useMemo(() => {
    const firstLettersAsArray = getFirstLetters(name);
    const firstLettersUpperCase = firstLettersAsArray.map((letter) =>
      letter.toUpperCase()
    );

    return firstLettersUpperCase.slice(0, 2).join('');
  }, [name]);

  return (
    <S.Container role="button" dark={dark}>
      <S.Avatar>{firstLetters}</S.Avatar>
      <div>
        <S.Name>{name}</S.Name>
        {!!email && <S.Email>{email}</S.Email>}
      </div>
      {dropdown && <DownOutlined />}
    </S.Container>
  );
}
