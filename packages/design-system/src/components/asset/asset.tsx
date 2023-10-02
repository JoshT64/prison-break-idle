import { clsx } from 'clsx';
import './asset.scss';

interface AssetProps extends React.ImgHTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | '3xlarge';
  label?: string;
  src: string;
  animation?: 'bounce' | 'default';
}

const isStorybook = window.location.host.includes('6006');

export const Asset = ({ size, src, label, animation }: AssetProps) => {
  const assetSrc = isStorybook ? `../../../assets/${src}.png` : `${src}`;

  return (
    <span className={clsx(`c-asset`)}>
      <img
        className={`c-asset--size-${size} c-asset--animation-${animation}`}
        src={assetSrc}
        alt={label}
      />
    </span>
  );
};
