import { getCatalogIdByCustomDomain, getCatalogIdBySlug } from '@/lib/db/catalogo';
import { NextRequest, NextResponse } from 'next/server';
import { saveCatalogId } from './utils/cookies';

export async function middleware(request: NextRequest) {
  let hostname = request.headers.get('host');

  if(process.env.NODE_ENV === 'development') {
    hostname='purosoftwarecatalogo.vercel.app';
  }

  if(!process.env.CATALOGO_APP_DOMAIN) {
    throw new Error('CATALOGO_APP_DOMAIN is not defined');
  }

  // Si es dominio personalizado
  if (hostname && !hostname?.includes(process.env.CATALOGO_APP_DOMAIN)) {
    // Buscar el catálogo asociado a este dominio
    const catalogo = await getCatalogIdByCustomDomain(hostname);

    if(!catalogo) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }

    await saveCatalogId(catalogo.id);
    
    // Rewrite a la ruta del catálogo
    return NextResponse.rewrite(
      new URL(`/catalogo/${catalogo.id}${request.nextUrl.pathname}`, request.url)
    );
  }
  
  if(hostname && hostname?.includes(process.env.CATALOGO_APP_DOMAIN)) {
    const slug = hostname.split('.')[0];
    const catalogo = await getCatalogIdBySlug(slug);

    if(!catalogo) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }
    
    await saveCatalogId(catalogo.id);
    
    return NextResponse.rewrite(
      new URL(`/catalogo/${catalogo.id}${request.nextUrl.pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/', '/producto/:idProducto', '/productos'],
};