'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { DialogServices } from './dialog-services';

export default function ServicesList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          </CardHeader>
          <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <CardContent>
              <DialogServices />
            </CardContent>
          </DialogContent>
        </Card>
      </section>
    </Dialog>
  );
}
