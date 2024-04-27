import { SVGAttributes } from 'react';

import PlusIcon from './plus';
import CopyIcon from './copy';
import EnvelopeIcon from './envelope';
import KeyIcon from './key';

const icons =
  {
    plus: { component: PlusIcon, viewBox: '0 0 50 50' },
    copy: { component: CopyIcon, viewBox: '0 0 24 24' },
    envelope: { component: EnvelopeIcon, viewBox: '0 0 16 16' },
    key: { component: KeyIcon, viewBox: '0 0 16 16' },
  } as const;

type IconType = keyof typeof icons;

export type IconProps = SVGAttributes<any> & {
  type: IconType;
};

const Icon = ({ type, ...svgAttributes }: IconProps) => {
  const { component: Component, viewBox } = icons[type];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox={viewBox}
      fill='currentColor'
      {...svgAttributes}
    >
      <Component />
    </svg>
  );
};

export default Icon;
