import React, { useState } from 'react';
import './Form.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/Button/Button';
import UsernameInput from '@/modules/UsernameInput/UsernameInput';

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

  // Случайная безумная подсказка для поля "чо"
  const randomHint = "Например, чо!";

  const handleVoiceInput = () => {
    // Симуляция активации голосового ввода
    alert("Голосовой ввод активирован! Произнесите вашу фразу... (функционал эмулирован)");
    setVoiceInput("Пришельцы уже здесь!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password, favoriteAlien, secretHandshake, voiceInput });
    alert("Регистрация прошла абсурдно успешно!");
  };

  return (
    <form onSubmit={handleSubmit} className="absurd-form">
      <h1>Регистрация</h1>

      <label>
        Имя пользователя:
        <UsernameInput value={username} setValue={setUsername} />
      </label>

      <label>
        Имя пользователя:
        <UsernameInput value={username} setValue={setUsername} />
      </label>

      <label>
        Пароль:
        <input
          type="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
      </label>

      <label>
        чо:
        <input
          type="text"
          value={favoriteAlien}
          placeholder={randomHint}
          onChange={(e) => setFavoriteAlien(e.target.value)}
        />
      </label>

      <label>
        Секретное рукопожатие (эмодзи):
        <input
          type="text"
          value={secretHandshake}
          onChange={(e) => setSecretHandshake(e.target.value)}
          placeholder="Например, 🤝✨😎"
        />
      </label>

      <div className="voice-input-section">
        <button type="button" onClick={handleVoiceInput}>
          Активировать голосовой ввод
        </button>
        {voiceInput && <p>Распознано: {voiceInput}</p>}
      </div>

      <Button type="submit" onClick={handleRegister}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
