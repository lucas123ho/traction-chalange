import { WorkorderPriority, WorkorderStatus } from 'services/workorder/type';

import theme from 'styles/theme';

export const WORKORDER_PRIORITY_COLOR: Record<WorkorderPriority, string> = {
  high: 'red',
  medium: 'gold',
  low: 'default'
};

export const WORKORDER_PRIORITY_LABEL: Record<WorkorderPriority, string> = {
  high: 'Alta Prioridade',
  medium: 'Média Prioridade',
  low: 'Baixa Prioridade'
};

export const WORKORDER_STATUS_LABEL: Record<WorkorderStatus, string> = {
  'in progress': 'Em progresso',
  completed: 'Finalizado'
};

export const WORKORDER_STATUS_COLOR: Record<WorkorderStatus, string> = {
  'in progress': theme.orange,
  completed: theme.green
};

export const WORKORDER_PRIORITIES: WorkorderPriority[] = [
  'high',
  'medium',
  'low'
];
