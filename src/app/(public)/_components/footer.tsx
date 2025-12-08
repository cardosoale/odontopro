export function Footer() {
  return (
    <footer>
      <p className='py-6 text-center text-sm text-gray-500 md:text-base'>
        Todos os direitos reservados&copy; {new Date().getFullYear()} -
        <span className='hover:text-black duration-300'> @cardoal01</span>
      </p>
    </footer>
  );
}
