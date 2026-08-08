/**
 * En móvil (<768px) el scroll de la página no lo hace el documento, sino un
 * contenedor interno (<div id="scroll-root"> en app/layout.tsx).
 *
 * Motivo: Chrome/Safari móvil solo colapsan y expanden su barra de
 * direcciones cuando quien se desplaza es el scroller raíz. Al desplazarse
 * dentro de un contenedor anidado, la barra queda congelada en su sitio y el
 * viewport deja de cambiar de alto a mitad del scroll — que era lo que
 * rompía la secuencia del hero.
 *
 * En desktop NO se activa: allí el documento scrollea como siempre y
 * #scroll-root queda como `display: contents` (sin caja propia), así que el
 * layout es idéntico al de antes. Ver el bloque @media en app/globals.css.
 */
export const SCROLL_ROOT_ID = "scroll-root";

/** Debe coincidir con el @media de app/globals.css y con el `md:` de Tailwind. */
const MOBILE_QUERY = "(max-width: 767px)";

/** ¿Está activo el contenedor de scroll? Solo en móvil. */
export function isScrollRootActive(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

/** El contenedor de scroll, o null si el documento es quien scrollea. */
export function getScrollRoot(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  if (!isScrollRootActive()) return null;
  return document.getElementById(SCROLL_ROOT_ID);
}

/** Posición vertical de la página. Reemplazo de `window.scrollY`. */
export function getScrollTop(): number {
  const root = getScrollRoot();
  return root ? root.scrollTop : window.scrollY;
}

/** Desplaza la página a una posición absoluta. */
export function scrollPageTo(options: ScrollToOptions): void {
  const root = getScrollRoot();
  if (root) root.scrollTo(options);
  else window.scrollTo(options);
}

/** Desplaza la página de forma relativa a la posición actual. */
export function scrollPageBy(options: ScrollToOptions): void {
  const root = getScrollRoot();
  if (root) root.scrollBy(options);
  else window.scrollBy(options);
}

/**
 * Suscribe un handler al scroll de la página y lo invoca una vez de inmediato
 * con la posición actual. Devuelve la función de limpieza.
 *
 * Escucha en ambos objetivos porque el scroller activo depende del ancho de
 * pantalla y este puede cambiar en caliente (rotación, redimensionado); el
 * handler siempre recibe la posición del scroller que esté vigente.
 */
export function subscribeScroll(
  handler: (scrollTop: number) => void
): () => void {
  const onScroll = () => handler(getScrollTop());
  onScroll();

  const root =
    typeof document !== "undefined"
      ? document.getElementById(SCROLL_ROOT_ID)
      : null;

  window.addEventListener("scroll", onScroll, { passive: true });
  root?.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    root?.removeEventListener("scroll", onScroll);
  };
}
