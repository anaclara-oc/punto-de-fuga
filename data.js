// Datos del colectivo Punto de Fuga

window.PDF_DATA = {
  manifiesto: [
    "Un colectivo artístico nacido en 2022 a partir de inquietudes y búsquedas compartidas en torno a la creación escénica.",
    "Fusionamos la danza aérea con arnés y las artes escénicas — un juego con la gravedad y el equilibrio; la creación de nuevas poéticas corporales.",
  ],

  somos: {
    intro: "Provenimos de distintas disciplinas y formaciones. Aunque cada una aporta un enfoque singular, la mayoría somos mujeres, por lo que la identidad y la vivencia del género emergen como un hilo conductor en nuestras experiencias.",
    integrantes: [
      { nombre: "Elisa Acosta" },
      { nombre: "Agustina Leiva" },
      { nombre: "Florencia Mazzucco", foto: "assets/somos/flo-100.jpg" },
      { nombre: "Leticia Moreno" },
      { nombre: "Anaclara Oyenart", foto: "assets/somos/Anaclara.jpg" },
      { nombre: "Stella Peña" },
      { nombre: "Agustina Rodríguez" },
      { nombre: "Diego Ruella" },
    ],
  },

  cuerpo: [
    "Concebimos la obra como organismo vivo. Trabajamos con estructuras compositivas que enmarcan la creación, pero también nos abrimos a la improvisación, resaltando la tensión entre la ficción y la subjetividad de cada una.",
    "El arnés nos permite desafiar la gravedad y expandir nuestras posibilidades de movimiento. Habitar el espacio de manera no convencional.",
  ],

  acciones: [
    {
      slug: "tramas-colectivas",
      year: "2026",
      title: "Tramas Colectivas",
      sub: "Proyecto Fortalecimiento de las Artes",
      tipo: "Proyecto",
      lugar: "Plaza Liber seregni / Espacio modelo / Balcón del Cerro / Plaza Feminnista Las Pioneras",
      destacado: true,
      imagen: "assets/acciones/tramas-colectivas/portada.jpg",
      descripcion: "Tramas Colectivas es un proyecto de fortalecimiento de las artes escénicas que busca tejer redes entre creadoras, espacios y comunidades. Una apuesta colectiva por la sostenibilidad de las prácticas artísticas independientes en Uruguay.",
      galeria: [
        {
          seccion: "Plaza Liber Seregni",
          fotos: [],
        },
        {
          seccion: "Espacio Modelo",
          fotos: [],
        },
        {
          seccion: "Balcón del Cerro",
          fotos: Array.from({ length: 23 }, (_, i) => `assets/acciones/tramas-colectivas/balcon-del-cerro/balcon_img-${i + 1}.jpg`),
        },
        {
          seccion: "Plaza Feminista Las Pioneras",
          fotos: [],
        },
      ],
    },
    {
      slug: "fugas-al-este",
      year: "2026",
      title: "Fugas al este",
      sub: "Intervención",
      tipo: "Intervención",
      lugar: "Grutas de Punta Ballena - Bosque y arroyo",
      imagen: "assets/acciones/fugas-al-este/fugas-al-este_img-1.jpg",
      descripcion: "Una intervención de danza aérea con arnés en paisajes naturales del este uruguayo. Cuerpos suspendidos en el bosque, el arroyo y las grutas de Punta Ballena — un diálogo entre la gravedad, el territorio y el movimiento.",
      galeria: [
        {
          seccion: "Bosque y Arroyo",
          fotos: [],
        },
        {
          seccion: "Grutas y Punta Ballena",
          fotos: [],
        },
      ],
    },
    {
      slug: "capas",
      year: "2025",
      title: "Capas",
      sub: "Performance multidisciplinaria",
      tipo: "Performance",
      lugar: "Espacio MUMI · Noche de los Museos",
      imagen: "assets/acciones/capas/mumi.jpg",
      descripcion: "Performance multidisciplinaria presentada en la Noche de los Museos en el Espacio MUMI. Una exploración de las capas del cuerpo en movimiento — lo visible y lo invisible, lo que se muestra y lo que se oculta — a través de la danza aérea y las artes escénicas.",
      galeria: [
        {
          seccion: "Registro",
          fotos: Array.from({ length: 10 }, (_, i) => `assets/acciones/capas/capas_img-${i + 1}.jpg`),
        },
      ],
      graficas: [
        "assets/acciones/capas/graficas/capas_flyer-mumi.jpg",
        "assets/acciones/capas/graficas/capas_story-hoy.jpg",
        "assets/acciones/capas/graficas/capas_posteo-3a.jpg",
        "assets/acciones/capas/graficas/capas_posteo-3b.jpg",
        "assets/acciones/capas/graficas/capas_posteo-4.jpg",
        "assets/acciones/capas/graficas/capas_posteo-5.jpg",
        "assets/acciones/capas/graficas/capas_posteo-6.jpg",
      ],
      videos: [
        { label: "Spot", src: "assets/acciones/capas/graficas/capas_spot-1.mp4" },
        { label: "Video", src: "assets/acciones/capas/graficas/capas_video-1.mp4" },
      ],
    },
    {
      slug: "artivismo-por-palestina",
      year: "2025",
      title: "Artivismo por Palestina",
      sub: "Activación escénica · Varieté Artivismo",
      tipo: "Intervención",
      lugar: "Plaza Liber Seregni",
      imagen: "assets/acciones/artivismo-por-palestina/portada.jpg",
      descripcion: "Activación escénica en el marco del Varieté Artivismo por Palestina en la Plaza Liber Seregni. El cuerpo como herramienta política y poética — una intervención que une arte y resistencia en el espacio público.",
    },
    {
      slug: "espacio-bahia",
      year: "2025",
      title: "Espacio Bahía",
      sub: "Performance",
      tipo: "Performance",
      lugar: "Espacio Bahía",
      imagen: "assets/acciones/espacio-bahia/portada.jpg",
      descripcion: "Performance presentada en Espacio Bahía, un encuentro entre el cuerpo suspendido y la arquitectura del lugar. La danza aérea con arnés como lenguaje que habita y transforma los espacios.",
      galeria: [
        {
          seccion: "Registro",
          fotos: Array.from({ length: 26 }, (_, i) => `assets/acciones/espacio-bahia/bahia_img-${i + 1}.jpg`),
        },
      ],
    },
    {
      slug: "29m-pioneras",
      year: "2025",
      title: "29M Pioneras",
      sub: "Taller gratuito + intervención artística",
      tipo: "Intervención",
      lugar: "Plaza Las Pioneras · Municipio C",
      imagen: "assets/acciones/29m-pioneras/portada.jpg",
      descripcion: "En el marco del 29 de marzo, Día Internacional de las Mujeres Trabajadoras, ofrecimos un taller gratuito de danza aérea abierto a la comunidad, seguido de una intervención artística en la Plaza Las Pioneras. Arte, cuerpo y feminismo en el espacio público.",
      galeria: [
        {
          seccion: "Taller",
          fotos: Array.from({ length: 19 }, (_, i) => `assets/acciones/29m-pioneras/taller/taller_img-${i + 1}.jpg`),
        },
        {
          seccion: "Intervención",
          fotos: [
            "assets/acciones/29m-pioneras/intervencion/29m-pioneras.jpg",
            "assets/acciones/29m-pioneras/intervencion/29m-pioneras2.jpg",
          ],
        },
      ],
    },
    {
      slug: "fugas-colectivas-vol-ii",
      year: "2024",
      title: "Fugas Colectivas Vol. II",
      sub: "Obra de danza aérea en arnés",
      tipo: "Obra",
      lugar: "Sala El Picadero",
      mes: "Diciembre",
      imagen: "assets/acciones/fugas-colectivas-vol-ii/portada.jpg",
      descripcion: "Segunda edición de Fugas Colectivas en la Sala El Picadero. La obra regresa con nuevas capas de sentido, profundizando en el lenguaje del cuerpo suspendido y la poética del movimiento colectivo. Fugas Colectivas, porque el futuro será colectivo.",
      graficas: [
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_afiche-dic.jpg",
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_grafica-6.jpg",
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_grafica-7.jpg",
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_posteo-1a.jpg",
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_posteo-1b.jpg",
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_posteo-1c.jpg",
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_posteo-3a.jpg",
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_posteo-4a.jpg",
        "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_posteo-5b.jpg",
      ],
      videos: [
        { label: "Reel", src: "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_reel-1.mp4" },
        { label: "Spot lanzamiento", src: "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_spot-lanzamiento.mp4" },
        { label: "Spot lanzamiento (alt)", src: "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_spot-lanzamiento-2.mp4" },
        { label: "Video", src: "assets/acciones/fugas-colectivas-vol-ii/graficas/fugas_ii_video-1.mp4" },
      ],
    },
    {
      slug: "fugas-colectivas-vol-i",
      year: "2024",
      mes: "Julio",
      title: "Fugas Colectivas Vol. I",
      sub: "Obra de danza aérea en arnés",
      tipo: "Obra",
      lugar: "Sala El Picadero",
      imagen: "assets/acciones/fugas-colectivas-vol-i/portada.jpg",
      frase: "Fugas Colectivas, porque el futuro será colectivo.",
      ficha: {
        direccion: "Diego Ruella",
        cocreacion: "Punto de Fuga",
        elenco: ["Elisa Acosta", "Victoria Berreta", "Florencia Mazzucco", "Anaclara Oyenart", "Agustina Rodríguez"],
        produccion: "Punto de Fuga",
        vestuario: "Punto de Fuga",
      },
      descripcion: "Fugas Colectivas es un espectáculo que, desde el lenguaje visual-poético y las artes del movimiento, explora los vínculos y las formas en que nuestros cuerpos son afectados por enunciados hegemónicos que buscan invisibilizarnos. Interpretada por un elenco exclusivamente femenino de siete artistas, esta performance se sumerge en las múltiples posibilidades que emergen del encuentro y desencuentro entre los cuerpos en un espacio finito. La obra construye un juego espacial a través de direcciones trazadas con luces, movimientos, péndulos, espirales, desequilibrios, puntos y líneas, tejiendo una trama de interacciones y cruces que dan vida a una pintura en movimiento. Fugas Colectivas, porque el futuro será colectivo.",
      galeria: [
        {
          seccion: "Registro",
          fotos: Array.from({ length: 42 }, (_, i) => `assets/acciones/fugas-colectivas-vol-i/fugas_i_img-${i + 1}.jpg`),
        },
      ],
      graficas: [
        "assets/acciones/fugas-colectivas-vol-i/graficas/fugas_i_grafica-1.jpg",
        "assets/acciones/fugas-colectivas-vol-i/graficas/fugas_i_grafica-2.jpg",
        "assets/acciones/fugas-colectivas-vol-i/graficas/fugas_i_grafica-3.jpg",
        "assets/acciones/fugas-colectivas-vol-i/graficas/fugas_i_grafica-4.jpg",
        "assets/acciones/fugas-colectivas-vol-i/graficas/fugas_i_grafica-5.jpg",
      ],
      videos: [
        { label: "Reel", src: "assets/acciones/fugas-colectivas-vol-i/graficas/fugas_i_reel-1.mp4" },
      ],
    },
    {
      slug: "apertura-proceso-creativo",
      year: "2023",
      title: "Apertura de proceso creativo",
      sub: "Muestra abierta",
      tipo: "Ensayo",
      lugar: "La Galponera espacio de circo",
      imagen: "assets/acciones/apertura-proceso-creativo/apertura_img-1.jpg",
      videos: [
        { label: "Video 1", src: "assets/acciones/apertura-proceso-creativo/apertura_video-1.mp4" },
        { label: "Video 2", src: "assets/acciones/apertura-proceso-creativo/apertura_video-2.mp4" },
        { label: "Video 3", src: "assets/acciones/apertura-proceso-creativo/apertura_video-3.mp4" },
        { label: "Video 4", src: "assets/acciones/apertura-proceso-creativo/apertura_video-4.mp4" },
      ],
      descripcion: "Muestra abierta del proceso creativo de Fugas Colectivas en La Galponera. Un espacio de encuentro con el público para compartir el trabajo en construcción — la obra en su estado más vivo y vulnerable.",
      galeria: [
        {
          seccion: "Registro",
          fotos: Array.from({ length: 19 }, (_, i) => `assets/acciones/apertura-proceso-creativo/apertura_img-${i + 1}.jpg`),
        },
      ],
    },
    {
      slug: "investigacion-visual-luces",
      year: "2022",
      title: "Investigación Visual y Luces",
      sub: "Proceso de investigación",
      tipo: "Ensayo",
      lugar: "Lugar de ensayo",
      imagen: "assets/acciones/investigacion-visual-luces/portada.jpg",
      descripcion: "Investigación de luces y visuales — exploración del espacio escénico a través de la luz y los recursos visuales como herramientas de creación.",
      galeria: [
        {
          seccion: "Registro",
          fotos: [
            "assets/acciones/investigacion-visual-luces/inv-visual_img-1.jpg",
            "assets/acciones/investigacion-visual-luces/inv-visual_img-2.jpg",
            "assets/acciones/investigacion-visual-luces/inv-visual_img-3.jpg",
            "assets/acciones/investigacion-visual-luces/inv-visual_img-4.jpg",
          ],
        },
      ],
      videos: [
        { label: "Video", src: "assets/acciones/investigacion-visual-luces/inv-visual_video-1.mp4" },
      ],
    },
  ],

  nosInteresa: [
    {
      lead: "Facilitar el acceso a la cultura y el arte",
      cuerpo: "a través de intervenciones artísticas en espacios abiertos a la comunidad, promoviendo el sentido de pertenencia y el uso del espacio público como un lugar de encuentro y disfrute.",
    },
    {
      lead: "Difundir la danza aérea con arnés",
      cuerpo: "una disciplina poco explorada en Uruguay, destacando su potencial para la investigación y la exploración del trabajo con el cuerpo.",
    },
    {
      lead: "Crear instancias de encuentro con la comunidad",
      cuerpo: "donde la práctica corporal y artística en el espacio público se convierta en una experiencia compartida y significativa.",
    },
  ],

  contacto: {
    email: "puntodefuga.danzaerea@gmail.com",
    instagram: "puntodefuga.danzaerea",
    instagramUrl: "https://www.instagram.com/puntodefuga.danzaerea/",
    location: "Montevideo · Uruguay",
  },
};
