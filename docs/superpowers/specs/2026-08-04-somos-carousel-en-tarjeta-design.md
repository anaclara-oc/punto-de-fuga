# Carrusel de fotos en tarjetas de Somos (mover fuera del popup)

## Contexto

Hoy, en la sección Somos (`#somos`), cada tarjeta (`Integrante` en [components.jsx](../../../components.jsx)) muestra una sola foto estática (`fotos[0]`) tanto en desktop como en mobile. Al hacer click en cualquier parte de la tarjeta se abre un popup (`IntegranteModal`) que contiene el carrusel completo de fotos de esa persona (con flechas, swipe) y su bio.

Cada integrante ya tiene entre 3 y 4 fotos cargadas en `datos.js` (array `fotos`). Además, el CSS ya contiene clases sin uso (`.integrante__dots`, `.integrante__dot`, y el hover en `.integrante__avatar`) que sugieren que esta funcionalidad ya estaba pensada para la vista de grilla.

## Objetivo

Mover el carrusel de fotos de cada integrante desde el popup hacia la vista de tarjetas (grilla de Somos), tanto en mobile como en desktop. El popup deja de mostrar fotos y queda solo con texto (nombre + bio).

## Diseño

### 1. Tarjeta `Integrante` (grilla, `components.jsx`)

- El componente pasa a mantener estado propio `idx` (foto actual mostrada).
- `.integrante__avatar` muestra `fotos[idx]` en lugar de siempre `fotos[0]`.
- Si `fotos.length > 1`, se renderizan dots clickeables (reutilizando las clases existentes `.integrante__dots` / `.integrante__dot`) dentro del área de la imagen. Cada dot hace `setIdx(i)` al click.
- Swipe táctil (`onTouchStart` / `onTouchEnd`) sobre el área de imagen para cambiar de foto en mobile, con la misma lógica de umbral (30px) que ya usan `Acciones` y el `IntegranteModal` actual.
- Sin auto-avance: la navegación es 100% manual (dots + swipe). No se agregan flechas prev/next — con 3-4 fotos por persona, los dots alcanzan.
- Si `fotos.length <= 1`, no se renderizan dots (comportamiento actual se mantiene: una sola foto o el placeholder rayado).

### 2. Zonas de click

- El popup deja de abrirse al clickear la tarjeta completa o la imagen. Se abre únicamente al clickear el bloque de nombre + "conocer →" (`.integrante__name`).
- El bloque de imagen (con dots y swipe) queda completamente separado del trigger del popup — no hace falta `stopPropagation` porque no hay superposición de listeners de click.

### 3. `IntegranteModal` (popup, `components.jsx`)

- Se elimina el bloque `.modal__carousel` completo: la imagen, los dots/flechas de navegación, y el estado/lógica asociada (`idx`, `next`, `prev`, `touchX`, `onTouchStart`, `onTouchEnd`).
- Se agrega el nombre de la persona como título, usando la clase `.modal__name` (ya definida en CSS pero sin uso actualmente), ubicado arriba de la bio dentro de `.modal__info`.
- El popup queda: botón cerrar (✕) + nombre + bio. Se mantiene el manejo de Escape para cerrar y el `overflow: hidden` del body mientras está abierto.

### 4. CSS (`styles.css`)

- Se elimina el CSS que queda muerto tras sacar el carrusel del modal: `.modal__carousel`, `.modal__photo`, `.modal__photo-empty`, `.modal__arrow`, `.modal__arrow:hover`, `.modal__arrow--prev`, `.modal__arrow--next`, y el override mobile `.modal__carousel { max-height: none }`.
- `.integrante`: se quita `cursor: pointer` de la tarjeta completa; se agrega a `.integrante__name` (el nuevo trigger del popup).
- `.integrante__avatar`: se revisa que los dots (ya con `position: absolute; bottom: 8px` relativos al contenedor con `position: relative`) se vean bien tanto en la grilla de 4 columnas (desktop) como en la de 2 columnas / apilada (mobile, breakpoints existentes en 880px y 420px). No se esperan cambios grandes de layout — el `.integrante__avatar` ya es `position: relative`, que es lo que necesitan los dots para posicionarse.

## Fuera de alcance

- No se modifica `datos.js` (los arrays `fotos` ya están completos).
- No se agrega auto-avance ni hover-cycle en desktop.
- No se rediseña el ancho/proporciones del modal más allá de lo que resulte naturalmente de sacar la imagen (sigue siendo `width: min(460px, 100%)` con `.modal__info` scrolleable).

## Testing / verificación

- Verificación manual en navegador (`index.html`) en desktop y mobile (viewport angosto):
  - La tarjeta de cada integrante muestra sus fotos, los dots cambian la foto visible, el swipe funciona en mobile.
  - Click en nombre/"conocer →" abre el popup; click en la imagen o en un dot no abre el popup.
  - El popup muestra nombre + bio, sin ninguna imagen ni controles de carrusel.
  - Sin errores de consola.
