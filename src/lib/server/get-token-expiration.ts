const getTokenExpiration = (token?: string): number | null => {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [, payload] = parts;

  const data = JSON.parse(Buffer.from(payload, 'base64').toString());
  if (!('exp' in data) || typeof data.exp !== 'number') return null;

  return Math.floor(data.exp - Date.now() / 1000);
};

export default getTokenExpiration;
