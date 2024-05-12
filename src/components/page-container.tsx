import { Heading } from './heading';

type Props = React.PropsWithChildren<{
  heading: string;
}>;

export const PageContainer: React.FC<Props> = ({ children, heading }) => (
  <div className="m-auto w-full max-w-lg bg-transparent px-3 pb-8 pt-24 md:pt-36">
    <Heading text={heading} />
    {children}
  </div>
);
