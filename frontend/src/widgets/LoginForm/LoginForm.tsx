import React, { useState } from 'react';
import s from '../Form/Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/Button/Button';
import { UsernameInput } from '@/modules/UsernameInput/UsernameInput';
import { Input } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { env } from '@shared/lib/env.ts';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      Cookies.set('username', username);
      Cookies.set('password', password);

      const response = await axios.post(`${env.API_URL}/login`, null, {
        params: { username, password },
      });
      console.log('Login response:', response.data);

      alert("ИДЕНТИФИКАЦИЯ УСПЕШНА!");
      navigate('/home');
    } catch (err) {
      console.error('Ошибка входа:', err);
      setError('ОШИБКА ВХОДА. СВЯЗЬ ПРЕРВАНА.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h1 className={s.formTitle}>Вход</h1>

      {error && <div className={s.errorMessage}>{error}</div>}

      <label className={s.formLabel}>
        <span className={s.formSpan}>Идентификатор:</span>
        <UsernameInput
          isRandom={false}
          value={username}
          setValue={setUsername}
          className={s.formInput}
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
