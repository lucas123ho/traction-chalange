import { Status } from 'services/asset/type';

import theme from 'styles/theme';

export const ASSET_COLORS_BY_STATUS: Record<Status, string> = {
  inAlert: theme.red,
  inDowntime: theme.orange,
  inOperation: theme.green,
  plannedStop: theme.highlight,
  unplannedStop: theme.ligthGray
};

export const ASSET_LABEL_BY_STATUS: Record<Status, string> = {
  inAlert: 'Em Alerta',
  inDowntime: 'Em Parada',
  inOperation: 'Em Operação',
  plannedStop: 'Parada Planejada',
  unplannedStop: 'Parada Não Planejada'
};

export const ASSET_STATUS_NUMBER: Record<Status, number> = {
  plannedStop: 0,
  inOperation: 1,
  unplannedStop: 2,
  inDowntime: 3,
  inAlert: 4
};

export const ASSET_STATUS: Status[] = [
  'plannedStop',
  'inOperation',
  'unplannedStop',
  'inDowntime',
  'inAlert'
];
