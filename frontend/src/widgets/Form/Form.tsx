import React, { useState } from 'react';
import s from './Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/Button/Button';
import { UsernameInput } from '@/modules/UsernameInput/UsernameInput';
import { BirthdaySelect } from '@/modules/BirthdaySelect/BirthdaySelect.tsx';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/home');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteAlien, setFavoriteAlien] = useState('');
  const [secretHandshake, setSecretHandshake] = useState('');
  const [voiceInput, setVoiceInput] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const randomHint = "Например, чо!";

  const handleVoiceInput = () => {
    alert("Голосовой ввод активирован! Произнесите вашу фразу...");
    setVoiceInput("Пришельцы уже здесь!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password, favoriteAlien, secretHandshake, voiceInput, birthDate });
    alert("Регистрация прошла успешно!");
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h1 className={s.formTitle}>Регистрация</h1>

      <label className={s.formLabel}>
        Имя пользователя:
        <UsernameInput
          value={username}
          setValue={setUsername}
          className={s.formInput}
        />
      </label>

      <label className={s.formLabel}>
        Дата рождения:
        <BirthdaySelect
          className={s.formSelect}
          value={birthDate}
          onChange={setBirthDate}
        />
      </label>

      <label className={s.formLabel}>
        Пароль:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          className={s.formInput}
        />
      </label>

      <label className={s.formLabel}>
        чо:
        <input
          type="text"
          value={favoriteAlien}
          placeholder={randomHint}
          onChange={(e) => setFavoriteAlien(e.target.value)}
          className={s.formInput}
        />
      </label>

      <label className={s.formLabel}>
        Секретное рукопожатие (эмодзи):
        <input
          type="text"
          value={secretHandshake}
          onChange={(e) => setSecretHandshake(e.target.value)}
          placeholder="Например, 🤝✨😎"
          className={s.formInput}
        />
      </label>

      <div className={s.formVoiceSection}>
        <button
          type="button"
          onClick={handleVoiceInput}
          className={s.formButton}
        >
          Активировать голосовой ввод
        </button>
        {voiceInput && <p>Распознано: {voiceInput}</p>}
      </div>

      <Button
        type="submit"
        onClick={handleRegister}
        className={s.formButton}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};
