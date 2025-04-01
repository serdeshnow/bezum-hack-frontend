import React, { useRef, useState } from 'react';
import s from './Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/Button/Button';
import { UsernameInput } from '@/modules/UsernameInput/UsernameInput';
import { BirthdaySelect } from '@/modules/BirthdaySelect/BirthdaySelect.tsx';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [favoriteAlien, setFavoriteAlien] = useState('');
  // const [secretHandshake, setSecretHandshake] = useState('');
  // const [voiceInput, setVoiceInput] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const inputRefs = {
    birthday: useRef(null),
    password: useRef(null),
    alien: useRef(null),
    handshake: useRef(null),
  };

  // const handleKeyDown = (e: React.KeyboardEvent, nextRef: React.RefObject<HTMLInputElement | HTMLDivElement>) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     nextRef.current?.focus();
  //   }
  // };

  // const handleVoiceInput = () => {
  //   alert("Голосовой ввод активирован! Произнесите вашу фразу...");
  //   setVoiceInput("Пришельцы уже здесь!");
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Регистрация прошла успешно!");
    navigate('/home');
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
        {/*<div ref={inputRefs.birthday}>*/}
          <BirthdaySelect
            ref={inputRefs.birthday}
            className={s.formSelect}
            value={birthDate}
            onChange={setBirthDate}
          />
        {/*</div>*/}
      </label>

      <label className={s.formLabel}>
        Пароль:
        <input
          type="text"
          ref={inputRefs.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={s.formInput}
          placeholder="Введите пароль"
        />
      </label>

      {/*<label className={s.formLabel}>*/}
      {/*  чо:*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    ref={inputRefs.alien}*/}
      {/*    value={favoriteAlien}*/}
      {/*    onChange={(e) => setFavoriteAlien(e.target.value)}*/}
      {/*    className={s.formInput}*/}
      {/*    placeholder="Например, чо!"*/}
      {/*  />*/}
      {/*</label>*/}

      {/*<label className={s.formLabel}>*/}
      {/*  Секретное рукопожатие (эмодзи):*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    ref={inputRefs.handshake}*/}
      {/*    value={secretHandshake}*/}
      {/*    onChange={(e) => setSecretHandshake(e.target.value)}*/}
      {/*    className={s.formInput}*/}
      {/*    onKeyDown={(e) => {*/}
      {/*      if (e.key === 'Enter') handleSubmit(e);*/}
      {/*    }}*/}
      {/*    placeholder="Например, 🤝✨😎"*/}
      {/*  />*/}
      {/*</label>*/}

      {/*<div className={s.formVoiceSection}>*/}
      {/*  <button*/}
      {/*    type="button"*/}
      {/*    onClick={handleVoiceInput}*/}
      {/*    className={s.formButton}*/}
      {/*  >*/}
      {/*    Активировать голосовой ввод*/}
      {/*  </button>*/}
      {/*  {voiceInput && <p>Распознано: {voiceInput}</p>}*/}
      {/*</div>*/}

      <Button
        type="submit"
        onClick={handleSubmit}
        className={s.formButton}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};
