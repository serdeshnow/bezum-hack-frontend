import { Select } from 'antd';
import { type FC, type Ref } from 'react';
import dayjs from 'dayjs';

interface Props {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  ref?: Ref<any>;
}

export const BirthdaySelect: FC<Props> = ({ className, value, onChange, ref, ...props }) => {
  const generateAllDates = () => {
    const dates: string[] = [];
    let currentDate = dayjs('01.01.1970');
    const today = dayjs();

    while (currentDate.isBefore(today) || currentDate.isSame(today, 'day')) {
      dates.push(currentDate.format('DD.MM.YYYY'));
      currentDate = currentDate.add(1, 'day');
    }

    return dates;
  };

  const allDates = generateAllDates();

  return (
    <Select
      {...props}
      // ref={ref}
      className={className}
      placeholder="Выберите дату (ДД.ММ.ГГГГ)"
      // style={{ width: '100%' }}
      value={value}
      onChange={onChange}
      options={allDates.map(date => ({
        label: date,
        value: date,
      }))}
      // showSearch
      listHeight={120}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      // virtual
    />
  );
};
