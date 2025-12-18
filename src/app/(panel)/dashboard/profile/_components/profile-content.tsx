'use client';

import { useProfileForm } from './profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import ImgTest from '@/../public/foto1.png';
import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function ProfileContent() {
  const form = useProfileForm();
  const timeZones = Intl.supportedValuesOf('timeZone').filter(
    (zone) =>
      zone.startsWith('America/Sao_Paulo') ||
      zone.startsWith('America/Fortaleza') ||
      zone.startsWith('America/Recife') ||
      zone.startsWith('America/Bahia') ||
      zone.startsWith('America/Belem') ||
      zone.startsWith('America/Manaus') ||
      zone.startsWith('America/Cuiaba') ||
      zone.startsWith('America/Boa_Vista')
  );

  const [selectHours, setSelectHours] = useState<string[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  function generateTimeSlot(): string[] {
    const hours: string[] = [];
    for (let i = 7; i < 19; i++) {
      for (let j = 0; j < 2; j++) {
        const min = (j * 30).toString().padStart(2, '0');
        const hour = i.toString().padStart(2, '0');
        hours.push(`${hour}:${min}`);
      }
    }
    return hours;
  }

  const hours = generateTimeSlot();

  function toogleHour(hour: string) {
    setSelectHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort()
    );
  }

  return (
    <div className='mx-auto'>
      <Form {...form}>
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex justify-center'>
                <div className='bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden'>
                  <Image
                    src={ImgTest}
                    alt='Imagem de teste'
                    fill
                    className='object-cover'
                  />
                </div>
              </div>

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Digite seu nome completo'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>
                        Endereço Completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Digite seu endereço completo'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Digite seu telefone com DDD'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ? 'active' : 'deactive'}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Selecione o status' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='active'>
                              Ativo (Clinica Aberta)
                            </SelectItem>
                            <SelectItem value='deactive'>
                              Desativado (Clinica Fechada)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='space-y-4'>
                  <Label className='font-semibold'>
                    Configurar horários de funcionamento da clínica
                  </Label>

                  <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={'outline'}
                        className='w-full justify-between'
                      >
                        Clique aqui para selecionar os horários de funcionamento
                        da clínica <ArrowRightIcon className='w-5 h-5' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Horários da Clínica</DialogTitle>
                        <DialogDescription>
                          Selecione aqui os horários de funcionamento da clínica
                        </DialogDescription>
                      </DialogHeader>

                      <section className='py-4'>
                        <p className='text-sm text-muted-foreground mb-2'>
                          Selecione dentre os horários abaixo:
                        </p>
                        <div className='grid grid-cols-4 gap-2'>
                          {hours.map((hour) => (
                            <Button
                              variant={'outline'}
                              key={hour}
                              onClick={() => toogleHour(hour)}
                              className={cn(
                                'h-10',
                                selectHours.includes(hour) &&
                                  'border-2 border-emerald-500 text-primary'
                              )}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </section>
                      <Button
                        className='bg-emerald-500 text-white w-full hover:bg-emerald-400'
                        onClick={() => setDialogIsOpen(false)}
                      >
                        Salvar e Sair
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
                <FormField
                  control={form.control}
                  name='timeZone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>
                        Fuso Horário
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Selecione seu fuso horário' />
                          </SelectTrigger>
                          <SelectContent>
                            {timeZones.map((zone) => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className='w-full bg-emerald-500 hover:bg-emerald-400'
                  type='submit'
                >
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
