'use client';

import { NextPage } from 'next';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Heading, Input, InputError } from '@/components';

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
    <div className='pt-28 md:pt-36 w-full px-3 m-auto bg-transparent max-w-lg'>
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
        <Input
          icon='envelope'
          type='email'
          placeholder='Email'
          required
          error={errors.email?.message}
          register={register('email', {
            required: { value: true, message: 'Provide your email' },
          })}
        />

        <Input
          icon='key'
          type='password'
          placeholder='Password'
          required
          error={errors.password?.message}
          register={register('password', {
            required: { value: true, message: 'Provide your password' },
          })}
        />

        <Button loading={isSubmitting}>Sign in</Button>
      </form>
    </div>
  );
};

export default SignIn;
