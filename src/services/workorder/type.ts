import { Asset } from "services/asset/type";
import { User } from "services/user/type";

export type ChecklistItem = {
  completed: boolean;
  task: string;
};

export type WorkorderPriority = 'high' | 'medium' | 'low';

export type WorkorderStatus = 'completed' | 'in progress';

export type Workorder = {
  id: number;
  assetId: number;
  assignedUserIds: number[];
  checklist: ChecklistItem[];
  description: string;
  priority: WorkorderPriority;
  status: WorkorderStatus;
  title: string;
};

export interface WorkorderWithUsersAndAssets extends Workorder {
  assignedUsers: User[];
  asset: Asset;
}

export type WorkorderFilter = {
  unitId?: number;
  userId?: number;
  priority?: WorkorderPriority;
  status?: WorkorderStatus | WorkorderStatus[];
  assetId?: number;
}
