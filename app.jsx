// app.jsx — orquesta todo el sitio
const { useEffect } = React;

function App() {
  useReveal();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <>
      <GravityCursor />
      <div className="bg-grid" />
      <Nav />
      <Hero />
      <Manifiesto />
      <Acciones />
      <CuerpoTexto />
      <Somos />
      <NosInteresa />
      <Contacto />
      <Footer />
      <BackToTop />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
