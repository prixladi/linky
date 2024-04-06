import clsx from 'clsx';

type Props = {
  error?: string;
  visible: 'sm-' | 'sm+';
};

const ErrorSection: React.FC<Props> = ({ error, visible }) =>
  error && (
    <span
      className={clsx(
        'animateShow mt-1 text-error px-4 items-center justify-between rounded-xl cursor-pointer',
        {
          hidden: visible === 'sm+',
          'sm:flex': visible === 'sm+',
          'sm:hidden': visible === 'sm-',
          flex: visible === 'sm-',
        }
      )}
    >
      {error}
    </span>
  );

export default ErrorSection;
