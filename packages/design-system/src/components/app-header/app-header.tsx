import { clsx } from 'clsx';
import './app-header.scss';

interface AppHeaderProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children?: string[] | string | number | undefined | React.ReactNode;
}

export const AppHeader = (props: AppHeaderProps) => {
  return (
    <div {...props} className={clsx(`c-app-header`)}>
      {props.children}
    </div>
  );
};
