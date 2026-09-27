/**
 * Arranque de la pantalla de entrada del home (components/intro-splash.tsx).
 *
 * La entrada tiene que cubrir la pantalla desde el primer pintado; si se
 * decidiera después (al hidratar), la página se alcanzaría a ver detrás un
 * instante. Por eso un script en el <head> marca <html> antes de pintar:
 *
 * - INTRO_PENDING: primera vez en la sesión. Un velo del color de fondo
 *   (ver globals.css) tapa todo hasta que la entrada se retira.
 * - INTRO_SEEN: ya se vio en esta sesión (recarga o vuelta al home). La
 *   entrada no se muestra.
 */
export const INTRO_STORAGE_KEY = "bomel-intro";
export const INTRO_PENDING_CLASS = "intro-pending";
export const INTRO_SEEN_CLASS = "intro-seen";

export const INTRO_BOOT_SCRIPT = `(function(){try{if(location.pathname!=="/")return;var d=document.documentElement;d.classList.add(sessionStorage.getItem(${JSON.stringify(
  INTRO_STORAGE_KEY
)})?${JSON.stringify(INTRO_SEEN_CLASS)}:${JSON.stringify(
  INTRO_PENDING_CLASS
)})}catch(e){}})()`;
