import { clsx } from 'clsx';
import './resource-bar.scss';

interface ResourceBarProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children?: string[] | string | number | React.ReactNode;
}

export const ResourceBar = (props: ResourceBarProps) => {
  return (
    <div {...props} className={clsx(`c-resource-bar`)}>
      {props.children}
    </div>
  );
};
