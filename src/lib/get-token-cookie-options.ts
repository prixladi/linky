const getTokenCookieOptions = () => ({
  httpOnly: true,
  expires: Date.now() + 180 * 24 * 60 * 60 * 1000, // 180 days in ms
});

export default getTokenCookieOptions;
