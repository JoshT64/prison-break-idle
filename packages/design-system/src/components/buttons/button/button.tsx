import { clsx } from 'clsx';
import './button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'c-main-menu--button',
        props.variant === 'primary' &&
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        props.variant === 'secondary' &&
          'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
      )}
    >
      {props.children}
    </button>
  );
};
