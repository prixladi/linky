'use server';

import { createNewUser } from '@/server/methods/user';

type RegisterData = {
  email: string;
  password: string;
};

export const registerUserAction = async (data: RegisterData) => createNewUser(data);
