import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import * as S from './styles';

interface Props {
  spinSize?: number;
  text?: string;
}

export default function Loading({ spinSize = 24, text = "Carregando..." }: Props) {
  return (
    <S.Container>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: spinSize }} spin />}
      />
      {text}
    </S.Container>
  );
}
