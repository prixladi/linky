'use client';

import { useCallback, useState } from 'react';

import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { Button, Input, InputError } from '@/components';
import { isValidUrl, makeShortenedLink } from '@/lib';
import { shortenUrlAction } from '@/lib/server/actions';

import ShortenResult from './shorten-result';

type FormValues = { url: string };

type Result = { link: string; forUrl: string };

const FormSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [result, setResult] = useState<Result>();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (values) => {
      if (values.url === result?.forUrl) return;

      const link = await shortenUrlAction(values.url)
        .then(({ path }) => makeShortenedLink(path))
        .catch((err) => {
          setError('url', {
            message: 'Error occurred on the server, try again later',
          });
          throw err;
        });

      setResult({ link, forUrl: values.url });
    },
    [result, setError],
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex sm:flex-row flex-col gap-3 flex-auto items-center"
      >
        <div
          className={clsx('w-full', {
            'mb-7 sm:mb-0': !errors.url?.message,
          })}
        >
          <Input
            placeholder="Enter your link"
            error={errors.url?.message}
            errorMessageHandling="manual"
            register={register('url', {
              required: {
                value: true,
                message: 'You must provide a valid http url',
              },
              validate: (url) => {
                if (isValidUrl(url)) return undefined;
                return 'You must provide a valid http url';
              },
            })}
          />
          <InputError text={errors.url?.message} className="flex sm:hidden" />
        </div>

        <Button type="submit" loading={isSubmitting}>
          Shorten!
        </Button>
      </form>

      <InputError text={errors.url?.message} className="sm:flex hidden" />
      <ShortenResult link={result?.link} />
    </div>
  );
};

export default FormSection;
