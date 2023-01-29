import ServiceWithApiInstance from "services/api/base";
import { Company } from "./type";

export default class CompanyService extends ServiceWithApiInstance {
  private _baseUrl = '/companies';

  public async getAllCompanies() {
    const { data: companies } = await this._api.get<Company[]>(this._baseUrl);

    return companies;
  }
}