import React, { InputHTMLAttributes } from 'react';
import { Input as AndDInput } from 'antd';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return <AndDInput {...props} />;
};
