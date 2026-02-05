import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ReminderFormData, useReminderForm } from './reminder-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createReminder } from '../../_actions/create-reminder';
import { toast } from 'sonner';

interface ReminderContentProps {
  closeDialog: () => void;
}

export function ReminderContent({ closeDialog }: ReminderContentProps) {
  const form = useReminderForm();

  async function onSubmit(formData: ReminderFormData) {
    const resṕonse = await createReminder({
      description: formData.description,
    });

    if (resṕonse.error) {
      toast.error(resṕonse.error);
      return;
    }

    toast.success(resṕonse.data);
    closeDialog();
  }

  return (
    <div className='grid gap-4 py-4'>
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lembrete</FormLabel>
                <FormControl>
                  <Textarea
                    className='max-h-52'
                    {...field}
                    placeholder='Digite o lembrete'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!form.watch('description')} type='submit'>
            Cadastrar lembrete
          </Button>
        </form>
      </Form>
    </div>
  );
}
