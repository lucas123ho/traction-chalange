export type Response<T> = { data: T };

export interface ApiInstaceType {
  get<T>(url: string): Promise<Response<T>>;
  post<T>(url: string, options?: Record<string, unknown>): Promise<Response<T>>
}
