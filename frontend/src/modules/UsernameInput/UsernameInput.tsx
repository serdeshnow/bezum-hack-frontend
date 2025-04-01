import React from 'react';
import names from '@/shared/data/names.json';

interface UsernameInputProps {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({ value, setValue, className, ...props }) => {
  const handleBlur = () => {
    // Фильтруем имена, чтобы исключить текущее значение
    const filteredNames = names.filter(name => name !== value);
    if (filteredNames.length === 0) {
      return;
    }
    // Выбираем случайное имя из отфильтрованного списка
    const randomName = filteredNames[Math.floor(Math.random() * filteredNames.length)];
    setValue(randomName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Введите имя пользователя"
      {...props}
    />
  );
};
