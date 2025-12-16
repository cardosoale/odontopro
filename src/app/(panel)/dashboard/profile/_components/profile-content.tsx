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

import ImgTest from '@/../public/foto1.png';

export function ProfileContent() {
  const form = useProfileForm();

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
                          <SelectTrigger>
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
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
