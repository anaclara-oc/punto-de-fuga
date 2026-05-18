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
    const LOOP_END = 10; // segundos — corta antes de que aparezca el logo final
    const onTime = () => {
      if (v.currentTime >= LOOP_END) {
        v.currentTime = 0;
        v.play();
      }
    };
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
function Somos() {
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
        {D.somos.integrantes.map((nombre, i) => {
          const partes = nombre.split(" ");
          return (
            <div className="integrante" key={nombre}>
              <div className="integrante__num">
                /{String(i + 1).padStart(2, "0")}
              </div>
              <div className="integrante__avatar" />
              <div className="integrante__name">
                <span>{partes[0]}</span>
                <span>{partes.slice(1).join(" ")}</span>
              </div>
            </div>
          );
        })}
      </div>
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

        <div className="contacto__info">
          <div className="contacto__info-row">
            <div className="contacto__info-label">Correo</div>
            <div className="contacto__info-value">
              <a href={`mailto:${D.contacto.email}`}>{D.contacto.email}</a>
            </div>
          </div>
          <div className="contacto__info-row">
            <div className="contacto__info-label">Instagram</div>
            <div className="contacto__info-value">
              <a href={D.contacto.instagramUrl} target="_blank" rel="noreferrer">
                @{D.contacto.instagram}
              </a>
            </div>
          </div>
          <div className="contacto__info-row">
            <div className="contacto__info-label">Base</div>
            <div className="contacto__info-value">{D.contacto.location}</div>
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
