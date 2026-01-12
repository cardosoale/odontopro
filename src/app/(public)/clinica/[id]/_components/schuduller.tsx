'use client';

import Image from 'next/image';
import imgTest from '../../../../../../public/foto1.png';
import { MapPinIcon } from 'lucide-react';
import { Prisma } from '@prisma/client';

type UserWhihServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    services: true;
    subscription: true;
  };
}>;

interface SchudellerContentProps {
  clinic: UserWhihServiceAndSubscription;
}

export function SchudullerContent({ clinic }: SchudellerContentProps) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='h-32 bg-emerald-500' />

      <section className='contianer mx-auto px-4 -mt-16'>
        <div className='max-w-2xl mx-auto'>
          <article className='flex flex-col items-center'>
            <div className='relative w-48 h-48 rounded-full overflow-hidden border-2 border-white mb-8'>
              <Image
                src={clinic.image ? clinic.image : imgTest}
                alt='Foto da clinica'
                className='object-cover'
                fill
              />
            </div>

            <h1 className='text-2xl font-bold mb-2'>{clinic.name}</h1>
            <div className='flex items-center gap-1'>
              <MapPinIcon className='w-5 h-5' />
              <span>
                {clinic.address ? clinic.address : 'Endereço não informado'}
              </span>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
