export type Response<T> = { data: T };

export interface ApiInstaceType {
  get<T>(url: string): Promise<Response<T>>;
}
