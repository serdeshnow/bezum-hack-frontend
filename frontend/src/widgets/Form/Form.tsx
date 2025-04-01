import React, { useState } from 'react';
import s from './Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/Button/Button';
import { UsernameInput } from '@/modules/UsernameInput/UsernameInput';
import { BirthdaySelect } from '@/modules/BirthdaySelect/BirthdaySelect.tsx';
import dayjs from 'dayjs';
import { Input } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { env } from '@shared/lib/env.ts';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!birthDate) {
      setError('Пожалуйста, выберите дату конфигурации');
      return;
    }

    const selectedDate = dayjs(birthDate, 'DD.MM.YYYY');
    const minDate = dayjs('01.01.2003', 'DD.MM.YYYY');
    const maxDate = dayjs('31.03.2007', 'DD.MM.YYYY');

    if (selectedDate.isBefore(minDate)) {
      setError('ВЫБРАНА ЛОЖНАЯ ДАТА РОЖДЕНИЯ');
      return;
    }

    if (selectedDate.isAfter(maxDate)) {
      setError('У ТЕБЯ НЕТ ДОСТУПА');
      return;
    }

    try {
      Cookies .set('username', username);
      Cookies.set('password', password);
      Cookies.set('birthDate', birthDate);

      const response = await axios.post(`${env.API_URL}/register`, null, {
        params: { username, password },
      });
      console.log('Registration response:', response.data);

      alert("РЕГИСТРАЦИЯ УСПЕШНА!");
      navigate('/home');
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      setError('ОШИБКА ИНТЕГРАЦИИ. СВЯЗЬ ПРЕРВАНА.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h1 className={s.formTitle}>Регистрация</h1>

      {error && <div className={s.errorMessage}>{error}</div>}

      <label className={s.formLabel}>
        <span className={s.formSpan}>Уникальное имя:</span>
        <UsernameInput
          isRandom={true}
          value={username}
          setValue={setUsername}
          className={s.formInput}
        />
      </label>

      <label className={s.formLabel}>
        <span className={s.formSpan}>Дата конфигурации:</span>
        <BirthdaySelect
          className={s.formSelect}
          value={birthDate}
          onChange={setBirthDate}
        />
      </label>

      <label className={s.formLabel}>
        <span className={s.formSpan}>Секретное слово:</span>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={s.formInput}
        />
      </label>

      <Button type="submit" onClick={handleSubmit} className={s.formButton}>
        Интегрироваться
      </Button>
    </form>
  );
};
