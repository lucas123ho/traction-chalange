import { Card, Progress, Skeleton, Space, Tag } from 'antd';

import {
  ASSET_COLORS_BY_STATUS,
  ASSET_LABEL_BY_STATUS
} from 'constants/assets';

import { Asset } from 'services/asset/type';

import { getColorByHealthscore } from 'utils/colors';

import * as S from './styles';

interface Props
  extends Pick<Asset, 'name' | 'model' | 'status' | 'healthscore' | 'image'> {
  onClick: () => void;
}

function AssetCard({
  name,
  model,
  status,
  healthscore,
  image,
  onClick
}: Props) {
  return (
    <Card
      style={{ height: '100%' }}
      onClick={onClick}
      hoverable
      cover={<S.CoverImage src={image} alt={name} />}
    >
      <S.ModelContainer>
        <Tag style={{ fontSize: '1rem' }} color="blue-inverse">
          {model}
        </Tag>
      </S.ModelContainer>
      <S.Container>
        <S.TextContainer>
          <S.Name>{name}</S.Name>
          <Space size={[0, 8]} wrap>
            <Tag
              style={{ fontSize: '1rem' }}
              color={ASSET_COLORS_BY_STATUS[status]}
            >
              {ASSET_LABEL_BY_STATUS[status]}
            </Tag>
          </Space>
        </S.TextContainer>
        <Progress
          type="circle"
          percent={healthscore}
          width={50}
          strokeColor={getColorByHealthscore(healthscore)}
        />
      </S.Container>
    </Card>
  );
}

function Loading() {
  return (
    <Card>
      <Skeleton loading active />
    </Card>
  );
}

AssetCard.Loading = Loading;

export default AssetCard;


