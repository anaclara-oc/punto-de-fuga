# Carrusel de fotos en tarjetas de Somos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mover el carrusel de fotos de cada integrante de Somos, desde el popup hacia la tarjeta en la grilla (mobile y desktop), dejando el popup solo con nombre + bio.

**Architecture:** Cambios acotados a dos componentes en `components.jsx` (`Integrante`, `IntegranteModal`) y a `styles.css`. No hay build ni test runner en este proyecto (HTML/CSS/JS puro, React vía CDN, JSX compilado en el browser con Babel standalone) — la verificación de cada tarea es manual, abriendo `index.html` en el navegador.

**Tech Stack:** HTML + CSS + JavaScript, React 18 (CDN), JSX vía Babel standalone. Sin Node, sin npm, sin test framework.

## Global Constraints

- No modificar `datos.js` — los arrays `fotos` por integrante ya están completos.
- No agregar auto-avance ni hover-cycle en desktop — navegación 100% manual (dots + swipe).
- No agregar flechas prev/next en la tarjeta — solo dots (con 3-4 fotos alcanza).
- El popup no debe mostrar imágenes ni controles de carrusel — solo nombre + bio.
- Mantener el manejo de Escape y `overflow: hidden` del body en el popup.
- Verificación manual en navegador (no hay `npm test` ni equivalente en este repo).

---

### Task 1: Carrusel manual en la tarjeta `Integrante`

**Files:**
- Modify: `components.jsx:395-412` (función `Integrante`)

**Interfaces:**
- Consumes: `item` (objeto `{ nombre, fotos, bio }` o string, igual que hoy), `onOpen` (callback que abre el popup — pasado por `Somos`, sin cambios de firma).
- Produces: nada consumido por otras tareas — `Integrante` sigue siendo una hoja del árbol de componentes.

- [ ] **Step 1: Reescribir `Integrante` con estado de foto, dots y swipe**

Reemplazar el bloque actual (`components.jsx:395-412`):

```jsx
function Integrante({ item, onOpen }) {
  const nombre = item.nombre ?? item;
  const fotos = item.fotos ?? (item.foto ? [item.foto] : []);
  const partes = nombre.split(" ");

  return (
    <div className="integrante" onClick={onOpen}>
      <div className="integrante__avatar">
        {fotos[0] && <img src={fotos[0]} alt={nombre} />}
      </div>
      <div className="integrante__name">
        <span>{partes[0]}</span>
        <span>{partes.slice(1).join(" ")}</span>
        <span className="integrante__hint">conocer →</span>
      </div>
    </div>
  );
}
```

por:

