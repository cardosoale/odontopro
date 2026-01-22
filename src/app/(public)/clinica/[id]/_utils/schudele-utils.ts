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

export function slotInThePast(slotTime: string) {
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
