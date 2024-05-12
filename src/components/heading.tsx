type Props = {
  text: string;
};

export const Heading: React.FC<Props> = ({ text }) => (
  <h1 className="text-center text-5xl font-semibold text-primary">{text}</h1>
);
