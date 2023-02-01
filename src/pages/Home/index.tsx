import { ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import moment from 'moment';
import { useMemo } from 'react';

import AssetsHealthChart from 'components/AssetsHealthChart';
import AssetsStatusChart from 'components/AssetsStatusChart';
import Loading from 'components/Loading';

import useAssets from 'hooks/useAssets';

import { Status } from 'services/asset/type';

import theme from 'styles/theme';

import { calculateAverage } from 'utils/math';

import * as S from './style';

const repairStatus: Status[] = ['inDowntime', 'plannedStop', 'unplannedStop'];

export default function Home() {
  const { loading: assetsLoading, assets } = useAssets();

  const meanTimeToRepair = useMemo(() => {
    if (!assets.length) {
      return 0;
    }

    const times: number[] = [];

    assets.forEach((asset) => {
      asset.healthHistory.forEach((item, index) => {
        const isLastItem = index === asset.healthHistory.length - 1;
        if (repairStatus.includes(item.status) && !isLastItem) {
          const reapirDate = moment(item.timestamp);
          const nextDate = moment(asset.healthHistory[index + 1].timestamp);

          const diff = nextDate.diff(reapirDate, 'days');

          times.push(diff);
        }
      });
    });

    return calculateAverage(times);
  }, [assets]);

  const meanTimeBetweenFailures = useMemo(() => {
    if (!assets.length) {
      return 0;
    }

    let times: number[] = [];

    assets.forEach((asset) => {
      const eachTime: number[] = [];
      const repairDates = asset.healthHistory
        .filter((asset) => repairStatus.includes(asset.status))
        .map((asset) => moment(asset.timestamp));

      repairDates.forEach((date, index) => {
        const isLastItem = index === repairDates.length - 1;

        if (isLastItem) {
          return;
        }

        const diff = repairDates[index + 1].diff(date, 'days');

        eachTime.push(diff);
      });

      times = [...times, ...eachTime];
    });

    console.log(times);

    return calculateAverage(times);
  }, [assets]);

  const percentOfUnplannedMaintenance = useMemo(() => {
    if (!assets.length) {
      return 0;
    }

    let allHealthHistoryStatus: Status[] = [];

    assets.forEach((asset) => {
      const statusOfHealthHistory = asset.healthHistory.map(
        (item) => item.status
      );

      allHealthHistoryStatus = [
        ...allHealthHistoryStatus,
        ...statusOfHealthHistory
      ];
    });

    const allStopStatus = allHealthHistoryStatus.filter((status) =>
      repairStatus.includes(status)
    );
    const unplannedStops = allHealthHistoryStatus.filter(
      (status) => status === 'unplannedStop'
    );

    if (!unplannedStops) {
      return 0;
    }

    return (unplannedStops.length * 100) / allStopStatus.length;
  }, [assets]);

  return (
    <S.Container>
      <Row wrap gutter={[20, 20]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card>
            <Statistic
              title="Tempo Médio de Reparação (MTTR)"
              value={meanTimeToRepair}
              valueStyle={{ color: theme.green }}
              prefix={<ClockCircleOutlined />}
              suffix="Dias"
              loading={assetsLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card>
            <Statistic
              title="Tempo Médio Entre Danos (MTBF)"
              value={meanTimeBetweenFailures}
              valueStyle={{ color: theme.green }}
              prefix={<ClockCircleOutlined />}
              suffix="Dias"
              loading={assetsLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card>
            <Statistic
              title="Manutenção Não Planejada"
              value={percentOfUnplannedMaintenance}
              precision={2}
              valueStyle={{ color: theme.orange }}
              prefix={<WarningOutlined />}
              suffix="%"
              loading={assetsLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card>{assetsLoading ? <Loading /> : <AssetsStatusChart />}</Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card>{assetsLoading ? <Loading /> : <AssetsHealthChart />}</Card>
        </Col>
      </Row>
    </S.Container>
  );
}
