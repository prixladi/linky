const getIntegerOrDefault = (key: string, def: number): number => {
  const input = process.env[key];

  if (!input) return def;

  const numInput = Number(input);
  if (Number.isNaN(numInput)) return def;

  return numInput;
};

const getValueOrThrow = (key: string) => {
  const input = process.env[key];
  if (!input) throw new Error(`Missing  required configuration key '${key}'`);
  return input;
};

const config = {
  dbConnectionString: getValueOrThrow('DB_CONNECTION_STRING'),
  tokenSecret: getValueOrThrow('TOKEN_SECRET'),
  accessTokenDurationInSeconds: getIntegerOrDefault(
    'ACCESS_TOKEN_DURATION_IN_SECONDS',
    60 * 15, // 15 minutes
  ),
  refreshTokenDurationInSeconds: getIntegerOrDefault(
    'REFRESH_TOKEN_DURATION_IN_SECONDS',
    60 * 60 * 24 * 2, // two weeks
  ),
};

export default config;
