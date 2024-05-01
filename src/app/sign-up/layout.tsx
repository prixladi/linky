import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Register',
};

const RootLayout: React.FC<Props> = ({ children }) => children;

export default RootLayout;
