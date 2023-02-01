import Highcharts from 'highcharts';
import { useEffect } from 'react';

import useAssets from 'hooks/useAssets';
import useUnits from 'hooks/useUnits';

import { getColorByHealthscore } from 'utils/colors';

const chartId = 'assetsHealthChartContainer';

export default function AssetsHealthChart() {
  const { assets } = useAssets();
  const { selectedUnit } = useUnits();

  useEffect(() => {
    Highcharts.chart({
      chart: {
        type: 'bar',
        renderTo: chartId
      },
      title: {
        text: 'Saúde dos Ativos'
      },
      subtitle: {
        text: `Todos os ativos da unidade <b>${selectedUnit?.name}</b>`
      },
      xAxis: {
        categories: assets.map((asset) => asset.name),
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Saúde (%)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' %'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          },
          showInLegend: false
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Saúde',
          type: 'bar',
          data: assets.map((asset) => {
            return {
              y: asset.healthscore,
              color: getColorByHealthscore(asset.healthscore)
            };
          })
        }
      ]
    });
  }, [assets]);

  return <div id={chartId}></div>;
}
