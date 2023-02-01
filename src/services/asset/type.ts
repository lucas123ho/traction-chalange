import { User } from "services/user/type";
import { Workorder } from "services/workorder/type";

export type Status =
  | 'inOperation'
  | 'inDowntime'
  | 'inAlert'
  | 'plannedStop'
  | 'unplannedStop';

export type Health = {
  status: Status;
  timestamp: string;
};

export type Metrics = {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
};

export type Model = 'motor' | 'fan';

export type Specifications = {
  maxTemp?: number;
  power?: number;
  rpm?: number;
};

export type Asset = {
  id: number;
  assignedUserIds: number[];
  companyId: number;
  healthHistory: Health[];
  healthscore: number;
  image: string;
  metrics: Metrics;
  model: Model;
  name: string;
  sensors: string[];
  specifications: Specifications;
  status: Status;
  unitId: number;
};

export interface AssetWithUsersAndWorkorders extends Asset {
  assignedUsers: User[];
  workorders: Workorder[];
}
