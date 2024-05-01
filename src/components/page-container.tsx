import { Heading } from './heading';

type Props = React.PropsWithChildren<{
  heading: string;
}>;

export const PageContainer: React.FC<Props> = ({ children, heading }) => (
  <div className="pt-24 md:pt-36 pb-8 w-full px-3 m-auto bg-transparent max-w-lg">
    <Heading text={heading} />
    {children}
  </div>
);
