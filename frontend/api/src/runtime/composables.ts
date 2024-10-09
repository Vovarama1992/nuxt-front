import { base } from '#api-options';

const OBJECTID_LENGTH = 24;

export function useCDN(file: string, size = 't') {
  if (file.length === OBJECTID_LENGTH && !file.includes('.'))
    return `${base}/v1/files/${file}/${size}`;

  return `${base}/static/${file}`;
}