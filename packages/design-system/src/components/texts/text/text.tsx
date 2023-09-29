import clsx from 'clsx';
import React from 'react';
import './text.scss';

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement>; // add properties like so <HTMLHeadingElement> { variant?: 'primary' | 'secondary';}
export const Text = ({ children, ...rest }: HeaderProps) => {
  return (
    <h2 className={clsx(`c-text`)} {...rest}>
      {children}
    </h2>
  );
};
