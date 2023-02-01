import { Workorder, WorkorderFilter, WorkorderWithUsersAndAssets } from "services/workorder/type";
import { StateWithRequestStatus } from "../type";

export interface WorkorderState extends StateWithRequestStatus {
  workorders: Workorder[];
  workorderSelected: WorkorderWithUsersAndAssets | null;
  filteredWorkorders: Workorder[];
  filter: WorkorderFilter | null;
}