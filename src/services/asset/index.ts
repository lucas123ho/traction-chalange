import ServiceWithApiInstance from 'services/api/base';
import UserService from 'services/user';
import WorkorderService from 'services/workorder';

import { AssetFilter } from 'store/slices/asset/type';

import { generatePathWithQueryParams } from 'utils/query';

import { Asset, AssetWithUsersAndWorkorders } from './type';

export default class AssetService extends ServiceWithApiInstance {
  private _basePath = '/assets';
  private _userServiceInstance: UserService;
  private _workorderServiceInstance: WorkorderService;

  constructor() {
    super();
    this._userServiceInstance = new UserService();
    this._workorderServiceInstance = new WorkorderService();
  }

  public async getAllAssets() {
    const { data: assets } = await this._api.get<Asset[]>(this._basePath);

    return assets;
  }

  public async getAllAssetsByUnitId(
    unitId: number,
    filter: AssetFilter = { status: [] }
  ) {
    const pathWithQueryParams = generatePathWithQueryParams(this._basePath, {
      unitId,
      ...filter
    });

    const { data: assets } = await this._api.get<Asset[]>(pathWithQueryParams);

    return assets;
  }

  public async getAssetById(id: number): Promise<AssetWithUsersAndWorkorders> {
    const { data: asset } = await this._api.get<Asset>(
      `${this._basePath}/${id}`
    );
    const users = await this._userServiceInstance.getUsersByIds(
      asset.assignedUserIds
    );
    const workorders = await this._workorderServiceInstance.getWorkerorders({
      assetId: id
    });

    return { ...asset, assignedUsers: users, workorders };
  }
}
