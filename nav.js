/* ============================================================
   NAV — compartido entre index.html y accion.html
   Única fuente de verdad para el header. Ambas páginas cargan
   este mismo archivo; no duplicar el markup del nav a mano.

   Uso:
   - Agregar <div id="nav-mount"></div> como primer hijo de <body>.
   - Cargar nav.css en <head> y nav.js antes de </body>.
   - En páginas que no son el index (ej. accion.html), definir
     antes de cargar este script: <script>window.NAV_STATIC = true;</script>
     — el nav queda fijo en su estado "con fondo" (no hay hero de
     video detrás para justificar el estado transparente inicial).
   ============================================================ */

(function () {
  const mount = document.getElementById("nav-mount");
  if (!mount) return;

  const isStatic = window.NAV_STATIC === true;
  const base = isStatic ? "index.html" : "";
  const logoHref = isStatic ? "index.html" : "#top";

  mount.className = "nav" + (isStatic ? " nav--scrolled" : "");
  mount.innerHTML =
    '<a href="' + logoHref + '" class="nav__brand" aria-label="Punto de Fuga — Inicio">' +
      '<img src="assets/logo.svg" alt="Punto de Fuga" class="nav__logo" />' +
    '</a>' +
    '<div class="nav__menu">' +
      '<a href="' + base + '#acciones">Acciones</a>' +
      '<a href="' + base + '#somos">Somos</a>' +
      '<a href="' + base + '#nos-interesa">Intereses</a>' +
      '<a href="' + base + '#contacto">Contacto</a>' +
    '</div>';

  if (!isStatic) {
    const onScroll = () => {
      mount.classList.toggle("nav--scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
