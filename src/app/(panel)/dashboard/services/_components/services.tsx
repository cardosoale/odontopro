import { getAllServices } from '../_data-access/get-all-services';

interface ServicesContentProps {
  userId: string;
}

export default async function ServicesContent({
  userId,
}: ServicesContentProps) {
  const services = await getAllServices({ userId: userId });
  console.log(services);

  return (
    <section>
      <h1>Pagina de Serviços</h1>
    </section>
  );
}
