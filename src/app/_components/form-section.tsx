'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import { isValidUrl, makeShortenedLink } from '@/lib';
import { Button } from '@/components';

import { shortenUrlAction } from '../_actions';

import ErrorSection from './error-section';
import ResultSection from './result-section';

type Result = { link: string; forUrl: string };

const FormSection: React.FC = () => {
  const [url, setUrl] = useState<string>();
  const [result, setResult] = useState<Result>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError(undefined);
  }, []);

  const onShortenClick = useCallback(async () => {
    if (loading) return;
    if (url === result?.forUrl) return;

    setResult(undefined);
    if (!url || !isValidUrl(url)) {
      setError('You must provide a valid http url');
      return;
    }

    setError(undefined);
    setLoading(true);
    const link = await shortenUrlAction(url)
      .then(({ path }) => makeShortenedLink(path))
      .catch((err) => {
        setError('Error occurred on the server, try again later');
        throw err;
      })
      .finally(() => setLoading(false));

    setResult({ link, forUrl: url });
  }, [url, result, loading]);

  return (
    <div>
      <div className='flex sm:flex-row flex-col gap-3 flex-auto items-center'>
        <div className='w-full'>
          <label className='input input-lg input-bordered flex items-center gap-2 w-full'>
            <input
              className='w-full'
              onChange={onInputChange}
              value={url}
              type='url'
              placeholder='Enter your link'
            />
          </label>
          <ErrorSection visible='sm-' error={error} />
        </div>

        <Button loading={loading} onClick={onShortenClick}>
          Shorten!
        </Button>
      </div>

      <ErrorSection visible='sm+' error={error} />
      <ResultSection link={result?.link} />
    </div>
  );
};

export default FormSection;
