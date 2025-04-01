import { useState } from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// const { RangePicker } = DatePicker;

const AntDDateSelector = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Дата начала (1 января 1970)
  const startDate = dayjs('1970-01-01');
  // Текущая дата
  const today = dayjs();

  // Ограничиваем выбор даты в DatePicker
  const disabledDate = (current: Dayjs) => {
    return current < startDate || current > today;
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Выберите дату (от 01.01.1970 до сегодня)</h2>

      <DatePicker
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        disabledDate={disabledDate}
        format="DD.MM.YYYY"
        placeholder="Выберите дату"
        style={{ width: '100%', maxWidth: '300px' }}
      />

      {selectedDate && (
        <div style={{ marginTop: '16px' }}>
          <p>
            <strong>Выбрана дата:</strong> {selectedDate.format('DD.MM.YYYY')}
          </p>
          <p>
            <strong>Timestamp (секунды):</strong> {selectedDate.unix()}
          </p>
          <p>
            <strong>Timestamp (миллисекунды):</strong> {selectedDate.valueOf()}
          </p>
        </div>
      )}
    </div>
  );
};

export default AntDDateSelector;
