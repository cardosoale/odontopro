import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import fotoImg from '../../../../public/foto1.png';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

export function Professionals() {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl text-center mb-12 font-bold'>
          Clinicas Disponíveis
        </h2>

        <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <Card>
            <CardHeader>
              <CardTitle>Cliníca Centro</CardTitle>
              <CardDescription>
                Rua x, centro, Campo Grande - MS
              </CardDescription>
              <CardAction className='w-2.5 h-2.5 rounded-full bg-emerald-500'></CardAction>
            </CardHeader>
            <CardContent className='relative h-48'>
              <Image
                src={fotoImg}
                alt='Foto da clinica'
                fill
                className='object-cover'
              />
            </CardContent>
            <CardFooter className='p-4'>
              <Button className='bg-emerald-500 hover:bg-emerald-400 w-full font-semibold'>
                Agendar horário <ArrowRightIcon className='ml-2' />
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </section>
  );
}
