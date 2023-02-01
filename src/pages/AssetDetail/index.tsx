import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import {
  Card,
  Col,
  Divider,
  Progress,
  Row,
  Space,
  Statistic,
  Tag,
  Typography
} from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import AssetDetailList from 'components/AssetDetailList';
import AssetHealthHistoryChart from 'components/AssetHealthHistoryChart';
import Loading from 'components/Loading';
import WorkorderCard from 'components/WorkorderCard';

import {
  ASSET_COLORS_BY_STATUS,
  ASSET_LABEL_BY_STATUS
} from 'constants/assets';

import useAssets from 'hooks/useAssets';

import theme from 'styles/theme';

import { getColorByHealthscore } from 'utils/colors';

import * as S from './styles';

export default function AssetDetail() {
  const params = useParams();
  const navigation = useNavigate();
  const { assetSelected, getAssetById, loading } = useAssets();
  const assetId = params.assetId;

  useEffect(() => {
    if (!assetId) {
      return;
    }

    getAssetById(Number(assetId));
  }, [assetId]);

  if (!assetId) {
    return <Navigate to="/assets" />;
  }

  if (!assetSelected || loading) {
    return <Loading />;
  }

  return (
    <Row gutter={20}>
      <Col xs={24} sm={24} md={7} lg={7} xl={7}>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <S.AssetImage src={assetSelected.image} height={250} />
          <Space>
            <S.Name>{assetSelected.name}</S.Name>
            <Tag color={ASSET_COLORS_BY_STATUS[assetSelected.status]}>
              {ASSET_LABEL_BY_STATUS[assetSelected.status]}
            </Tag>
          </Space>
          <div>
            Saúde
            <Progress
              percent={assetSelected.healthscore}
              strokeColor={getColorByHealthscore(assetSelected.healthscore)}
            />
          </div>
          <AssetDetailList />
        </Space>
      </Col>
      <Col xs={24} sm={24} md={17} lg={17} xl={17}>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card>
              <Statistic
                groupSeparator=""
                decimalSeparator=","
                title="Total de Coletas"
                value={assetSelected.metrics.totalCollectsUptime}
                valueStyle={{ color: theme.green }}
                prefix={<CloudUploadOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card>
              <Statistic
                groupSeparator=""
                decimalSeparator=","
                title="Total de Horas de Coletas"
                value={assetSelected.metrics.totalUptime}
                precision={2}
                valueStyle={{ color: theme.green }}
                prefix={<ClockCircleOutlined />}
                suffix="h"
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card>
              <Statistic
                title="Data da Ultima Coleta"
                value={moment(assetSelected.metrics.lastUptimeAt).format(
                  'DD/mm/yyy'
                )}
                precision={2}
                valueStyle={{ color: theme.green }}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <AssetHealthHistoryChart />
            </Card>
          </Col>
        </Row>
        {!!assetSelected.workorders.length && (
          <>
            <Divider />
            <Typography.Title level={5}>Ordens de Serviço</Typography.Title>
            <Row gutter={[20, 20]}>
              {assetSelected.workorders.map((workorder) => {
                return (
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <WorkorderCard
                      onClick={() => navigation(`/workorders/${workorder.id}`)}
                      {...workorder}
                    />
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
}
