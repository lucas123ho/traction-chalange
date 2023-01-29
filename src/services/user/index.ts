import ServiceWithApiInstance from 'services/api/base';

import { generatePathWithQueryParams } from 'utils/query';

import { User } from './type';

export default class UserService extends ServiceWithApiInstance {
  private _basePath = '/users';

  public async getAllUsers(): Promise<User[]> {
    const { data: users } = await this._api.get<User[]>(this._basePath);

    return users;
  }

  public async getAllUsersByUnitId(unitId: number): Promise<User[]> {
    const pathWithQueryParams = generatePathWithQueryParams(this._basePath, {
      unitId
    });

    const { data: users } = await this._api.get<User[]>(pathWithQueryParams);

    return users;
  }

  public async getUserByID(userId: number): Promise<User> {
    const { data: user } = await this._api.get<User>(
      `${this._basePath}/${userId}`
    );

    return user;
  }
}
