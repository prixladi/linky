import clsx from 'clsx';
import type { MouseEventHandler } from 'react';

type Props = React.PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  type: 'submit' | 'reset' | 'button';
  variant?: 'sm' | 'md' | 'lg';
  className?: string;
}>;

const Button: React.FC<Props> = ({
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
      },
      className,
    )}
  >
    {loading ? <span className="loading loading-spinner" /> : children}
  </button>
);

export default Button;
