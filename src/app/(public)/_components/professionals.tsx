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

import { User } from '@prisma/client';
import Link from 'next/link';

interface ProfessionalsProps {
  professionals: User[];
}

export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl text-center mb-12 font-bold'>
          Clinicas Disponíveis
        </h2>

        <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {professionals.map((clinic) => (
            <Card
              className='overflow-hidden hover:shadow-lg duration-300'
              key={clinic.id}
            >
              <CardHeader>
                <CardTitle>{clinic.name}</CardTitle>
                <CardDescription>
                  {clinic.address || 'Endereço não informado'}
                </CardDescription>
                <CardAction className='w-2.5 h-2.5 rounded-full bg-emerald-500'></CardAction>
              </CardHeader>
              <CardContent className='relative h-48'>
                <Image
                  src={clinic.image ?? fotoImg}
                  alt='Foto da clinica'
                  fill
                  className='object-contain'
                />
              </CardContent>
              <CardFooter className='p-4'>
                <Link
                  href={`/clinica/${clinic.id}`}
                  target='_blank'
                  className='w-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium'
                >
                  Agendar horário <ArrowRightIcon className='ml-2' />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </section>
      </div>
    </section>
  );
}
