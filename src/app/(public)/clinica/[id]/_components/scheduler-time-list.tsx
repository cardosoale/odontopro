'use cliente';

import { Button } from '@/components/ui/button';
import { TimeSlot } from './scheduler';
import { cn } from '@/lib/utils';

interface SchedulerTimeListProps {
  selectedDate: Date;
  selectedTime: string;
  requiredSlot: number;
  blockedTimes: string[];
  availableTimeSlot: TimeSlot[];
  clinicTimes: string[];
  onSelectTime: (time: string) => void;
}

export function SchedulerTimeList({
  availableTimeSlot,
  blockedTimes,
  clinicTimes,
  requiredSlot,
  selectedDate,
  selectedTime,
  onSelectTime,
}: SchedulerTimeListProps) {
  return (
    <div className='grid grid-cols-3 md:grid-cols-5 gap-2'>
      {availableTimeSlot.map((slot) => {
        return (
          <Button
            onClick={() => onSelectTime(slot.time)}
            type='button'
            variant={'outline'}
            key={slot.time}
            className={cn(
              'h-10 select-none',
              selectedTime === slot.time &&
                'border-2 border-emerald-500 text-primary',
            )}
          >
            {slot.time}
          </Button>
        );
      })}
    </div>
  );
}
