import queryString from 'query-string';

export function generatePathWithQueryParams(
  path: string,
  data: Record<string, unknown>
): string {
  const queryParams = queryString.stringify(data);

  return `${path}?${queryParams}`;
}
