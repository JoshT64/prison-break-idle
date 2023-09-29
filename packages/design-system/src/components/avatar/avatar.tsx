import { clsx } from 'clsx';
import './avatar.scss';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | '3xlarge';
  label?: string;
}

export const Avatar = ({ size, src, label }: AvatarProps) => {
  return (
    <span className={clsx(`c-avatar c-avatar--size-${size}`)}>
      <img className='c-avatar__img' src={src} alt={label} />
    </span>
  );
};
