type StatusError<T extends string> = {
  error: T;
  message?: string;
};

const makeStatusError = <T extends string>(error: T, message?: string) => ({
  error,
  message,
});

export type BadRequest = StatusError<'badRequest'>;
export type Conflict = StatusError<'conflict'>;

export const makeConflict = (message?: string): Conflict => makeStatusError('conflict', message);
export const makeBadRequest = (message?: string): BadRequest =>
  makeStatusError('badRequest', message);
