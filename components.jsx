// Componentes React para Punto de Fuga
const { useState, useEffect, useRef } = React;
const D = window.PDF_DATA;

/* ────────────────────────────────────────────────
   Cursor que insinúa gravedad: una línea cae desde
   la parte superior de la pantalla hasta el cursor
─────────────────────────────────────────────────── */
function GravityCursor() {
  const dotRef = useRef(null);
  const lineRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      if (lineRef.current) {
        lineRef.current.style.left = `${x}px`;
        lineRef.current.style.height = `${y}px`;
      }
    };
    const over = (e) => {
      const t = e.target;
      const interactive = t.closest("a, button, .accion, .integrante, input, textarea");
      setHovering(!!interactive);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={lineRef} className="cursor-line" />
      <div ref={dotRef} className={"cursor" + (hovering ? " cursor--hover" : "")} />
    </>
  );
}

/* ─────────────  Nav  ───────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      // Aparece el fondo cuando salimos del hero (~70vh)
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={"nav" + (scrolled ? " nav--scrolled" : "")}>
      <a href="#top" className="nav__brand" aria-label="Punto de Fuga — Inicio">
        <img src="assets/logo.svg" alt="Punto de Fuga" className="nav__logo" />
      </a>
      <div className={"nav__menu" + (menuOpen ? " is-open" : "")}>
        <a href="#acciones" onClick={() => setMenuOpen(false)}>Acciones</a>
        <a href="#somos" onClick={() => setMenuOpen(false)}>Somos</a>
        <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
      </div>
    </nav>
  );
}

/* ─────────────  Hero  ───────────── */
function Hero({ bg }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const LOOP_END = 10;

    const tryPlay = () => {
      const p = v.play();
      if (p !== undefined) p.catch(() => {});
    };

    const onTime = () => {
      if (v.currentTime >= LOOP_END) {
        v.currentTime = 0;
        tryPlay();
      }
    };

    // iOS a veces ignora autoplay aunque tenga muted+playsinline
    tryPlay();
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <section className="hero" id="top" data-bg={bg}>
      <video
        ref={videoRef}
        className="hero__video"
        src="assets/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__top">
          <div className="hero__year">
            EST. 2022<br />
            Montevideo · UY
          </div>
        </div>

        <div className="hero__tag">
          Colectivo artístico ·<br />
          Danza aérea con arnés<br />
          + artes escénicas
        </div>

        <div className="hero__bottom">
          <h1 className="hero__title">
            punto<br />
            de <em>fuga</em>
          </h1>
          <div className="hero__caption">
            Un juego con la gravedad<br />
            y el equilibrio · La creación<br />
            de nuevas poéticas corporales
          </div>
        </div>
      </div>
      <div className="hero__scroll">SCROLL</div>
    </section>
  );
}

/* ─────────────  Manifiesto  ───────────── */
function Manifiesto() {
  return (
    <section className="manifiesto reveal" id="manifiesto">
      <aside className="manifiesto__aside">
        <div className="manifiesto__line"></div>
        <div className="label label--fg">2022 →</div>
      </aside>
      <div className="manifiesto__body">
        <p>
          Un colectivo artístico nacido en <span className="manifiesto__highlight">2022</span> a partir de inquietudes y búsquedas compartidas en torno a la creación escénica.
        </p>
        <p>
          Fusionamos la <em>danza aérea con arnés</em> y las artes escénicas — un juego con la gravedad y el equilibrio; la creación de nuevas poéticas corporales.
        </p>
        <a className="manifiesto__cta" href="assets/dossier colectivo_2026-.pdf" download="dossier-colectivo-2026.pdf">
          Descargar dossier <span>↓</span>
        </a>
      </div>
      <div className="manifiesto__imagen">
        <img src="assets/abrazo.jpg" alt="Punto de Fuga" />
      </div>
    </section>
  );
}

