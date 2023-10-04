import { clsx } from 'clsx';
import './app-footer.scss';

interface AppFooterProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children?: string[] | string | number | undefined | React.ReactNode;
}

export const AppFooter = (props: AppFooterProps) => {
  return (
    <div {...props} className={clsx(`c-app-footer`)}>
      {props.children}
    </div>
  );
};
