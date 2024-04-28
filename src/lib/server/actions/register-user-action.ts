'use server';

import { createNewUser } from '@/server/methods/user';

type RegisterData = {
  email: string;
  password: string;
};

const registerUserAction = async (data: RegisterData) => createNewUser(data);

export default registerUserAction;
