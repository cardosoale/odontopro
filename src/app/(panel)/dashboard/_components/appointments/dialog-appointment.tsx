import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AppointmentsWhithService } from './appointments-list';
import { format } from 'date-fns';
import { formatCurrency } from '@/utils/format-currency';

interface DialogAppointmentProps {
  appointment: AppointmentsWhithService | null;
}

export function DialogAppointment({ appointment }: DialogAppointmentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes do agendamento</DialogTitle>
        <DialogDescription>
          Veja todos os detalhes do agendamento
        </DialogDescription>
      </DialogHeader>
      <div className='py-4'>
        {appointment && (
          <article>
            <p>
              <span className='font-semibold'>Data agendada:</span>{' '}
              {new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(new Date(appointment.appointmentDate))}
            </p>
            <p className='mb-2'>
              <span className='font-semibold'>Horario agendado:</span>{' '}
              {appointment.time}
            </p>
            <p>
              <span className='font-semibold'>Nome:</span> {appointment.name}
            </p>
            <p>
              <span className='font-semibold'>Telefone:</span>{' '}
              {appointment.phone}
            </p>
            <p>
              <span className='font-semibold'>Email:</span> {appointment.email}
            </p>

            <section className='bg-gray-150 mt-4 p-2 rounded-md'>
              <p>
                <span className='font-semibold'>Serviço: </span>
                {appointment.service.name}
              </p>
              <p>
                <span className='font-semibold'>Valor: </span>
                {formatCurrency(appointment.service.price / 100)}
              </p>
              <p>
                <span className='font-semibold'>Tempo estimado: </span>
                {appointment.service.duration}min
              </p>
            </section>
          </article>
        )}
      </div>
    </DialogContent>
  );
}
