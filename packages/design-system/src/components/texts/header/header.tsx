import clsx from 'clsx';
import React from 'react';
import './header.scss';

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement>; // add properties like so <HTMLHeadingElement> { variant?: 'primary' | 'secondary';}
export const Header = ({ children, ...rest }: HeaderProps) => {
  return (
    <h1 className={clsx('c-header')} {...rest}>
      {children}
    </h1>
  );
};
