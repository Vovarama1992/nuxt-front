type TransformOptions = { value: string | string[] };

export const transformToArray = (opts: TransformOptions) =>
  Array.isArray(opts) ? opts : [ opts ];