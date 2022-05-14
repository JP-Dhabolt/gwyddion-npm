import { FC, ReactNode } from 'react';

export interface ButtonProps {
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children }) => (
  <div>
    <button>{children}</button>
  </div>
);
