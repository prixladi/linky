'use client';

import { NextPage } from 'next';
import { ChangeEvent, useCallback, useState } from 'react';

import { Button, Heading, Icon, InputError } from '@/components';

import { registerAction } from './_actions';
import { loginAction } from '@/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp: NextPage = () => {
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onEmailInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(undefined);
  }, []);

  const onPasswordInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordError(undefined);
    },
    []
  );

  const onSubmit = useCallback(async () => {
    if (loading) return;

    let valid = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('You must provide a valid email');
      valid = false;
    }
    if (!password || password.length < 5) {
      setPasswordError('You must provide password at least 5 characters long');
      valid = false;
    }

    if (!email || !password || !valid) return;

    setLoading(true);
    await registerAction({ email, password })
      .then(async (res) => {
        if ('error' in res) {
          setEmailError('Account with provided email already exist');
          return;
        }

        await loginAction({ email, password });

        router.push('/dashboard');
      })
      .catch((err) => {
        setEmailError('Error occurred on the server, try again later');
        throw err;
      })
      .finally(() => setLoading(false));
  }, [email, password, loading]);

  return (
    <div className='pt-28 md:pt-36'>
      <div className='w-full px-3 m-auto bg-transparent max-w-lg'>
        <Heading text='Create your account' />
        <p className='pt-3 text-center text-neutral'>
          Already have an account?
          <Link className='text-secondary underline pl-1' href={'/sign-in'}>
            Log In
          </Link>
        </p>
        <div className='pt-8 flex flex-col gap-4'>
          <div>
            <label className='input input-lg input-bordered flex items-center gap-2'>
              <Icon type='envelope' className='w-4 h-4 opacity-70' />
              <input
                type='email'
                onChange={onEmailInputChange}
                value={email}
                placeholder='Email'
              />
            </label>
            <InputError text={emailError} />
          </div>

          <div>
            <label className='input input-lg input-bordered flex items-center gap-2'>
              <Icon type='key' className='w-4 h-4 opacity-70' />
              <input
                type='password'
                onChange={onPasswordInputChange}
                value={password}
                placeholder='Password'
              />
            </label>
            <InputError text={passwordError} />
          </div>

          <Button loading={loading} onClick={onSubmit}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
