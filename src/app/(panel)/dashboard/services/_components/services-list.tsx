'use client';

import { use, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon, XIcon } from 'lucide-react';
import { DialogServices } from './dialog-services';
import { Service } from '@/generated/prisma/client';
import { formatCurrency } from '@/utils/format-currency';
import { deleteService } from '../_actions/delete-service';
import { toast } from 'sonner';

interface ServicesListProps {
  services: Service[];
}

export default function ServicesList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editService, setEditService] = useState<null | Service>(null);

  async function handleOnDelete(serviceId: string) {
    const response = await deleteService({ serviceId: serviceId });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Serviço deletado com sucesso!');
  }

  const handleOnDeleteClick = (serviceId: string) => {
    toast('Tem certeza que deseja deletar este serviço?', {
      action: {
        label: 'Confirmar',
        onClick: () => handleOnDelete(serviceId),
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {},
      },
      duration: Infinity,
    });
  };

  function handleEditService(service: Service) {
    setEditService(service);
    setIsDialogOpen(true);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className='mx-auto'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
            <CardTitle className='text-xl md:text-2xl font-bold'>
              Serviços
            </CardTitle>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className='w-4 h-4' />
              </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
              <DialogServices
                serviceId={editService ? editService.id : undefined}
                initialValues={
                  editService
                    ? {
                        name: editService.name,
                        price: (editService.price / 100)
                          .toFixed(2)
                          .replace('.', ','),
                        hour: Math.floor(editService.duration / 60).toString(),
                        minutes: (editService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>
          <CardContent>
            <section className='space-y-4 mt-5'>
              {services.map((service) => (
                <article
                  key={service.id}
                  className='flex flex-row justify-between items-center'
                >
                  <div className='flex items-center space-x-2'>
                    <span className='font-medium'>{service.name}</span>
                    <span className='text-gray-500'> - </span>
                    <span className='text-gray-700'>
                      {formatCurrency(service.price / 100)}
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button
                      className='w-4 h-4 bg-white text-black  hover:bg-white hover:text-blue-500'
                      onClick={() => {
                        handleEditService(service);
                      }}
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      className='w-4 h-4 bg-white text-black hover:bg-white hover:text-red-500'
                      onClick={() => handleOnDeleteClick(service.id)}
                    >
                      <XIcon />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
