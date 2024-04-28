'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { loginUserAction } from '@/lib/server/actions';
import { Button, Heading, Input } from '@/components';

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
      await loginUserAction(values)
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
    [router, setError],
  );

  return (
    <div className="pt-24 md:pt-36 w-full px-3 m-auto bg-transparent max-w-lg">
      <Heading text="Login" />

      <p className="pt-3 text-center text-neutral">
        Don&apos;t have an account yet?
        <Link className="text-secondary underline pl-1" href="/sign-up">
          Register
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="pt-8 flex flex-col gap-1">
        <Input
          icon="envelope"
          placeholder="Email"
          error={errors.email?.message}
          register={register('email', {
            required: { value: true, message: 'Provide your email' },
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
            required: { value: true, message: 'Provide your password' },
          })}
        />

        <Button type="submit" loading={isSubmitting}>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
