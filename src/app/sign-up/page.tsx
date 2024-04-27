'use client';

import { NextPage } from 'next';
import { useCallback } from 'react';

import { Button, Heading, Icon, InputError } from '@/components';

import { registerAction } from './_actions';
import { loginAction } from '@/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = { email: string; password: string };

const SignUp: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (values) => {
      await registerAction(values)
        .then(async (res) => {
          if ('error' in res) {
            setError('email', {
              message: 'Account with provided email already exist',
            });
            return;
          }

          await loginAction(values);

          router.push('/dashboard');
        })
        .catch((err) => {
          setError('email', {
            message: 'Error occurred on the server, try again later',
          });
          throw err;
        });
    },
    [router]
  );

  return (
    <div className='pt-28 md:pt-36'>
      <div className='w-full px-3 m-auto bg-transparent max-w-lg'>
        <Heading text='Register' />

        <p className='pt-3 text-center text-neutral'>
          Already have an account?
          <Link className='text-secondary underline pl-1' href={'/sign-in'}>
            Login
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
                  required: {
                    value: true,
                    message: 'You must provide a valid email',
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'You must provide a valid email',
                  },
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
                  required: {
                    value: true,
                    message:
                      'You must provide password at least 5 characters long',
                  },
                  minLength: {
                    value: 5,
                    message:
                      'You must provide password at least 5 characters long',
                  },
                })}
              />
            </label>
            <InputError text={errors.password?.message} />
          </div>

          <Button loading={isSubmitting}>Sign up</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
