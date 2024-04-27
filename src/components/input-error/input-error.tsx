import clsx from 'clsx';

type Props = {
  text?: string;
  className?: string;
};

const InputError: React.FC<Props> = ({ text, className }) => {
  if (!text) return null;

  return (
    <span className={clsx('animateShow mt-1 text-error px-4', className)}>
      {text}
    </span>
  );
};

export default InputError;
