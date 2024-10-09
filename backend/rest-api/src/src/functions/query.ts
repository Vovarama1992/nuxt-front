const ARRAY_SEPARATOR = ',';

export function convertDTOToSearchQuery<T = Record<string, any>>(dto: T) {
  const query: string[] = [];

  for (const _key in dto) {
    const typecast = _key as keyof T;
    if (!dto[typecast]) continue;

    let converted: string;
    if (Array.isArray(dto[typecast]))
      converted = (dto[typecast] as Array<any>).join(ARRAY_SEPARATOR)
    else
      converted = String(dto[typecast]);

    query.push(`${String(_key)}=${converted}`);
  }

  if (query.length === 0)
    return '';

  return '?' + query.join('&');
}

type TransformOptions = { value: string };

export function transformToArray({ value }: TransformOptions) {
  return value.split(ARRAY_SEPARATOR);
}

export function transformToBoolean({ value }: TransformOptions) {
  value = value.trim();
  return value === '1' || value === 'true';
}

export function transformToNumber({ value }: TransformOptions) {
  return +value.trim();
}