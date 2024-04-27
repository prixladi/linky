'use client';

import { NextPage } from 'next';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Heading, Icon, InputError } from '@/components';

import { loginAction } from '@/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FormValues = { email: string; password: string };

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (values) => {
      await loginAction(values)
        .then(async (res) => {
          if (res) {
            setError('email', { message: 'Invalid email or password' });
            return;
          }

          router.push('/dashboard');
        })
        .catch((err) => {
          setError('email', { message: 'Invalid email or password' });
          throw err;
        });
    },
    [router]
  );

  return (
    <div className='pt-28 md:pt-36'>
      <div className='w-full px-3 m-auto bg-transparent max-w-lg'>
        <Heading text='Login' />

        <p className='pt-3 text-center text-neutral'>
          Don't have an account yet?
          <Link className='text-secondary underline pl-1' href={'/sign-up'}>
            Register
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='pt-8 flex flex-col gap-4'
        >
          <div>
            <label className='input input-lg input-bordered flex items-center gap-2'>
              <Icon type='envelope' className='w-4 h-4 opacity-70' />
              <input
                type='email'
                placeholder='Email'
                required
                {...register('email', {
                  required: { value: true, message: 'Provide your email' },
                })}
              />
            </label>
            <InputError text={errors.email?.message} />
          </div>

          <div>
            <label className='input input-lg input-bordered flex items-center gap-2'>
              <Icon type='key' className='w-4 h-4 opacity-70' />
              <input
                type='password'
                placeholder='Password'
                required
                {...register('password', {
                  required: { value: true, message: 'Provide your password' },
                })}
              />
            </label>
            <InputError text={errors.password?.message} />
          </div>

          <Button loading={isSubmitting}>Sign in</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
