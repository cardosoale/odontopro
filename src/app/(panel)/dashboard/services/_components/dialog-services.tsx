'use client';

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDialogServiceForm } from './dialog-content-form';

export function DialogServices() {
  const form = useDialogServiceForm(null);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Serviços</DialogTitle>
        <DialogDescription>Adicione um novo serviço</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className='space-y-2'>
          <div className='flex flex-col'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel className='font-semibold'>
                    Nome do Serviço
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Digite o nome do serviço' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel className='font-semibold'>Valor</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ex.: R$120,00' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className='font-semibold'>Tempo de duração do serviço</p>
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='hour'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel className='font-semibold'>Horas:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='0'
                      type='number'
                      min={'0'}
                      max={'23'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='minutes'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel className='font-semibold'>Minutos:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='0'
                      type='number'
                      min={'0'}
                      max={'59'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='font-semibold w-full text-white'>
            Adicionar Serviço
          </Button>
        </form>
      </Form>
    </>
  );
}
