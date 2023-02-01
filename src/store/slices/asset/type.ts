import { Asset, AssetWithUsersAndWorkorders, Status } from 'services/asset/type';

import { StateWithRequestStatus } from '../type';

export type AssetFilter = {
  status: Status[];
};

export interface AssetState extends StateWithRequestStatus {
  assets: Asset[];
  assetSelected: AssetWithUsersAndWorkorders | null;
  filteredAssets: Asset[];
  filter: AssetFilter;
  allAssets: Asset[];
}
