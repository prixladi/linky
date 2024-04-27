'use server';

import { createNew } from '@/server/methods/user';

type RegisterData = {
  email: string;
  password: string;
};

const registerAction = async (data: RegisterData) => createNew(data);

export default registerAction;
