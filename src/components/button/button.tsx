import { MouseEventHandler } from 'react';

type Props = React.PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}>;

const Button: React.FC<Props> = ({ onClick, loading, children }) => (
  <button disabled={loading} onClick={onClick} className='btn btn-lg '>
    {loading ? <span className='loading loading-spinner' /> : children}
  </button>
);

export default Button;