```jsx
function Integrante({ item, onOpen }) {
  const nombre = item.nombre ?? item;
  const fotos = item.fotos ?? (item.foto ? [item.foto] : []);
  const partes = nombre.split(" ");
  const [idx, setIdx] = useState(0);
  const touchX = React.useRef(null);

  const next = () => setIdx(i => (i + 1) % fotos.length);
  const prev = () => setIdx(i => (i - 1 + fotos.length) % fotos.length);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null || fotos.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 30) dx < 0 ? next() : prev();
    touchX.current = null;
  };

  return (
    <div className="integrante">
      <div
        className="integrante__avatar"
        onTouchStart={fotos.length > 1 ? onTouchStart : undefined}
        onTouchEnd={fotos.length > 1 ? onTouchEnd : undefined}
      >
        {fotos[idx] && <img src={fotos[idx]} alt={nombre} />}
        {fotos.length > 1 && (
          <div className="integrante__dots">
            {fotos.map((_, i) => (
              <button
                key={i}
                className={"integrante__dot" + (i === idx ? " is-active" : "")}
                onClick={() => setIdx(i)}
                aria-label={`Foto ${i + 1} de ${nombre}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="integrante__name" onClick={onOpen}>
        <span>{partes[0]}</span>
        <span>{partes.slice(1).join(" ")}</span>
        <span className="integrante__hint">conocer →</span>
      </div>
    </div>
  );
}
```

Notar los cambios respecto al original:
- El `onClick={onOpen}` se movió del `<div className="integrante">` externo al `<div className="integrante__name">`.
- La imagen usa `fotos[idx]` en vez de `fotos[0]`.
- Se agregaron `onTouchStart`/`onTouchEnd` sobre `.integrante__avatar` (mismo umbral de 30px que usan `Acciones` y el modal actual).
- Se agregaron los dots dentro de `.integrante__avatar`, clickeables, usando las clases `.integrante__dots`/`.integrante__dot` que ya existen en `styles.css` sin uso previo.

- [ ] **Step 2: Verificación manual en navegador**

Abrir `index.html` en el navegador (doble click o `start index.html` / servidor estático simple) y en la sección Somos:
- Confirmar que cada tarjeta muestra dots cuando la persona tiene más de una foto.
- Click en un dot cambia la foto mostrada en esa tarjeta (y no en las demás).
- Click en el nombre o en "conocer →" sigue abriendo el popup (aunque el popup todavía tenga el carrusel viejo — eso se corrige en la Task 2).
- Click en la imagen (fuera de un dot) ya NO abre el popup.
- En un viewport angosto (mobile, devtools responsive mode), swipe horizontal sobre la imagen cambia de foto.
- No hay errores en la consola del navegador.

- [ ] **Step 3: Commit**

```bash
git add components.jsx
git commit -m "Mover carrusel manual de fotos de Somos a la tarjeta de la grilla"
```

---

### Task 2: Popup solo con texto (nombre + bio)

**Files:**
- Modify: `components.jsx:334-393` (función `IntegranteModal`)

**Interfaces:**
- Consumes: `item` (mismo objeto que Task 1), `onClose` (callback, sin cambios de firma).
- Produces: nada consumido por otras tareas.

- [ ] **Step 1: Quitar el carrusel del modal y agregar el nombre**

Reemplazar el bloque actual (`components.jsx:334-393`):

```jsx
function IntegranteModal({ item, onClose }) {
  const nombre = item.nombre ?? item;
  const fotos = item.fotos ?? (item.foto ? [item.foto] : []);
  const bio = item.bio ?? null;
  const [idx, setIdx] = useState(0);
  const touchX = React.useRef(null);

  const next = () => setIdx(i => (i + 1) % fotos.length);
  const prev = () => setIdx(i => (i - 1 + fotos.length) % fotos.length);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null || fotos.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 30) dx < 0 ? next() : prev();
    touchX.current = null;
  };

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>

        <div
          className="modal__carousel"
          onTouchStart={fotos.length > 1 ? onTouchStart : undefined}
          onTouchEnd={fotos.length > 1 ? onTouchEnd : undefined}
        >
          {fotos[idx]
            ? <img src={fotos[idx]} alt={nombre} className="modal__photo" />
            : <div className="modal__photo-empty" />
          }
          {fotos.length > 1 && (
            <>
              <button className="modal__arrow modal__arrow--prev" onClick={prev}>←</button>
              <button className="modal__arrow modal__arrow--next" onClick={next}>→</button>
            </>
          )}
        </div>

        {bio && (
          <div className="modal__info">
            <p className="modal__bio">{bio}</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
```

por:

```jsx
function IntegranteModal({ item, onClose }) {
  const nombre = item.nombre ?? item;
  const bio = item.bio ?? null;

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>

        <div className="modal__info">
          <h3 className="modal__name">{nombre}</h3>
          {bio && <p className="modal__bio">{bio}</p>}
        </div>
      </div>
    </div>,
    document.body
  );
}
```

- [ ] **Step 2: Verificación manual en navegador**

Con `index.html` abierto, en la sección Somos:
- Click en el nombre/"conocer →" de una tarjeta abre el popup mostrando el nombre como título y la bio debajo, sin ninguna imagen ni dots/flechas.
- El botón ✕ y la tecla Escape cierran el popup.
- Con el popup abierto, el scroll del body queda bloqueado; al cerrar, se restaura.
- No hay errores en la consola del navegador.

- [ ] **Step 3: Commit**

```bash
git add components.jsx
git commit -m "Simplificar popup de Somos a solo nombre y bio"
```

---

### Task 3: Limpieza de CSS muerto y ajuste de estilos

**Files:**
- Modify: `styles.css:1090-1231` (bloque `.integrante`)
- Modify: `styles.css:1843-1845` (override mobile `.modal__carousel`)
- Modify: `styles.css:1916-2060` (bloque modal, sección carrusel)

**Interfaces:**
- Consumes: clases `.integrante`, `.integrante__avatar`, `.integrante__name`, `.integrante__dots`, `.integrante__dot`, `.modal`, `.modal__info`, `.modal__name`, `.modal__bio` usadas por Task 1 y Task 2.
- Produces: nada consumido por otras tareas — es la última.

- [ ] **Step 1: Mover el `cursor: pointer` de la tarjeta al nombre**

En `styles.css`, dentro del bloque `.integrante` (alrededor de la línea 1090):

```css
.integrante {
  border-right: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
  padding: 24px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

Quitar `cursor: pointer;` de ahí, y agregarlo a `.integrante__name` (alrededor de la línea 1122):

```css
.integrante__name {
  font-family: var(--display);
  font-weight: 300;
  font-size: clamp(20px, 1.8vw, 26px);
  letter-spacing: -0.02em;
  line-height: 1.05;
  cursor: pointer;
}
```

- [ ] **Step 2: Quitar el override mobile del carrusel del modal**

En `styles.css`, dentro de la media query `@media (max-width: 768px)` (alrededor de la línea 1839-1845), eliminar:

```css
  /* Modal integrante */
  .modal-overlay {
    padding: 24px 20px;
  }
  .modal__carousel {
    max-height: none;
  }
```

y dejar solo:

```css
  /* Modal integrante */
  .modal-overlay {
    padding: 24px 20px;
  }
```

- [ ] **Step 3: Eliminar el CSS muerto del carrusel del modal**

En `styles.css`, en el bloque `/* ───────────── Modal integrante ───────────── */` (alrededor de la línea 1916 en adelante), eliminar por completo las reglas:
- `.modal__carousel`
- `.modal__photo`
- `.modal__photo-empty`
- `.modal__arrow`
- `.modal__arrow:hover`
- `.modal__arrow--prev`
- `.modal__arrow--next`

Dejar intactas `.modal-overlay`, `.modal`, `.modal__close`, `.modal__close:hover`, `.modal__info` (y su scrollbar), `.modal__name`, `.modal__bio`.

- [ ] **Step 4: Verificación visual final en desktop y mobile**

Con `index.html` abierto:
- Desktop (grilla de 4 columnas): las tarjetas muestran la imagen con dots centrados abajo, el cursor cambia a pointer solo sobre el nombre/"conocer →", no sobre la imagen.
- Viewport ~880px (grilla de 2 columnas) y viewport angosto tipo mobile (apilado, `styles.css:1897-1913`): los dots se siguen viendo dentro de la imagen, sin desbordarse ni superponerse mal con el nombre.
- El popup se ve bien proporcionado sin la imagen (solo nombre + bio scrolleable si el texto es largo).
- Recorrer las 8 tarjetas de Somos y confirmar que ninguna quedó rota (placeholder rayado sigue funcionando para quien no tenga fotos, si las hubiera).
- No hay errores en la consola del navegador.

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "Limpiar CSS del carrusel del modal de Somos y ajustar cursor de la tarjeta"
```
