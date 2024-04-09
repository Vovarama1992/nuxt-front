import { plainToInstance } from 'class-transformer';
import { IsEnum, validateSync } from 'class-validator';
import configuration from './configuration';

enum Env {
  Dev = 'dev',
  Prod = 'prod',
  test = 'test',
}

class EnvVar {
  @IsEnum(Env)
  node_env: Env;
}

export function validate(config: Record<string, any>) {
  const validatedConfig = plainToInstance(
    EnvVar,
    { ...config, ...configuration() },
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
