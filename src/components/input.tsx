import type { HTMLInputTypeAttribute } from 'react';

import clsx from 'clsx';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { Icon } from './icons';
import type { IconType } from './icons/icon';
import InputError from './input-error';

type Props = {
  register: UseFormRegisterReturn<any>;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
  icon?: IconType;
  error?: string;
  errorMessageHandling?: 'auto' | 'manual';
};

const Input: React.FC<Props> = ({
  icon,
  type,
  required,
  placeholder,
  register,
  error,
  errorMessageHandling = 'auto',
}) => (
  <div>
    <label
      htmlFor={register.name}
      className={clsx('input input-lg input-bordered flex items-center gap-2', {
        'input-error': Boolean(error),
        'mb-7': errorMessageHandling === 'auto' && !error,
      })}
    >
      {icon && <Icon type={icon} className="w-4 h-4 opacity-70" />}
      <input
        id={register.name}
        className="w-full"
        type={type}
        placeholder={placeholder}
        required={required}
        {...register}
      />
    </label>
    {errorMessageHandling === 'auto' && <InputError text={error} />}
  </div>
);

export default Input;
