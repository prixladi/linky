import type { MouseEventHandler } from 'react';

type Props = React.PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  type: 'submit' | 'reset' | 'button';
}>;

const Button: React.FC<Props> = ({ onClick, loading, type, children }) => (
  <button type={type} disabled={loading} onClick={onClick} className="btn btn-lg ">
    {loading ? <span className="loading loading-spinner" /> : children}
  </button>
);

export default Button;
