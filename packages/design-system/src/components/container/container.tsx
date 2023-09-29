import { clsx } from 'clsx';
import './container.scss';

interface ContainerProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'buttons';
  display?: 'flex' | 'default';
}

export const Container = (props: ContainerProps) => {
  return (
    <div
      {...props}
      className={clsx(
        `c-main-menu--container c-container--display-${props.display}`
      )}
    >
      {props.children}
    </div>
  );
};
