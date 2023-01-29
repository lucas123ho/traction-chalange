import defaultApiService from 'services/api';

import { ApiInstaceType } from './types';

export default class ServiceWithApiInstance {
  protected _api: ApiInstaceType;

  constructor(apiInstance: ApiInstaceType = defaultApiService) {
    this._api = apiInstance;
  }
}
