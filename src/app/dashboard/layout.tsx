import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Dashboard',
};

const RootLayout: React.FC<Props> = ({ children }) => children;

export default RootLayout;
