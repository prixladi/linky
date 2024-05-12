import clsx from 'clsx';

type Props = {
  text?: string;
  className?: string;
};

export const InputError: React.FC<Props> = ({ text, className }) => {
  if (!text) return null;

  return <div className={clsx('animateShow px-4 pt-1 text-error', className)}>{text}</div>;
};
