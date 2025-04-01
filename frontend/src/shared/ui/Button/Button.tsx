import React, { type ButtonHTMLAttributes, type RefObject } from 'react';
import './Button.scss';
// import { Color } from '@/models';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  // color?: Color;
  children?: React.ReactNode;
  ref?: RefObject<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  color,
  ...props
}) => {
  // можно было использовать classnames
  const finalClassName = ['btn', color ? `btn--${color}` : 'btn--primary', className]
    .filter(Boolean)
    .join(' '); // не придумал, как сделать лучше

  return (
    <button className={finalClassName} {...props}>
      {children ? children : 'BUTTON'}
    </button>
  );
};
