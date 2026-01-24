/**
 * Verifica se o dia é o dia atual(hoje)
 */

export function isToday(date: Date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Verifica se determinado slot(horário), está no passado.
 */

export function isSlotInThePast(slotTime: string) {
  // separar(split) horas e minutos
  const [slotHours, slotMinutes] = slotTime.split(':').map(Number);

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  if (slotHours < currentHours) return true;
  else if (slotHours === currentHours && slotMinutes <= currentMinutes)
    return true;

  return false;
}

export function isSlotSequenceAvailable(
  startSlot: string,
  requiredSlots: number,
  allSlots: string[],
  blockedSlots: string[],
) {
  const startIndex = allSlots.indexOf(startSlot);

  if (startIndex === -1 || startIndex + requiredSlots > allSlots.length)
    return false;

  for (let i = startIndex; i < startIndex + requiredSlots; i++) {
    const slotTime = allSlots[i];

    if (blockedSlots.includes(slotTime)) return false;
  }

  return true;
}
