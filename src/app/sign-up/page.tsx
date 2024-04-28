'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { Button, Heading, Input } from '@/components';
import { loginUserAction, registerUserAction } from '@/lib/server/actions';

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
      await registerUserAction(values)
        .then(async (res) => {
          if ('error' in res) {
            setError('email', {
              message: 'Account with provided email already exist',
            });
            return;
          }

          await loginUserAction(values);

          router.push('/dashboard');
        })
        .catch((err) => {
          setError('email', {
            message: 'Error occurred on the server, try again later',
          });
          throw err;
        });
    },
    [router, setError],
  );

  return (
    <div className="pt-24 md:pt-36 w-full px-3 m-auto bg-transparent max-w-lg">
      <Heading text="Register" />

      <p className="pt-3 text-center text-neutral">
        Already have an account?
        <Link className="text-secondary underline pl-1" href="/sign-in">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-8 flex flex-col gap-2">
        <Input
          icon="envelope"
          placeholder="Email"
          error={errors.email?.message}
          register={register('email', {
            required: {
              value: true,
              message: 'You must provide a valid email',
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Provide a valid email',
            },
          })}
        />

        <Input
          type="password"
          icon="key"
          placeholder="Password"
          error={errors.password?.message}
          register={register('password', {
            required: {
              value: true,
              message: 'You must provide password at least 5 characters long',
            },
            minLength: {
              value: 5,
              message: 'You must provide password at least 5 characters long',
            },
          })}
        />

        <Button type="submit" loading={isSubmitting}>
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
