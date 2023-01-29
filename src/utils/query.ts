import queryString from "query-string";

export function generatePathWithQueryParams(path: string, data: Record<string, string | number>): string {
  const queryParams = queryString.stringify(data);

  return `${path}?${queryParams}`;
}