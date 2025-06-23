import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-nut-800 mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-nut-700 mb-4">Catálogo no encontrado</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, el catálogo que estás buscando no existe o ha sido eliminado.
        </p>
        <Link href="https://tucatalogowhatsapp.com">
          <Button className="bg-nut-700 hover:bg-nut-800">
            Ir a la página principal
          </Button>
        </Link>
      </div>
    </div>
  );
}
