import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Función para generar un ID único del visitante
const generateVisitorId = (): string => {
  return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Función para obtener o crear ID del visitante
const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

export const useVisitTracker = (page: string = 'home') => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const visitorId = getVisitorId();
        const sessionKey = `visit_tracked_${page}_${new Date().toDateString()}`;
        
        // Verificar si ya se registró una visita en esta sesión/día
        const alreadyTracked = sessionStorage.getItem(sessionKey);
        if (alreadyTracked) {
          return; // Ya se registró una visita hoy
        }

        // Registrar la visita en la base de datos
        const { error } = await supabase
          .from('site_visits')
          .insert({
            visitor_id: visitorId,
            page: page,
            user_agent: navigator.userAgent
          });

        if (error) {
          console.error('Error registrando visita:', error);
        } else {
          // Marcar como registrada en esta sesión
          sessionStorage.setItem(sessionKey, 'true');
          console.log('Visita registrada exitosamente');
        }
      } catch (error) {
        console.error('Error en trackVisit:', error);
      }
    };

    // Registrar visita después de un pequeño delay para asegurar que la página se cargó
    const timer = setTimeout(trackVisit, 1000);

    return () => clearTimeout(timer);
  }, [page]);
};
