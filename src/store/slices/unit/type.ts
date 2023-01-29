import { Unit } from 'services/unit/type';

import { StateWithRequestStatus } from '../type';

export interface UnitState extends StateWithRequestStatus {
  units: Unit[];
  selectedUnit: Unit | null;
}
