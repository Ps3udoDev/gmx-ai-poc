import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Solo interceptar las llamadas proxy que van hacia el modelo AI de Vercel
  if (request.nextUrl.pathname.startsWith('/api/external/')) {
    const requestHeaders = new Headers(request.headers);
    
    // Inyectar el token de forma segura en el Edge (oculto para el cliente del navegador)
    const token = process.env.GMX_API_KEY;
    if (token) {
        requestHeaders.set('Authorization', `Bearer ${token}`);
    }

    // Retorna la petición permitiendo que next.config.ts ejecute su rewrite con los headers inyectados
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

// Optimizar el Middleware para que sólo se ejecute en los endpoints de Inteligencia Artificial
export const config = {
  matcher: '/api/external/:path*',
};
