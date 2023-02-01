import Highcharts, { PointOptionsObject } from 'highcharts';
import { useEffect, useMemo } from 'react';

import {
  ASSET_COLORS_BY_STATUS,
  ASSET_LABEL_BY_STATUS
} from 'constants/assets';

import useAssets from 'hooks/useAssets';
import useUnits from 'hooks/useUnits';

import { Asset, Status } from 'services/asset/type';

const chartId = 'assetsStatusChartContainer';

export default function AssetsStatusChart() {
  const { assets } = useAssets();
  const { selectedUnit } = useUnits();

  const assetsStatusChartData = useMemo(() => {
    const data: Array<PointOptionsObject> = [];
    const assetsTotal = assets.length;

    const assetsByStatus: Record<Status, Array<Asset>> = {
      inAlert: [],
      inDowntime: [],
      inOperation: [],
      plannedStop: [],
      unplannedStop: []
    };

    assets.forEach((currentAsset) => {
      assetsByStatus[currentAsset.status].push(currentAsset);
    });

    for (const status in assetsByStatus) {
      const typedStatus = status as Status;
      const currentTotal = assetsByStatus[typedStatus].length;

      const percent = (currentTotal * 100) / assetsTotal;

      data.push({
        name: `${ASSET_LABEL_BY_STATUS[typedStatus]} (${currentTotal})`,
        y: percent,
        color: ASSET_COLORS_BY_STATUS[typedStatus],
        description: `${assetsByStatus[typedStatus]
          .map((asset) => asset.name)
          .join(', ')}`
      });
    }

    return data;
  }, [assets]);

  useEffect(() => {
    Highcharts.chart({
      chart: {
        renderTo: chartId,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Status dos Ativos'
      },
      subtitle: {
        text: `Todos os ativos da unidade <b>${selectedUnit?.name}</b>`
      },
      tooltip: {
        pointFormat:
          '<b>{point.percentage:.1f}%</b><br/><br />' +
          '{point.description:.1f}'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      series: [
        {
          name: 'Ativo',
          colorByPoint: true,
          type: 'pie',
          data: assetsStatusChartData
        }
      ]
    });
  }, [assets]);

  return <div id={chartId}></div>;
}
