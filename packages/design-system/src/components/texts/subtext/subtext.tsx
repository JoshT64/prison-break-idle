import React from 'react';

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement>; // add properties like so <HTMLHeadingElement> { variant?: 'primary' | 'secondary';}
export const SubText = ({ children, ...rest }: HeaderProps) => {
  return <h3 {...rest}>{children}</h3>;
};
