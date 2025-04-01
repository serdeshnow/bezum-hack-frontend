// import ReactLogo from '@/shared/assets/svg/react.svg?react';
import { RegistrationForm } from '@widgets/Form/Form.tsx'; // ensure you use ?react when
import { useEffect, useState } from 'react';
import s from './Page.module.scss';
// you want to render svg as component
// import viteLogo from '/vite.svg?url'; // ensure you use ?url when importing svg to <img/>

export const HomePage = () => {
  const [input, setInput] = useState('');
  const [keyboardActive, setKeyboardActive] = useState(false);

  const messages = [
    { text: 'Привет', fromBot: false },
    { text: 'Пока', fromBot: true },
  ];

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

  useEffect(() => {
    handleShuffle();
  }, [keyboardActive]);

  const handleKeyPress = (key: string) => {
    if (key == 'Скрыть') {
      setKeyboardActive(false);
    }
    if (key == 'Пробел') {
      setInput(input + ' ');
    }
    if (key == 'Стереть') {
      setInput(input.slice(0, -1));
    }
    if (key === 'А') setInput(input + 'а');
    if (key === 'Б') setInput(input + 'б');
    if (key === 'В') setInput(input + 'в');
    if (key === 'Г') setInput(input + 'г');
    if (key === 'Д') setInput(input + 'д');
    if (key === 'Е') setInput(input + 'е');
    if (key === 'Ё') setInput(input + 'ё');
    if (key === 'Ж') setInput(input + 'ж');
    if (key === 'З') setInput(input + 'з');
    if (key === 'И') setInput(input + 'и');
    if (key === 'Й') setInput(input + 'й');
    if (key === 'К') setInput(input + 'к');
    if (key === 'Л') setInput(input + 'л');
    if (key === 'М') setInput(input + 'м');
    if (key === 'Н') setInput(input + 'н');
    if (key === 'О') setInput(input + 'о');
    if (key === 'П') setInput(input + 'п');
    if (key === 'Р') setInput(input + 'р');
    if (key === 'С') setInput(input + 'с');
    if (key === 'Т') setInput(input + 'т');
    if (key === 'У') setInput(input + 'у');
    if (key === 'Ф') setInput(input + 'ф');
    if (key === 'Х') setInput(input + 'х');
    if (key === 'Ц') setInput(input + 'ц');
    if (key === 'Ч') setInput(input + 'ч');
    if (key === 'Ш') setInput(input + 'ш');
    if (key === 'Щ') setInput(input + 'щ');
    if (key === 'Ъ') setInput(input + 'ъ');
    if (key === 'Ы') setInput(input + 'ы');
    if (key === 'Ь') setInput(input + 'ь');
    if (key === 'Э') setInput(input + 'э');
    if (key === 'Ю') setInput(input + 'ю');
    if (key === 'Я') setInput(input + 'я');
  };
  return (
    <>
      <div className={s.app_container}>
        {messages.map((message, index) => (
          <div key={index} className={message.fromBot ? s.bot_message : s.user_message}>
            {message.text}
          </div>
        ))}
        <div
          className={s.keyboard_container}
          style={keyboardActive ? { bottom: '0' } : { bottom: '-100%' }}
        >
          {shuffledKeys.map((keyRow) => (
            <div className={s.keyboard_row}>
              {keyRow.map((key) => {
                return (
                  <button
                    key={key}
                    className={s.keyboard_key}
                    onClick={() => handleKeyPress(key)}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div
          className={s.text_input_container}
          style={keyboardActive ? { bottom: '25vh' } : { bottom: '20px' }}
        >
          <button onClick={() => handleShuffle()}>Перемешать</button>
          <input
            className={s.text_input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={() => setKeyboardActive(true)}
          />
          <button>Отправить</button>
        </div>
      </div>
    </>
  );
};
