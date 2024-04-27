import { UseFormRegisterReturn } from 'react-hook-form';
import { Icon } from '../icons';
import { IconType } from '../icons/icon';
import { HTMLInputTypeAttribute } from 'react';
import InputError from '../input-error';
import clsx from 'clsx';

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
      className={clsx('input input-lg input-bordered flex items-center gap-2', {
        'input-error': Boolean(error),
        'mb-7': errorMessageHandling === 'auto' && !Boolean(error),
      })}
    >
      {icon && <Icon type={icon} className='w-4 h-4 opacity-70' />}
      <input
        className='w-full'
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
