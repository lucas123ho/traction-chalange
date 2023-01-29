import ServiceWithApiInstance from 'services/api/base';

import { generatePathWithQueryParams } from 'utils/query';

import { Unit } from './type';

export default class UnitService extends ServiceWithApiInstance {
  private _basePath = '/units';

  public async getAllUnitsByCompanyId(companyId: number): Promise<Unit[]> {
    const pathWithQueryParams = generatePathWithQueryParams(this._basePath, {
      companyId
    });

    const { data: units } = await this._api.get<Unit[]>(pathWithQueryParams);

    return units;
  }
}
