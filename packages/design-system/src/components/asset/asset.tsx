import { clsx } from 'clsx';
import { AssetName } from '../../../assets/assets.types';
import './asset.scss';

interface AssetProps extends React.ImgHTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | '3xlarge';
  label?: string;
  src: AssetName;
}

export const Asset = ({ size, src, label }: AssetProps) => {
  const assetSrc = `../../../assets/${src}.png`;

  return (
    <span className={clsx(`c-asset `)}>
      <img
        className={`c-avatar__img c-asset--size-${size}`}
        src={assetSrc}
        alt={label}
      />
    </span>
  );
};
