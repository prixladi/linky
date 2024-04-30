type Props = {
  text: string;
};

export const Heading: React.FC<Props> = ({ text }) => (
  <h1 className="text-5xl text-center font-semibold text-primary">{text}</h1>
);
