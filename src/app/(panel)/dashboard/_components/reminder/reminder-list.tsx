'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Reminder } from '@prisma/client';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { deleteReminder } from '../../_actions/delete-reminder';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReminderContent } from './reminder-content';
import { useState } from 'react';

interface ReminderListProps {
  reminder: Reminder[];
}

export function ReminderList({ reminder }: ReminderListProps) {
  const [isDialogOpen, SetIsDialogOpen] = useState(false);

  async function handleDeleteReminder(id: string) {
    const response = await deleteReminder({ reminderId: id });

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response?.data);
  }
  return (
    <div className='flex flex-col gap-3'>
      <Card>
        <CardHeader className='flex items-baseline justify-between pb-2'>
          <CardTitle className='text-xl md:text-2xl font-bold'>
            Lembretes
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={SetIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant={'link'}
                className='text-blue-600 w-7 p-0 flex items-center'
              >
                <PlusIcon className='w-5 h-5 mb-2px' />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo lembrete</DialogTitle>
                <DialogDescription>Criar um novo lembrete</DialogDescription>
              </DialogHeader>
              <ReminderContent closeDialog={() => SetIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {reminder.length === 0 && (
            <p className=' bg-yellow-100 rounded-md text-gray-500 p-2 text-center'>
              Nenhum lembrete registrado
            </p>
          )}

          <ScrollArea className='h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4'>
            {reminder.map((item) => (
              <article
                key={item.id}
                className='flex flex-wrap justify-between items-center p-2 mb-2 bg-yellow-100 rounded-md'
              >
                {item.description}
                <Button
                  onClick={() => handleDeleteReminder(item.id)}
                  variant={'destructive'}
                >
                  <TrashIcon />
                </Button>
              </article>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
