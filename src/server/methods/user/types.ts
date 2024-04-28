export type AccessTokenPayload = {
  id: number;
  email: string;
  type: 'access';
};

export type RefreshTokenPayload = {
  id: number;
  type: 'refresh';
};
