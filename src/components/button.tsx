import type { MouseEventHandler } from 'react';

import clsx from 'clsx';

type Props = React.PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  type: 'submit' | 'reset' | 'button';
  variant?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}>;

export const Button: React.FC<Props> = ({
  onClick,
  loading,
  type,
  variant = 'lg',
  className,
  children,
}) => (
  <button
    type={type}
    disabled={loading}
    onClick={onClick}
    className={clsx(
      'btn',
      {
        'btn-sm': variant === 'sm',
        'btn-md': variant === 'md',
        'btn-lg': variant === 'lg',
        'btn-xs': variant === 'xs',
      },
      className,
    )}
  >
    {loading ? <span className="loading loading-spinner" /> : children}
  </button>
);
