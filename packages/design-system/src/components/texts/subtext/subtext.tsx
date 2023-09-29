import React from 'react';
import './subtext.scss';
import clsx from 'clsx';

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement>; // add properties like so <HTMLHeadingElement> { variant?: 'primary' | 'secondary';}
export const SubText = ({ children, ...rest }: HeaderProps) => {
  return (
    <h3 className={clsx('c-subtext')} {...rest}>
      {children}
    </h3>
  );
};
