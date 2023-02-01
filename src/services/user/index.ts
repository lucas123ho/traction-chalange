import ServiceWithApiInstance from 'services/api/base';

import { generatePathWithQueryParams } from 'utils/query';

import { User } from './type';

export default class UserService extends ServiceWithApiInstance {
  private _basePath = '/users';

  public async getAllUsers() {
    const { data: users } = await this._api.get<User[]>(this._basePath);

    return users;
  }

  public async getAllUsersByUnitId(unitId: number) {
    const pathWithQueryParams = generatePathWithQueryParams(this._basePath, {
      unitId
    });

    const { data: users } = await this._api.get<User[]>(pathWithQueryParams);

    return users;
  }

  public async getUserByID(userId: number) {
    const { data: user } = await this._api.get<User>(
      `${this._basePath}/${userId}`
    );

    return user;
  }

  public async getUsersByIds(ids: number[]) {
    const pathWithQueryParams = generatePathWithQueryParams(this._basePath, {
      id: ids
    });

    const { data: users } = await this._api.get<User[]>(pathWithQueryParams);

    return users;
  }
}
