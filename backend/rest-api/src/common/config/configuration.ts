import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';
import { join } from 'node:path';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, '../../../configs/dev.config.yml'), 'utf8'),
  ) as Record<string, any>;
};
