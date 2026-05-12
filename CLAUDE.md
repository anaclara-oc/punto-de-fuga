# Punto de Fuga — Contexto del proyecto

## Qué es esto
Sitio web del colectivo artístico **Punto de Fuga** (Montevideo, Uruguay).
Danza aérea con arnés + artes escénicas. Fundado en 2022.

## Stack
- HTML + CSS + JavaScript puro
- React 18 cargado via CDN (no hay build tools, no hay npm)
- JSX compilado en el browser con Babel standalone
- Sin frameworks, sin Node.js — abrís index.html y funciona

## Estructura de archivos
```
index.html        ← entrada principal, carga todo
styles.css        ← todos los estilos (1600+ líneas, con CSS variables)
data.js           ← todo el contenido del sitio (window.PDF_DATA)
components.jsx    ← todos los componentes React
app.jsx           ← monta la app, llama a los componentes en orden
assets/
  logo.svg
  hero-video.mp4
  logo-animado.mp4
  acciones/
    grutas.jpg
    mumi.jpg
    29m-pioneras.jpg
```

## Secciones del sitio (en orden)
1. **Nav** — logo + links + menú mobile, aparece al salir del hero
2. **Hero** — video de fondo, título grande, cursor de gravedad
3. **Manifiesto** `#manifiesto` — texto del colectivo + botón dossier
4. **Acciones** `#acciones` — carrusel con filtros por tipo (Obra/Performance/etc)
5. **CuerpoTexto** — sección metodología (tiene placeholder de imagen, pendiente)
6. **Somos** `#somos` — 8 integrantes (sin fotos aún, pendiente)
7. **Contacto** `#contacto` — formulario + datos de contacto
8. **Footer** — copyright + links

## Sistema de diseño
- Fuentes: JetBrains Mono (monospace) + Space Grotesk
- Colores base: --bg, --fg, --accent definidos en :root
- Temas: `data-theme="light"` en body (también: invert, azul, magenta)
- Acento por defecto: azul (#1a1aff)
- Grid decorativo de fondo: `.bg-grid`

## Pendiente / por hacer
- [ ] Fotos de integrantes (8 personas, sección Somos) — vienen de Claude Design
- [ ] Imagen/video para sección CuerpoTexto — actualmente tiene rayas placeholder
- [ ] Formulario real (actualmente hace mailto:) — integrar Formspree
- [x] Botón "Descargar dossier" — conectado a `assets/dossier colectivo_2026-.pdf`
- [ ] Deploy a Vercel o Netlify

## Contacto del colectivo
- Email: puntodefuga.danzaerea@gmail.com
- Instagram: @puntodefuga_danzaerea
- Web base: Montevideo · Uruguay
