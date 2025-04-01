import { useEffect, useState } from 'react';
import s from './Page.module.scss';
import axios from 'axios';
import { RegistrationForm } from '@widgets/Form/Form.tsx';

// A component that renders text with rapidly changing visual styles
const SchizoText = ({ text }: { text: string }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
  const randomFontSize = () => `${Math.floor(Math.random() * (36 - 16) + 16)}px`;
  const randomRotation = () => `${Math.floor(Math.random() * 21 - 10)}deg`; // between -10 and +10

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle({
        color: randomColor(),
        fontSize: randomFontSize(),
        transform: `rotate(${randomRotation()})`,
        transition: 'all 0.3s ease',
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return <span style={style}>{text}</span>;
};

// A component for keyboard buttons that constantly change style
const SchizoButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  const randomFontSize = () => `${Math.floor(Math.random() * (24 - 12) + 12)}px`;
  const randomRotation = () => `${Math.floor(Math.random() * 10 - 10)}deg`;

  // Generate a random hex color ensuring 6 digits
  const randomBackgroundColor = () =>
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');

  // Helper function: for a given hex color, return black or white for good contrast
  const getContrastingColor = (hexColor: string): string => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    // If brightness is high, return black; otherwise, white.
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const background = randomBackgroundColor();
      setStyle({
        backgroundColor: background,
        color: getContrastingColor(background),
        fontSize: randomFontSize(),
        transform: `rotate(${randomRotation()})`,
        transition: 'all 0.3s ease',
        width: '100%',
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <button className={s.keyboard_key} style={style} onClick={onClick}>
      {label}
    </button>
  );
};

export const HomePage = () => {
  const [input, setInput] = useState('');
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const letterKeys = [
    'Й',
    'Ц',
    'У',
    'К',
    'Е',
    'Н',
    'Г',
    'Ш',
    'Щ',
    'З',
    'Х',
    'Ъ',
    'Ф',
    'Ы',
    'В',
    'А',
    'П',
    'Р',
    'О',
    'Л',
    'Д',
    'Ж',
    'Э',
    'Я',
    'Ч',
    'С',
    'М',
    'И',
    'Т',
    'Ь',
    'Б',
    'Ю',
  ];

  // Utility to shuffle an array
  const shuffleArray = (arr: string[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const [shuffledKeys, setShuffledKeys] = useState<string[][]>([]);

  const handleShuffle = () => {
    const shuffled = shuffleArray(letterKeys);
    setShuffledKeys([
      shuffled.slice(0, 12),
      shuffled.slice(12, 23),
      shuffled.slice(23, 33),
      ['Пробел', 'Стереть', 'Скрыть'],
    ]);
  };

  const handleSend = () => {
    setLoadingResponse(true);
    const text = input;
    setInput('');
    setMessages([...messages, { text: text, fromUser: true }]);
    // Simulated bot response for demo purposes
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: 'Это ответ бота!', fromBot: true }]);
      setLoadingResponse(false);
    }, 1000);
  };

  useEffect(() => {
    handleShuffle();
  }, [keyboardActive]);

  const handleKeyPress = (key: string) => {
    if (key === 'Скрыть') {
      setKeyboardActive(false);
    } else if (key === 'Пробел') {
      setInput((prev) => prev + ' ');
    } else if (key === 'Стереть') {
      setInput((prev) => prev.slice(0, -1));
    } else {
      // For Russian letters, convert uppercase to lowercase
      if (/^[А-ЯЁ]$/.test(key)) {
        setInput((prev) => prev + key.toLowerCase());
      }
    }
  };

  const handleNewChat = () => {
    localStorage.setItem('messages', '[]');
    setMessages([]);
  };

  useEffect(() => {
    const stored = localStorage.getItem('messages');
    console.log(stored);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('messages', JSON.stringify(messages));
    }, 0);
  }, [messages]);

  return (
    <div className={s.app_container}>
      <div className={s.new_chat}>
        <button onClick={handleNewChat}>Новый чат</button>
      </div>
      <div className={s.messages_container}>
        {messages.map((message, index) => (
          <div key={index} className={message.fromBot ? s.bot_message : s.user_message}>
            <SchizoText text={message.text} />
          </div>
        ))}
        {loadingResponse && <div>Загрузка</div>}
      </div>

      <div
        className={s.keyboard_container}
        style={keyboardActive ? { bottom: '0' } : { bottom: '-100%' }}
      >
        {shuffledKeys.map((keyRow, rowIndex) => (
          <div key={rowIndex} className={s.keyboard_row}>
            {keyRow.map((key) => (
              <SchizoButton key={key} label={key} onClick={() => handleKeyPress(key)} />
            ))}
          </div>
        ))}
      </div>
      <div
        className={s.text_input_container}
        style={keyboardActive ? { bottom: '25vh' } : { bottom: '20px' }}
      >
        <button onClick={handleShuffle}>Перемешать</button>
        <input
          className={s.text_input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={() => setKeyboardActive(true)}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
};
