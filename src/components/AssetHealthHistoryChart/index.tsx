import Highcharts from 'highcharts';
import moment from 'moment';
import 'moment/locale/pt-br';
import { memo, useEffect } from 'react';

import Loading from 'components/Loading';

import {
  ASSET_COLORS_BY_STATUS,
  ASSET_LABEL_BY_STATUS,
  ASSET_STATUS,
  ASSET_STATUS_NUMBER
} from 'constants/assets';

import useAssets from 'hooks/useAssets';

import theme from 'styles/theme';

moment.locale('pt-br');

const id = 'assetHealthHistoryChartContainer';
const balancingNumber = 0.65;

function AssetHealthHistoryChart() {
  const { assetSelected } = useAssets();

  useEffect(() => {
    if (!assetSelected) {
      return;
    }

    Highcharts.chart({
      chart: {
        type: 'spline',
        renderTo: id
      },
      title: {
        text: 'Histórico de Saúde do Ativo'
      },
      subtitle: {
        text: assetSelected.name,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      legend: {
        enabled: false
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          enabled: false
        },
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        plotBands: ASSET_STATUS.map((status, index) => ({
          from: index,
          to: index + 1,
          color: ASSET_COLORS_BY_STATUS[status] + 50,
          borderWidth: 10,
          borderColor: '#fff',
          label: {
            text: ASSET_LABEL_BY_STATUS[status],
            style: {
              color: theme.text
            },
          }
        }))
      },
      tooltip: {
        formatter: function () {
          const { x, y } = this;

          if (!x || !y) {
            return '';
          }

          const statusNumber = Math.ceil(y - balancingNumber);
          const statusLabel = ASSET_STATUS[statusNumber];

          const date = moment(x).format('LL');

          return `<b>${ASSET_LABEL_BY_STATUS[statusLabel]}</b>
                  <br /> ${date}
          `;
        }
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          color: theme.primary,
          states: {
            hover: {
              lineWidth: 5
            }
          },
          marker: {
            enabled: true
          }
        }
      },
      series: [
        {
          name: 'Status',
          type: 'spline',
          data: assetSelected.healthHistory.map((data) => {
            const dateAsMoment = moment(data.timestamp);

            const day = dateAsMoment.date();
            const month = dateAsMoment.month();
            const year = dateAsMoment.year();

            return [
              Date.UTC(year, month, day),
              ASSET_STATUS_NUMBER[data.status] + balancingNumber
            ];
          })
        }
      ],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    });
  }, [assetSelected]);

  if (!assetSelected) {
    return <Loading />;
  }

  return <div id={id}></div>;
}

export default memo(AssetHealthHistoryChart);
