export const LOGOS = [
  'NIKE', 'ADIDAS', 'SAMSUNG', "L'ORÉAL", 'FALABELLA',
  'RIPLEY', 'ENTEL', 'CLARO', 'RAPPI', 'UBER EATS',
  'ZARA', 'H&M', 'APPLE', 'SONY',
]

export const STEPS_MARCAS = [
  {
    num: 1,
    title: 'Crea tu campaña',
    desc: 'Define objetivos, presupuesto y categorías de contenido. El sistema identifica automáticamente a los influencers con mayor compatibilidad.',
  },
  {
    num: 2,
    title: 'Compara y negocia',
    desc: 'Revisa perfiles verificados, compara métricas lado a lado y negocia directamente desde el pipeline kanban integrado.',
  },
  {
    num: 3,
    title: 'Lanza y mide',
    desc: 'Activa la campaña y monitorea alcance, engagement y ROI en tiempo real. Descarga reportes listos para presentar a directivos.',
  },
]

export const STEPS_CREATORS = [
  {
    num: 1,
    title: 'Crea tu perfil',
    desc: 'Conecta tus redes sociales y completa tu perfil. En menos de 10 minutos estarás visible para cientos de marcas que buscan tu perfil.',
  },
  {
    num: 2,
    title: 'Recibe ofertas o postula',
    desc: 'Espera que las marcas te contacten o explora el catálogo de campañas activas y postula a las que se alineen con tu contenido.',
  },
  {
    num: 3,
    title: 'Colabora y cobra',
    desc: 'Negocia condiciones directamente desde la plataforma, publica el contenido acordado y recibe el pago de forma segura.',
  },
]

export const CASOS = [
  {
    logo: 'NK',
    color: '#4A1FA8',
    brand: 'Nike Chile',
    camp: 'Campaña Primavera 2024 · 15 influencers',
    metrics: [
      { n: '2.4M', l: 'Alcance' },
      { n: '8.7%', l: 'Engagement' },
      { n: '+340%', l: 'ROI' },
    ],
    quote: '"Reachly nos ayudó a encontrar exactamente el perfil que necesitábamos. En 48 horas teníamos 15 influencers confirmados."',
    av: 'CA',
    avColor: '#4A1FA8',
    author: 'Carlos A.',
    role: 'Marketing Manager · Nike Chile',
  },
  {
    logo: 'AD',
    color: '#1D9E75',
    brand: 'Adidas Store',
    camp: 'Verano Activo 2024 · 8 influencers',
    metrics: [
      { n: '1.8M', l: 'Alcance' },
      { n: '6.2%', l: 'Engagement' },
      { n: '+280%', l: 'ROI' },
    ],
    quote: '"El pipeline kanban nos ahorró horas de trabajo. Todo el proceso desde el match hasta el acuerdo dentro de la plataforma."',
    av: 'LM',
    avColor: '#1D9E75',
    author: 'Laura M.',
    role: 'Brand Director · Adidas Store',
  },
  {
    logo: 'SM',
    color: '#185FA5',
    brand: 'Samsung Chile',
    camp: 'Lanzamiento Galaxy S24 · 22 influencers',
    metrics: [
      { n: '3.1M', l: 'Alcance' },
      { n: '5.9%', l: 'Engagement' },
      { n: '+410%', l: 'ROI' },
    ],
    quote: '"El comparador de influencers fue clave. Evaluamos 22 creadores simultáneamente antes del lanzamiento. Impresionante."',
    av: 'RV',
    avColor: '#185FA5',
    author: 'Roberto V.',
    role: 'Digital Lead · Samsung Chile',
  },
]

