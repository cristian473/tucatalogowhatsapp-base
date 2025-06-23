import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center text-center max-w-md px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ocurrió un error</h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, no pudimos cargar el catálogo. Por favor, intente nuevamente más tarde.
        </p>
        <Link href="/" className="px-6 py-2 bg-nut-700 text-white rounded-md hover:bg-nut-800 transition-colors">
          Reintentar
        </Link>
      </div>
    </div>
  );
}