/* ─────────────  Acciones (con carrusel grande)  ───────────── */
function ImgPortada({ accion, className, alt }) {
  const base = `assets/acciones/${accion.carpeta || accion.slug}/portada`;
  const fallbacks = [`${base}.jpg`, `${base}.png`, `${base}.jpeg`, accion.imagen].filter(Boolean);
  const [idx, setIdx] = React.useState(0);
  return (
    <img
      src={fallbacks[idx]}
      alt={alt || ""}
      className={className}
      onError={() => {
        if (idx + 1 < fallbacks.length) setIdx(idx + 1);
      }}
    />
  );
}

function Acciones() {
  const [activeIdx, setActiveIdx] = useState(0);
  const items = D.acciones;

  // Entran al carrusel las acciones con imagen o carpeta propia
  const conImagen = items.filter((a) => a.imagen || a.carpeta);
  const featured = conImagen[Math.min(activeIdx, conImagen.length - 1)] || items[0];

  // Auto-avance cada 10s
  React.useEffect(() => {
    if (conImagen.length < 2) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % conImagen.length);
    }, 10000);
    return () => clearInterval(id);
  }, [conImagen.length]);

  return (
    <section className="acciones reveal" id="acciones">
      <header className="section-head">
        <div>
          <div className="section-head__num">Acciones · 2022 — 2026</div>
          <h2 className="section-head__title">
            Obras, performances<br />e intervenciones
          </h2>
        </div>
        <div className="section-head__meta">
          {D.acciones.length} acciones
        </div>
      </header>

      {/* Carrusel destacado */}
      {featured && (
        <div className="acciones__featured">
          <div className="featured__media">
            {conImagen.map((a, i) => (
              <ImgPortada
                key={a.slug}
                accion={a}
                alt={a.title}
                className={"featured__img" + (i === activeIdx ? " is-active" : "")}
              />
            ))}
            <div className="featured__overlay" />
            <a
              className="featured__caption"
              href={"accion.html?id=" + featured.slug}
            >
              <div className="featured__caption-tipo">{featured.tipo} · {featured.year}</div>
              <div className="featured__caption-title">
                {featured.title.includes("Vol") ? (
                  <>
                    {featured.title.split("Vol")[0]}
                    <em>Vol{featured.title.split("Vol")[1]}</em>
                  </>
                ) : featured.title}
              </div>
              <div className="featured__caption-lugar">{featured.lugar}</div>
            </a>
            {conImagen.length > 1 && (
              <>
                <button
                  className="featured__nav featured__nav--prev"
                  onClick={() => setActiveIdx((i) => (i - 1 + conImagen.length) % conImagen.length)}
                  aria-label="Anterior"
                >←</button>
                <button
                  className="featured__nav featured__nav--next"
                  onClick={() => setActiveIdx((i) => (i + 1) % conImagen.length)}
                  aria-label="Siguiente"
                >→</button>
                <div className="featured__dots">
                  {conImagen.map((_, i) => (
                    <button
                      key={i}
                      className={"featured__dot" + (i === activeIdx ? " is-active" : "")}
                      onClick={() => setActiveIdx(i)}
                      aria-label={`Imagen ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="acciones__list">
        {items.map((a, i) => {
          const imgIdx = conImagen.indexOf(a);
          const isActive = imgIdx >= 0 && imgIdx === activeIdx;
          return (
            <a
              className={"accion" + (isActive ? " is-active" : "")}
              key={a.title + a.year}
              href={"accion.html?id=" + a.slug}
              onMouseEnter={() => { if (imgIdx >= 0) setActiveIdx(imgIdx); }}
            >
              <div className="accion__num">{a.year}</div>
              <div className="accion__thumb" aria-hidden="true">
                {(a.imagen || a.carpeta) ? (
                  <ImgPortada accion={a} />
                ) : (
                  <span className="accion__thumb-placeholder">[ s/foto ]</span>
                )}
              </div>
              <div className="accion__body">
                <div className="accion__title">
                  {a.title.includes("Vol") ? (
                    <>
                      {a.title.split("Vol")[0]}
                      <em>Vol{a.title.split("Vol")[1]}</em>
                    </>
                  ) : (
                    a.title
                  )}
                </div>
                <span className="accion__title-sub">— {a.sub}</span>
              </div>
              <div className="accion__lugar">{a.lugar}</div>
              <div className="accion__end">
                <div className="accion__arrow">→</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────  Cuerpo + texto  ───────────── */
function CuerpoTexto() {
  return (
    <section className="cuerpo-texto reveal">
      <div className="cuerpo-texto__media">
        <div className="cuerpo-texto__media-stripes" />
      </div>
      <div className="cuerpo-texto__text">
        <h3>Metodología — Del cuerpo al texto</h3>
        <p>
          Concebimos la obra como organismo vivo. Trabajamos con estructuras compositivas que enmarcan la creación, pero también nos abrimos a la improvisación.
        </p>
        <p>
          El arnés nos permite <em>desafiar la gravedad</em> y expandir las posibilidades de movimiento. Habitar el espacio de manera no convencional.
        </p>
      </div>
    </section>
  );
}

/* ─────────────  Somos  ───────────── */
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
              <div className="modal__dots">
                {fotos.map((_, j) => (
                  <span key={j} className={"modal__dot" + (j === idx ? " is-active" : "")} />
                ))}
              </div>
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
        <span className="integrante__hint">ver</span>
      </div>
    </div>
  );
}

function Somos() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="somos reveal" id="somos">
      <div className="section-head" style={{ padding: 0, border: "none" }}>
        <div>
          <div className="section-head__num">El colectivo</div>
        </div>
        <div className="section-head__meta">
          {D.somos.integrantes.length} integrantes
        </div>
      </div>
      <h2 className="somos__title">somos.</h2>

      <div className="somos__intro">
        <p>{D.somos.intro}</p>
      </div>

      <div className="integrantes">
        {D.somos.integrantes.map((item) => (
          <Integrante key={item.nombre ?? item} item={item} onOpen={() => setSelected(item)} />
        ))}
      </div>
      {selected && <IntegranteModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

/* ─────────────  Nos Interesa  ───────────── */
function NosInteresa() {
  return (
    <section className="nos-interesa reveal" id="nos-interesa">
      <div className="section-head" style={{ padding: 0, border: "none" }}>
        <div className="section-head__num">Nos interesa</div>
      </div>
      <h2 className="nos-interesa__title">nos interesa.</h2>
      <ul className="nos-interesa__lista">
        {D.nosInteresa.map((item, i) => (
          <li className="nos-interesa__item" key={i}>
            <strong>{item.lead}</strong>{" "}{item.cuerpo}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─────────────  Contacto  ───────────── */
function Contacto() {
  const [sent, setSent] = useState(false);
  const handle = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent("[Web] " + (data.get("asunto") || "Contacto"));
    const body = encodeURIComponent(
      `De: ${data.get("nombre")} <${data.get("email")}>\n\n${data.get("mensaje")}`
    );
    window.location.href = `mailto:${D.contacto.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="contacto reveal" id="contacto">
      <div className="contacto__grid">
        <div>
          <div className="label" style={{ marginBottom: 24 }}>Contacto</div>
          <h2 className="contacto__title">
            Escribinos.<br />
            <em>Programemos.</em>
          </h2>
        </div>

        <div className="contacto__derecha">
          <svg className="contacto__logo-anim" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.81 418.14" overflow="visible" aria-label="Punto de Fuga">
            <style>{`
              @keyframes _fadeUp {
                from { opacity: 0; transform: translateY(8px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              @keyframes _fadeUpBig {
                from { opacity: 0; transform: translateY(18px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              @keyframes _scaleDot {
                from { transform: scale(0); opacity: 0; }
                to   { transform: scale(1); opacity: 1; }
              }
              @keyframes _pulse {
                0%,100% { transform: scale(1); }
                50%      { transform: scale(1.35); }
              }
              #clp { animation: _fadeUp .55s cubic-bezier(.22,1,.36,1) both 0s; }
              #clu { animation: _fadeUp .55s cubic-bezier(.22,1,.36,1) both .08s; }
              #cln { animation: _fadeUp .55s cubic-bezier(.22,1,.36,1) both .16s; }
              #clt { animation: _fadeUp .55s cubic-bezier(.22,1,.36,1) both .24s; }
              #clo { animation: _fadeUp .55s cubic-bezier(.22,1,.36,1) both .32s; }
              #cdot { animation: _scaleDot .4s cubic-bezier(.34,1.56,.64,1) both .48s, _pulse 2.8s ease-in-out infinite 1.4s; transform-origin:center; transform-box:fill-box; }
              #cld { animation: _fadeUp .5s cubic-bezier(.22,1,.36,1) both .58s; }
              #cle { animation: _fadeUp .5s cubic-bezier(.22,1,.36,1) both .66s; }
              #clF { animation: _fadeUpBig .7s cubic-bezier(.22,1,.36,1) both .80s; }
              #clU { animation: _fadeUpBig .7s cubic-bezier(.22,1,.36,1) both .90s; }
              #clG { animation: _fadeUpBig .7s cubic-bezier(.22,1,.36,1) both 1.0s; }
              #clA { animation: _fadeUpBig .7s cubic-bezier(.22,1,.36,1) both 1.1s; }
            `}</style>
            <g id="clF"><path d="M67.91,167.16h66v-4.91h-66v-70.2h91.04v-4.91h-93.49c-1.47,0-2.45.99-2.45,2.45v152.67h4.91v-75.11Z" fill="#000" strokeWidth="0"/></g>
            <g id="clU"><path d="M253.68,242.26c30.22,0,54.8-22.13,54.8-49.34l.23-103.08.25-2.47h-5.38v105.56c0,24.5-22.38,44.43-49.89,44.43s-49.89-19.93-49.89-44.43l.23-103.08.25-2.47h-5.38v105.56c0,27.21,24.58,49.34,54.8,49.34Z" fill="#000" strokeWidth="0"/></g>
            <g id="clG"><path d="M188.36,338.13h-68v4.91h65.55c-.09,38.07-29.05,70.2-63.32,70.2s-63.78-32.59-63.78-72.65,28.61-72.65,63.78-72.65c.19,0,.37,0,.56,0,24.79,0,46.24,15.72,53.91,30.64l.73,1.22h5.39l-1.71-3.67c-8.27-16.11-31.47-33.1-58.32-33.1-.19,0-.37,0-.56,0-37.87,0-68.69,34.79-68.69,77.56s30.81,77.56,68.69,77.56,68.23-34.79,68.23-77.56c0-1.47-.99-2.45-2.45-2.45Z" fill="#000" strokeWidth="0"/></g>
            <g id="clA"><path d="M345.34,414.71l-66-150.21c-.34-.8-1.19-1.3-2.21-1.3s-1.87.5-2.21,1.3l-66.01,150.22-1.47,3.43h5.4l.49-1.48,63.79-145.06,63.79,145.05.5,1.49h5.4l-1.47-3.44Z" fill="#000" strokeWidth="0"/></g>
            <g id="cld"><path d="M263.93.93v62.53h-6.85l-.76-6.18c-1.47,2.26-3.3,4.02-5.5,5.29s-4.65,1.9-7.36,1.9c-5.3,0-9.44-2.09-12.4-6.26-2.96-4.17-4.44-9.79-4.44-16.84,0-4.57.7-8.63,2.11-12.19s3.44-6.33,6.09-8.34c2.65-2,5.75-3,9.31-3,4.57,0,8.57,1.83,12.02,5.5V0l7.79.93ZM251.24,56.65c1.69-1.1,3.33-2.75,4.91-4.95v-21.83c-1.47-1.92-3.03-3.37-4.7-4.36-1.66-.99-3.54-1.48-5.63-1.48-3.44,0-6.11,1.44-8,4.32-1.89,2.88-2.83,7.16-2.83,12.86s.87,10.04,2.62,12.86c1.75,2.82,4.26,4.23,7.53,4.23,2.37,0,4.4-.55,6.09-1.65Z" fill="#000" strokeWidth="0"/></g>
            <g id="cle"><path d="M308.36,43.83h-28.43c.34,4.91,1.58,8.52,3.72,10.83,2.14,2.31,4.91,3.47,8.29,3.47,2.14,0,4.12-.31,5.92-.93,1.8-.62,3.69-1.61,5.67-2.96l3.38,4.65c-4.74,3.72-9.93,5.59-15.57,5.59-6.21,0-11.04-2.03-14.51-6.09-3.47-4.06-5.2-9.65-5.2-16.76,0-4.62.75-8.73,2.24-12.31,1.49-3.58,3.64-6.39,6.43-8.42,2.79-2.03,6.08-3.05,9.86-3.05,5.92,0,10.46,1.95,13.62,5.84,3.16,3.89,4.74,9.28,4.74,16.16,0,1.3-.06,2.62-.17,3.98ZM300.83,37.57c0-4.4-.87-7.76-2.62-10.07-1.75-2.31-4.37-3.47-7.87-3.47-6.38,0-9.85,4.68-10.41,14.05h20.9v-.51Z" fill="#000" strokeWidth="0"/></g>
            <circle id="cdot" cx="13.78" cy="228.31" r="13.78" fill="var(--accent)" strokeWidth="0"/>
            <g id="clu"><path d="M69.54,63.91c6.31,0,11.26-3.01,14.85-9.03l.26,8.08h4.34V17.53h-5.04v32.91c-3.59,6.2-8.02,9.29-13.29,9.29-3.01,0-5.25-.82-6.73-2.47-1.48-1.65-2.21-4.24-2.21-7.77v-31.96h-5.04v32.48c0,4.46,1.11,7.89,3.34,10.29,2.23,2.4,5.4,3.6,9.51,3.6Z" fill="#000" strokeWidth="0"/></g>
            <g id="cln"><path d="M107.14,30.04c2.03-3.07,4.15-5.4,6.38-6.99,2.23-1.59,4.79-2.39,7.69-2.39s4.98.84,6.43,2.52c1.45,1.68,2.17,4.34,2.17,7.99v31.78h5.04V30.47c0-4.4-1.08-7.82-3.26-10.25-2.17-2.43-5.31-3.65-9.42-3.65-6.08,0-11.17,2.9-15.28,8.68l-.43-7.73h-4.34v45.42h5.04V30.04Z" fill="#000" strokeWidth="0"/></g>
            <g id="clt"><path d="M159.24,59.57c-2.26,0-3.94-.65-5.04-1.95-1.1-1.3-1.65-3.28-1.65-5.95v-30.05h11.12l.61-4.08h-11.72V6.07l-5.04.61v10.86h-7.64v4.08h7.64v30.31c0,3.88.98,6.85,2.95,8.9,1.97,2.06,4.69,3.08,8.16,3.08s6.66-.95,9.55-2.87l-2-3.56c-2.26,1.39-4.57,2.08-6.95,2.08Z" fill="#000" strokeWidth="0"/></g>
            <g id="clo"><path d="M203.91,22.79c-3.39-4.14-8.09-6.21-14.11-6.21-3.94,0-7.35.96-10.25,2.87-2.9,1.91-5.12,4.66-6.69,8.25-1.56,3.59-2.34,7.79-2.34,12.59,0,7.35,1.69,13.13,5.08,17.32,3.39,4.2,8.09,6.3,14.11,6.3s10.67-2.13,14.11-6.38c3.44-4.26,5.17-10.06,5.17-17.41s-1.69-13.18-5.08-17.32ZM200,54.7c-2.46,3.3-5.89,4.95-10.29,4.95s-7.8-1.65-10.2-4.95c-2.4-3.3-3.6-8.1-3.6-14.42s1.22-11.2,3.65-14.5c2.43-3.3,5.85-4.95,10.25-4.95s7.89,1.64,10.29,4.91c2.4,3.27,3.6,8.06,3.6,14.37s-1.23,11.29-3.69,14.59Z" fill="#000" strokeWidth="0"/></g>
            <g id="clp"><path d="M17,57.66c1.5,1.91,3.36,3.43,5.56,4.56,2.2,1.13,4.66,1.69,7.38,1.69,5.56,0,9.83-2.16,12.81-6.47,2.98-4.31,4.47-10.12,4.47-17.41s-1.38-13.24-4.13-17.32c-2.75-4.08-6.88-6.12-12.37-6.12-2.9,0-5.53.67-7.9,2-2.37,1.33-4.14,2.85-5.82,5.22v-6.27h-5.04l-.2,211.96,143.33,179.52,4.03-3.28L17,227.74V57.66ZM17,28.56c1.79-2.43,3.69-4.34,5.69-5.73,2-1.39,4.36-2.08,7.08-2.08,8.05,0,12.07,6.43,12.07,19.28,0,6.48-1.1,11.38-3.3,14.68-2.2,3.3-5.38,4.95-9.55,4.95-2.49,0-4.75-.61-6.77-1.82-2.03-1.22-3.76-2.92-5.21-5.12v-24.14Z" fill="#000" strokeWidth="0"/></g>
          </svg>
          <div className="contacto__info">
          <div className="contacto__info-row">
            <div className="contacto__info-label">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" style={{marginRight:"6px",verticalAlign:"middle"}}>
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
              </svg>
              Correo
            </div>
            <div className="contacto__info-value">
              <a href={`mailto:${D.contacto.email}`}>{D.contacto.email}</a>
            </div>
          </div>
          <div className="contacto__info-row">
            <div className="contacto__info-label">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" style={{marginRight:"6px",verticalAlign:"middle"}}>
                <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </div>
            <div className="contacto__info-value">
              <a href={D.contacto.instagramUrl} target="_blank" rel="noreferrer">
                @{D.contacto.instagram}
              </a>
            </div>
          </div>
          <div className="contacto__info-row">
            <div className="contacto__info-label">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" style={{marginRight:"6px",verticalAlign:"middle"}}>
                <path d="M12 21c-4-4.5-8-8-8-11a8 8 0 1 1 16 0c0 3-4 6.5-8 11z"/><circle cx="12" cy="10" r="2.5"/>
              </svg>
              Base
            </div>
            <div className="contacto__info-value">{D.contacto.location}</div>
          </div>
          </div>
        </div>
      </div>

      <form className="form" onSubmit={handle}>
        <div className="form__field">
          <label className="form__label">Nombre</label>
          <input className="form__input" name="nombre" required />
        </div>
        <div className="form__field">
          <label className="form__label">Correo</label>
          <input className="form__input" name="email" type="email" required />
        </div>
        <div className="form__field form__field--full">
          <label className="form__label">Asunto</label>
          <input
            className="form__input"
            name="asunto"
            placeholder="Programación · Taller · Colaboración · ..."
          />
        </div>
        <div className="form__field form__field--full">
          <label className="form__label">Mensaje</label>
          <textarea className="form__textarea" name="mensaje" rows={4} required />
        </div>
        <button type="submit" className="form__submit">
          {sent ? "Enviado · gracias" : "Enviar mensaje"}
          <span className="form__submit-arrow">→</span>
        </button>
      </form>
    </section>
  );
}

/* ─────────────  Footer  ───────────── */
function Footer() {
  return (
    <footer className="footer">
      <div>© 2018–2026 · Colectivo Punto de Fuga</div>
      <div>Montevideo · Uruguay</div>
      <div>
        <a href={D.contacto.instagramUrl}>IG ↗</a>
        {" · "}
        <a href={`mailto:${D.contacto.email}`}>Mail ↗</a>
      </div>
    </footer>
  );
}

/* ─────────────  Reveal observer  ───────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

Object.assign(window, {
  GravityCursor, Nav, Hero, Manifiesto, Acciones, CuerpoTexto,
  Somos, Contacto, Footer, useReveal,
});