export const PLANES = [
  {
    name: 'Influencer',
    price: { m: '0', a: '0' },
    period: 'Siempre gratis',
    desc: 'Para creadores que quieren conectar con marcas y monetizar su audiencia.',
    features: [
      'Perfil público verificado',
      'Postulación ilimitada',
      'Match automático',
      'Chat directo con marcas',
      'Estadísticas de perfil',
    ],
    btn: 'Crear perfil gratis',
    btnStyle: 'outline',
    pop: false,
  },
  {
    name: 'Starter',
    price: { m: '49', a: '39' },
    period: 'por mes',
    desc: 'Para marcas que están comenzando con influencer marketing.',
    features: [
      '5 campañas activas',
      'Hasta 10 influencers / campaña',
      'Búsqueda y filtros avanzados',
      'Analytics básicos',
      'Soporte por email',
    ],
    btn: 'Prueba gratis 14 días',
    btnStyle: 'outline',
    pop: false,
  },
  {
    name: 'Pro',
    price: { m: '149', a: '119' },
    period: 'por mes',
    desc: 'Para marcas que quieren escalar con todas las herramientas profesionales.',
    features: [
      '20 campañas activas',
      'Influencers ilimitados',
      'Pipeline kanban completo',
      'Comparador de influencers',
      'Analytics avanzados + reportes PDF',
      'Soporte prioritario',
    ],
    btn: 'Prueba gratis 14 días',
    btnStyle: 'white',
    pop: true,
  },
  {
    name: 'Business',
    price: { m: '399', a: '319' },
    period: 'por mes',
    desc: 'Para agencias y grandes marcas que necesitan máxima escala y control.',
    features: [
      'Campañas ilimitadas',
      'Gestión multi-cuenta',
      'API de integración',
      'Reportes white-label',
      'Account manager dedicado',
      'SLA 99.9% garantizado',
    ],
    btn: 'Hablar con ventas',
    btnStyle: 'outline',
    pop: false,
  },
]

export const TESTIMONIOS = [
  {
    stars: 5,
    quote: '"Reachly transformó la manera en que gestionamos campañas. Antes tardábamos semanas buscando influencers; ahora en un día tenemos todo listo y confirmado."',
    av: 'PA',
    color: '#4A1FA8',
    name: 'Pamela A.',
    role: 'CMO · Falabella Digital',
  },
  {
    stars: 5,
    quote: '"Como influencer, Reachly me dio visibilidad que no tenía. En el primer mes recibí 3 propuestas de marcas con las que siempre quise trabajar."',
    av: 'JS',
    color: '#1D9E75',
    name: 'Juliana S.',
    role: 'Influencer Fitness · 89K seguidores',
  },
  {
    stars: 5,
    quote: '"El comparador de influencers es increíble. Nos permite tomar decisiones basadas en datos reales, no intuición. El ROI habla solo."',
    av: 'MR',
    color: '#185FA5',
    name: 'Marcos R.',
    role: 'Digital Strategist · Agencia We',
  },
]

export const FAQS = [
  {
    q: '¿Reachly es gratuito para influencers?',
    a: 'Sí, 100% gratis y siempre lo será. Los influencers pueden crear su perfil, postularse a campañas, chatear con marcas y recibir matches sin ningún costo asociado.',
  },
  {
    q: '¿Cómo funciona el sistema de match?',
    a: 'Nuestro algoritmo analiza la categoría, métricas de engagement, demografía de audiencia y valores del influencer para compararlos con los objetivos de cada campaña. Cuando hay compatibilidad alta, generamos un match y notificamos a ambas partes automáticamente.',
  },
  {
    q: '¿Hay un período de prueba gratuita?',
    a: 'Sí. Todos los planes de marca incluyen 14 días de prueba gratuita con acceso completo a todas las funciones. Puedes cancelar en cualquier momento.',
  },
  {
    q: '¿Puedo cancelar mi suscripción en cualquier momento?',
    a: 'Absolutamente. No hay contratos de permanencia ni penalidades. Cancela desde tu dashboard en cualquier momento y mantendrás el acceso hasta el final del período pagado.',
  },
  {
    q: '¿Trabajan con micro-influencers?',
    a: 'Sí, tenemos influencers desde 1.000 seguidores hasta más de 5 millones. Los micro-influencers (1K–100K) son especialmente valorados por su alto engagement y comunidades comprometidas.',
  },
  {
    q: '¿En qué países está disponible Reachly?',
    a: 'Actualmente operamos en Chile, Argentina, Colombia, México y Perú. Estamos expandiéndonos a Ecuador, Uruguay y Brasil durante 2027.',
  },
  {
    q: '¿Cómo se verifica la autenticidad de los influencers?',
    a: 'Verificamos la autenticidad conectando las cuentas oficiales, analizamos métricas reales, detectamos seguidores falsos o engagement artificialmente inflado y solo aprobamos perfiles con audiencias genuinas.',
  },
  {
    q: '¿Qué métricas puedo ver de un influencer?',
    a: 'Dependiendo del plan, puedes ver seguidores totales, tasa de engagement, alcance estimado por post, demografía de audiencia, historial de campañas y el score general calculado por Reachly.',
  },
]
