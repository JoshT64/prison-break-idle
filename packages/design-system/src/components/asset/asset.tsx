import { clsx } from 'clsx';
import './asset.scss';

interface AssetProps extends React.ImgHTMLAttributes<HTMLSpanElement> {
  size?:
    | 'none'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | '2xlarge'
    | '3xlarge';
  label?: string;
  src: string;
  animation?: 'bounce' | 'default';
}

const getAssetSrc = (src: string): string => {
  const isStorybook = window.location.host.includes('6006');
  return isStorybook ? `../../../assets/${src}.png` : src;
};

export const Asset = ({
  size = 'none',
  src,
  label,
  animation = 'default',
}: AssetProps) => {
  const assetSrc = getAssetSrc(src);

  return (
    <span className={clsx(`c-asset`)}>
      <img
        className={clsx(
          `c-asset--size-${size}`,
          `c-asset--animation-${animation}`
        )}
        src={assetSrc}
        alt={label}
      />
    </span>
  );
};
