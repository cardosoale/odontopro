const CURRENCY_FORMATTER = new Intl.NumberFormat('PT-br', {
  currency: 'BRL',
  style: 'currency',
  minimumFractionDigits: 2,
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
