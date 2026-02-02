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

export function ReminderContent() {
  const form = useReminderForm();

  async function onSubmit(formData: ReminderFormData) {
    console.log(formData);
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
