import ServiceWithApiInstance from 'services/api/base';
// import AssetService from 'services/asset';
import { Asset } from 'services/asset/type';
import UserService from 'services/user';

import { generatePathWithQueryParams } from 'utils/query';

import {
  Workorder,
  WorkorderFilter,
  WorkorderWithUsersAndAssets
} from './type';

export default class WorkorderService extends ServiceWithApiInstance {
  private _basePath = 'workorders';
  private _userServiceInstance: UserService;
  // private _assetServiceInstance: AssetService;

  constructor() {
    super();

    this._userServiceInstance = new UserService();
    // this._assetServiceInstance = new AssetService();
  }

  public async getWorkerorders(filter: WorkorderFilter = {}) {
    const pathWithQueryParams = generatePathWithQueryParams(
      this._basePath,
      filter
    );

    const { data: workorders } = await this._api.get<Workorder[]>(
      pathWithQueryParams
    );

    return workorders;
  }

  public async getWorkorderById(
    workorderId: number
  ): Promise<WorkorderWithUsersAndAssets> {
    const { data: workorder } = await this._api.get<Workorder>(
      `${this._basePath}/${workorderId}`
    );
    const users = await this._userServiceInstance.getUsersByIds(
      workorder.assignedUserIds
    );
    const { data: asset } = await this._api.get<Asset>(
      `/assets/${workorder.assetId}`
    );

    return { ...workorder, assignedUsers: users, asset };
  }

  public async addNewWorkorder(workorder: Omit<Workorder, 'id'>) {
    const { data: createdWorkorder } = await this._api.post<Workorder>(
      this._basePath,
      workorder
    );

    return createdWorkorder;
  }
}
