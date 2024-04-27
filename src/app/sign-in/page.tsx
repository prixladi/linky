'use client';

import { NextPage } from 'next';
import { ChangeEvent, useCallback, useState } from 'react';

import { Button, Heading, Icon } from '@/components';

import { loginAction } from '@/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignIn: NextPage = () => {
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
      setEmailError('Provide a valid email');
      valid = false;
    }
    if (!password) {
      setPasswordError('Provide your password');
      valid = false;
    }

    if (!email || !password || !valid) return;

    setLoading(true);
    await loginAction({ email, password })
      .then(async (res) => {
        if (res) {
          setEmailError('Invalid email or password');
          return;
        }

        router.push('/dashboard');
      })
      .catch((err) => {
        setEmailError('Error occurred on the server try again later');
        throw err;
      })
      .finally(() => setLoading(false));
  }, [email, password, loading, router]);

  return (
    <div className='pt-28 md:pt-36'>
      <div className='w-full px-3 m-auto bg-transparent max-w-lg'>
        <Heading text='Log in' />
        <p className='pt-3 text-center text-neutral'>
          Don't have an account yet?
          <Link className='text-secondary underline pl-1' href={'/sign-up'}>
            Register
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
                className='grow'
                placeholder='Email'
              />
            </label>
            {emailError && (
              <span
                className={
                  'animateShow mt-1 text-error px-4 items-center justify-between rounded-xl cursor-pointer'
                }
              >
                {emailError}
              </span>
            )}
          </div>

          <div>
            <label className='input input-lg input-bordered flex items-center gap-2'>
              <Icon type='key' className='w-4 h-4 opacity-70' />
              <input
                type='password'
                onChange={onPasswordInputChange}
                value={password}
                className='grow'
                placeholder='Password'
              />
            </label>
            {passwordError && (
              <span
                className={
                  'animateShow mt-1 text-error px-4 items-center justify-between rounded-xl cursor-pointer'
                }
              >
                {passwordError}
              </span>
            )}
          </div>
          <Button loading={loading} onClick={onSubmit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
