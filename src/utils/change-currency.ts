import { UseFormReturn } from 'react-hook-form';
import { DialogServiceFormData } from '@/app/(panel)/dashboard/services/_components/dialog-content-form';

export function changeCurrency(
  event: React.ChangeEvent<HTMLInputElement>,
  form: UseFormReturn<DialogServiceFormData>
) {
  let { value } = event.target;
  value = value.replace(/\D/g, '');

  if (value) {
    value = (parseInt(value, 10) / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  event.target.value = value;
  form.setValue('price', value);
}
