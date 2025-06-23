'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Loading() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirigir a la página principal después de 2 segundos
    const redirectTimeout = setTimeout(() => {
      router.push('/');
    }, 2000);
    
    // Limpiar el timeout si el componente se desmonta
    return () => clearTimeout(redirectTimeout);
  }, [router]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center text-center px-4">
        <div className="animate-spin h-12 w-12 border-4 border-nut-500 border-t-transparent rounded-full mb-4"></div>
        <h2 className="text-xl font-medium text-nut-700">Cargando catálogo...</h2>
        <p className="text-nut-500 mt-2">Por favor espere un momento</p>
        <div className="mt-6 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-nut-500 animate-[progress_2s_ease-in-out]" style={{
            animation: 'progress 2s ease-in-out forwards'
          }}></div>
        </div>
      </div>
    </div>
  );
}

// Añadir esta animación al archivo global.css o definirla inline
const styles = `
@keyframes progress {
  0% { width: 0%; }
  100% { width: 100%; }
}
`;

// Agregar los estilos al documento
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
