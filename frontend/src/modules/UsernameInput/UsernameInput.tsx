import React from 'react';
import names from '@/shared/data/names.json';
import { Input } from 'antd';

interface UsernameInputProps {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({ value, setValue, className, ...props }) => {
  const handleBlur = () => {
    const filteredNames = names.filter(name => name !== value);
    if (filteredNames.length === 0) {
      return;
    }
    const randomName = filteredNames[Math.floor(Math.random() * filteredNames.length)];
    setValue(randomName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
  <Input
    value={value}
    onChange={handleChange}
    onBlur={handleBlur}
    className={className}
    // placeholder="Введите ваш уникальный идентификатор"
    {...props}
  />
  );
};
