import { clsx } from 'clsx';
import './container.scss';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | '3xlarge';
  label: '';
}

export const Avatar = (
  props: AvatarProps,
  { size, src, label }: AvatarProps
) => {
  return (
    <span {...props} className={clsx(`c-avatar, c-avatar--size-${size}`)}>
      <img className='c-avatar__img' src={src} alt={label} />
    </span>
  );
};
