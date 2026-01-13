'use client';

import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useState } from 'react';

registerLocale('pt-BR', ptBR);

interface DateTimePickerProps {
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  className?: string;
  onChange: (date: Date) => void;
}

export function DateTimePicker({
  minDate,
  maxDate,
  className,
  initialDate,
  onChange,
}: DateTimePickerProps) {
  const [startdate, setStartDate] = useState(initialDate ?? new Date());

  function handleChange(date: Date | null) {
    if (date) {
      setStartDate(date);
      onChange(date);
    }
  }

  return (
    <DatePicker
      minDate={minDate ?? new Date()}
      selected={startdate}
      locale={'pt-BR'}
      className={className}
      onChange={handleChange}
      dateFormat='dd/MM/yyyy'
    />
  );
}
