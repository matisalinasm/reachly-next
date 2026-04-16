'use client'
import { useState } from 'react'
import Link from 'next/link'

// ── Data ──────────────────────────────────────────────────────────
const LOGOS = ['NIKE', 'ADIDAS', 'SAMSUNG', "L'ORÉAL", 'FALABELLA', 'RIPLEY', 'ENTEL', 'CLARO', 'RAPPI', 'UBER EATS', 'ZARA', 'H&M', 'APPLE', 'SONY']

const STEPS_MARCAS = [
  { num: 1, title: 'Crea tu campaña', desc: 'Define objetivos, presupuesto y categorías de contenido. El sistema identifica automáticamente a los influencers con mayor compatibilidad.' },
  { num: 2, title: 'Compara y negocia', desc: 'Revisa perfiles verificados, compara métricas lado a lado y negocia directamente desde el pipeline kanban integrado.' },
  { num: 3, title: 'Lanza y mide', desc: 'Activa la campaña y monitorea alcance, engagement y ROI en tiempo real. Descarga reportes listos para presentar a directivos.' },
]
const STEPS_CREATORS = [
  { num: 1, title: 'Crea tu perfil', desc: 'Conecta tus redes sociales y completa tu perfil. En menos de 10 minutos estarás visible para cientos de marcas que buscan tu perfil.' },
  { num: 2, title: 'Recibe ofertas o postula', desc: 'Espera que las marcas te contacten o explora el catálogo de campañas activas y postula a las que se alineen con tu contenido.' },
  { num: 3, title: 'Colabora y cobra', desc: 'Negocia condiciones directamente desde la plataforma, publica el contenido acordado y recibe el pago de forma segura.' },
]

const CASOS = [
  { logo: 'NK', color: '#4A1FA8', brand: 'Nike Chile', camp: 'Campaña Primavera 2024 · 15 influencers', metrics: [{ n: '2.4M', l: 'Alcance' }, { n: '8.7%', l: 'Engagement' }, { n: '+340%', l: 'ROI' }], quote: '"Reachly nos ayudó a encontrar exactamente el perfil que necesitábamos. En 48 horas teníamos 15 influencers confirmados."', av: 'CA', avColor: '#4A1FA8', author: 'Carlos A.', role: 'Marketing Manager · Nike Chile' },
  { logo: 'AD', color: '#1D9E75', brand: 'Adidas Store', camp: 'Verano Activo 2024 · 8 influencers', metrics: [{ n: '1.8M', l: 'Alcance' }, { n: '6.2%', l: 'Engagement' }, { n: '+280%', l: 'ROI' }], quote: '"El pipeline kanban nos ahorró horas de trabajo. Todo el proceso desde el match hasta el acuerdo dentro de la plataforma."', av: 'LM', avColor: '#1D9E75', author: 'Laura M.', role: 'Brand Director · Adidas Store' },
  { logo: 'SM', color: '#185FA5', brand: 'Samsung Chile', camp: 'Lanzamiento Galaxy S24 · 22 influencers', metrics: [{ n: '3.1M', l: 'Alcance' }, { n: '5.9%', l: 'Engagement' }, { n: '+410%', l: 'ROI' }], quote: '"El comparador de influencers fue clave. Evaluamos 22 creadores simultáneamente antes del lanzamiento. Impresionante."', av: 'RV', avColor: '#185FA5', author: 'Roberto V.', role: 'Digital Lead · Samsung Chile' },
]

const PLANES = [
  {
    name: 'Influencer', price: { m: '0', a: '0' }, period: 'Siempre gratis',
    desc: 'Para creadores que quieren conectar con marcas y monetizar su audiencia.',
    features: ['Perfil público verificado', 'Postulación ilimitada', 'Match automático', 'Chat directo con marcas', 'Estadísticas de perfil'],
    btn: 'Crear perfil gratis', btnStyle: 'outline', pop: false,
  },
  {
    name: 'Starter', price: { m: '49', a: '39' }, period: 'por mes',
    desc: 'Para marcas que están comenzando con influencer marketing.',
    features: ['5 campañas activas', 'Hasta 10 influencers / campaña', 'Búsqueda y filtros avanzados', 'Analytics básicos', 'Soporte por email'],
    btn: 'Prueba gratis 14 días', btnStyle: 'outline', pop: false,
  },
  {
    name: 'Pro', price: { m: '149', a: '119' }, period: 'por mes',
    desc: 'Para marcas que quieren escalar con todas las herramientas profesionales.',
    features: ['20 campañas activas', 'Influencers ilimitados', 'Pipeline kanban completo', 'Comparador de influencers', 'Analytics avanzados + reportes PDF', 'Soporte prioritario'],
    btn: 'Prueba gratis 14 días', btnStyle: 'white', pop: true,
  },
  {
    name: 'Business', price: { m: '399', a: '319' }, period: 'por mes',
    desc: 'Para agencias y grandes marcas que necesitan máxima escala y control.',
    features: ['Campañas ilimitadas', 'Gestión multi-cuenta', 'API de integración', 'Reportes white-label', 'Account manager dedicado', 'SLA 99.9% garantizado'],
    btn: 'Hablar con ventas', btnStyle: 'outline', pop: false,
  },
]

const TESTIMONIOS = [
  { stars: 5, quote: '"Reachly transformó la manera en que gestionamos campañas. Antes tardábamos semanas buscando influencers; ahora en un día tenemos todo listo y confirmado."', av: 'PA', color: '#4A1FA8', name: 'Pamela A.', role: 'CMO · Falabella Digital' },
  { stars: 5, quote: '"Como influencer, Reachly me dio visibilidad que no tenía. En el primer mes recibí 3 propuestas de marcas con las que siempre quise trabajar."', av: 'JS', color: '#1D9E75', name: 'Juliana S.', role: 'Influencer Fitness · 89K seguidores' },
  { stars: 5, quote: '"El comparador de influencers es increíble. Nos permite tomar decisiones basadas en datos reales, no intuición. El ROI habla solo."', av: 'MR', color: '#185FA5', name: 'Marcos R.', role: 'Digital Strategist · Agencia We' },
]

const FAQS = [
  { q: '¿Reachly es gratuito para influencers?', a: 'Sí, 100% gratis y siempre lo será. Los influencers pueden crear su perfil, postularse a campañas, chatear con marcas y recibir matches sin ningún costo asociado.' },
  { q: '¿Cómo funciona el sistema de match?', a: 'Nuestro algoritmo analiza la categoría, métricas de engagement, demografía de audiencia y valores del influencer para compararlos con los objetivos de cada campaña. Cuando hay compatibilidad alta, generamos un match y notificamos a ambas partes automáticamente.' },
  { q: '¿Hay un período de prueba gratuita?', a: 'Sí. Todos los planes de marca incluyen 14 días de prueba gratuita con acceso completo a todas las funciones. Puedes cancelar en cualquier momento.' },
  { q: '¿Puedo cancelar mi suscripción en cualquier momento?', a: 'Absolutamente. No hay contratos de permanencia ni penalidades. Cancela desde tu dashboard en cualquier momento y mantendrás el acceso hasta el final del período pagado.' },
  { q: '¿Trabajan con micro-influencers?', a: 'Sí, tenemos influencers desde 1.000 seguidores hasta más de 5 millones. Los micro-influencers (1K–100K) son especialmente valorados por su alto engagement y comunidades comprometidas.' },
  { q: '¿En qué países está disponible Reachly?', a: 'Actualmente operamos en Chile, Argentina, Colombia, México y Perú. Estamos expandiéndonos a Ecuador, Uruguay y Brasil durante 2027.' },
  { q: '¿Cómo se verifica la autenticidad de los influencers?', a: 'Verificamos la autenticidad conectando las cuentas oficiales, analizamos métricas reales, detectamos seguidores falsos o engagement artificialmente inflado y solo aprobamos perfiles con audiencias genuinas.' },
  { q: '¿Qué métricas puedo ver de un influencer?', a: 'Dependiendo del plan, puedes ver seguidores totales, tasa de engagement, alcance estimado por post, demografía de audiencia, historial de campañas y el score general calculado por Reachly.' },
]

// ── Component ─────────────────────────────────────────────────────
export default function LandingPage() {
  const [tab, setTab] = useState<'marcas' | 'creators'>('marcas')
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const steps = tab === 'marcas' ? STEPS_MARCAS : STEPS_CREATORS

  return (
    <div className="bg-background">

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] overflow-hidden px-[5%] pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 65% 40%, rgba(123,82,212,.3) 0%, transparent 60%)' }} />
        <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/[.18] rounded-full px-4 py-1.5 text-xs text-[#C4AEFA] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5BE8B8] flex-shrink-0" />
              Plataforma #1 de influencer marketing en LATAM
            </div>
            <h1 className="text-white text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight mb-4">
              Conecta tu marca con los<br /><span className="text-[#C4AEFA]">creadores perfectos</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-8">
              Reachly conecta marcas con miles de influencers verificados. Gestiona campañas, negocia acuerdos y mide resultados — todo en un solo lugar.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/registro" className="inline-flex items-center bg-white text-[#4A1FA8] font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-[#F0E8FF] transition-colors shadow-lg">
                Soy una marca →
              </Link>
              <Link href="/registro" className="inline-flex items-center text-white border border-white/30 font-medium text-sm px-7 py-3.5 rounded-xl hover:border-white/65 hover:bg-white/[.08] transition-all">
                Soy influencer
              </Link>
            </div>
            {/* Trust stats */}
            <div className="flex flex-wrap items-center gap-6">
              {[{ n: '12.4K+', l: 'influencers' }, { n: '3.2K+', l: 'marcas activas' }, { n: '89K+', l: 'matches exitosos' }].map((t, i) => (
                <div key={t.l} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-7 bg-white/15" />}
                  <div>
                    <div className="text-white font-bold text-lg leading-none">{t.n}</div>
                    <div className="text-white/45 text-xs mt-0.5">{t.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="hidden lg:block relative h-[400px]">
            {/* Match card */}
            <div className="animate-float-a absolute top-0 left-8 w-[200px] bg-white/[.12] backdrop-blur-sm border border-white/[.15] rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2 text-white text-xs font-semibold mb-3">
                Nuevo match
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white/20" style={{ background: '#4A1FA8' }}>NC</div>
                <span className="text-white/40 text-xs">→</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white/20" style={{ background: '#1D9E75' }}>MS</div>
              </div>
              <p className="text-white/60 text-[11px] mb-2">Nike Chile × @matias.style</p>
              <span className="inline-block bg-[rgba(29,158,117,.25)] text-[#5BE8B8] text-[11px] px-2.5 py-0.5 rounded-full">Embajador primavera</span>
            </div>

            {/* Stats card */}
            <div className="animate-float-b absolute top-4 right-0 w-[168px] bg-white/[.12] backdrop-blur-sm border border-white/[.15] rounded-2xl p-4 shadow-xl">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-3">Campaña activa</p>
              {[{ l: 'Alcance', v: '2.4M', g: false, pct: 78 }, { l: 'Engagement', v: '8.7%', g: true, pct: 87 }, { l: 'ROI', v: '+340%', g: true, pct: 95 }].map(s => (
                <div key={s.l}>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-white/55">{s.l}</span>
                    <span className={`text-[13px] font-bold ${s.g ? 'text-[#5BE8B8]' : 'text-white'}`}>{s.v}</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full mb-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: 'linear-gradient(90deg, #7B52D4, #5BE8B8)' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline card */}
            <div className="animate-float-c absolute bottom-24 left-2 w-[272px] bg-white/[.12] backdrop-blur-sm border border-white/[.15] rounded-2xl p-4 shadow-xl">
              <p className="text-xs font-semibold text-white mb-3">Pipeline de negociación</p>
              <div className="flex items-center">
                {[
                  { lbl: 'Postulado', color: '#9B8EC4' },
                  { lbl: 'Revisión', color: '#E8A320' },
                  { lbl: 'Negociando', color: '#185FA5' },
                  { lbl: 'Acuerdo', color: '#1D9E75' },
                  { lbl: 'Publicado', color: '#4A1FA8' },
                ].map((s, i, arr) => (
                  <div key={s.lbl} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full mb-1" style={{ background: s.color }} />
                      <span className="text-[9px] text-white/40 whitespace-nowrap">{s.lbl}</span>
                    </div>
                    {i < arr.length - 1 && <div className="flex-1 h-0.5 bg-white/12 mb-3.5 mx-1" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Notif card */}
            <div className="animate-float-d absolute bottom-4 right-4 w-[204px] bg-white/[.12] backdrop-blur-sm border border-white/[.15] rounded-2xl p-4 shadow-xl">
              <div className="flex items-start gap-2.5">
                <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[10px] font-bold text-[#5BE8B8] flex-shrink-0" style={{ background: 'rgba(29,158,117,.25)' }}>+</div>
                <div>
                  <p className="text-[11px] text-white/80 leading-snug">Reporte semanal listo — campaña superó el objetivo.</p>
                  <p className="text-[10px] text-white/30 mt-1">Hace 5 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOGOS MARQUEE ═══════════════════════════════════════════ */}
      <div className="bg-white dark:bg-card border-y border-border py-7 overflow-hidden">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[.14em] text-muted-foreground mb-5">Marcas que confían en Reachly</p>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-white dark:from-card to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-white dark:from-card to-transparent pointer-events-none" />
          <div className="animate-marquee flex w-max">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} className="px-7 text-sm font-bold text-muted-foreground border-r border-border hover:text-[#4A1FA8] transition-colors cursor-default whitespace-nowrap py-1">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SERVICIOS ════════════════════════════════════════════════ */}
      <section id="servicios" className="py-24 px-[5%] bg-[#F4F2FB] dark:bg-[#0D0A1A]">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Servicios</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight mb-4">Diseñado para cada<br />lado del ecosistema</h2>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[560px]">Ya seas una marca, influencer o agencia, Reachly tiene las herramientas exactas que necesitás para crecer.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Marcas */}
            <div className="bg-white dark:bg-card border border-border rounded-2xl p-8 hover:shadow-[0_8px_32px_rgba(74,31,168,.12)] hover:-translate-y-1 transition-all duration-200">
              <div className="w-[52px] h-[52px] rounded-2xl bg-[#F0E8FF] dark:bg-[#2A1F45] flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#4A1FA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Para Marcas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">Encuentra a los creadores perfectos, gestiona negociaciones y mide el ROI de cada campaña en tiempo real.</p>
              <ul className="space-y-2.5 mb-7">
                {['Búsqueda con filtros avanzados', 'Sistema de match inteligente', 'Pipeline kanban de negociación', 'Comparador side-by-side', 'Analytics y reportes descargables', 'Dashboard centralizado'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-[18px] h-[18px] rounded-full bg-[#E1F5EE] text-[#1D9E75] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/registro" className="block w-full text-center border border-border text-[#4A1FA8] font-medium text-sm py-2.5 rounded-xl hover:border-[#4A1FA8] hover:bg-[#F0E8FF] transition-all">
                Crear cuenta de marca →
              </Link>
            </div>
            {/* Influencers — featured */}
            <div className="rounded-2xl p-8 hover:-translate-y-1 transition-all duration-200" style={{ background: 'linear-gradient(135deg, #4A1FA8 0%, #2E1270 100%)' }}>
              <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,.15)' }}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Para Influencers</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-6">Monetiza tu audiencia conectándote con marcas que se alinean con tu contenido y valores. Siempre gratis.</p>
              <ul className="space-y-2.5 mb-7">
                {['Perfil verificado y visible para marcas', 'Postulación a campañas activas', 'Match automático con marcas afines', 'Chat directo con tomadores de decisión', 'Dashboard con tus estadísticas', '100% gratuito, siempre'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ background: 'rgba(29,158,117,.2)', color: '#5BE8B8' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/registro" className="block w-full text-center bg-white text-[#4A1FA8] font-semibold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                Crear mi perfil gratis →
              </Link>
            </div>
            {/* Agencias */}
            <div className="bg-white dark:bg-card border border-border rounded-2xl p-8 hover:shadow-[0_8px_32px_rgba(74,31,168,.12)] hover:-translate-y-1 transition-all duration-200">
              <div className="w-[52px] h-[52px] rounded-2xl bg-[#F0E8FF] dark:bg-[#2A1F45] flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#4A1FA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Para Agencias</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">Gestiona múltiples clientes y campañas desde un único panel con acceso multi-cuenta y reportes white-label.</p>
              <ul className="space-y-2.5 mb-7">
                {['Gestión multi-cliente desde 1 panel', 'Acceso completo a la base de datos', 'Reportes white-label exportables', 'API de integración con tus herramientas', 'Account manager dedicado', 'SLA 99.9% garantizado'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-[18px] h-[18px] rounded-full bg-[#E1F5EE] text-[#1D9E75] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/registro" className="block w-full text-center border border-border text-[#4A1FA8] font-medium text-sm py-2.5 rounded-xl hover:border-[#4A1FA8] hover:bg-[#F0E8FF] transition-all">
                Hablar con ventas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA ════════════════════════════════════════════ */}
      <section id="como-funciona" className="py-24 px-[5%] bg-white dark:bg-[#1A1428]">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Cómo funciona Reachly</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight mb-4">De cero a campañas<br />en pocos minutos</h2>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[560px]">Un proceso simple y guiado para que lances tu primera campaña hoy mismo.</p>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 mb-12">
            {(['marcas', 'creators'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${tab === t ? 'bg-[#4A1FA8] text-white' : 'border border-border text-muted-foreground hover:text-foreground hover:border-[#C4AEFA]'}`}
              >
                {t === 'marcas' ? 'Para Marcas' : 'Para Influencers'}
              </button>
            ))}
          </div>
          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                {i < steps.length - 1 && <div className="hidden sm:block absolute top-5 left-[calc(50%+24px)] right-0 h-0.5 bg-border" />}
                <div className="w-10 h-10 rounded-full bg-[#4A1FA8] text-white font-bold text-sm flex items-center justify-center mb-4 relative z-10">{s.num}</div>
                <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS BAND ═══════════════════════════════════════════════ */}
      <div className="bg-[#1A0A3D] py-12 px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: '12.400+', l: 'Influencers registrados' },
            { n: '3.200+', l: 'Marcas activas' },
            { n: '89.000+', l: 'Matches exitosos' },
            { n: '4.9/5', l: 'Satisfacción promedio' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="text-white text-3xl font-bold tracking-tight">{s.n}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CASOS DE ÉXITO ════════════════════════════════════════════ */}
      <section id="casos" className="py-24 px-[5%] bg-[#F4F2FB] dark:bg-[#0D0A1A]">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Casos de éxito</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight mb-4">Resultados que hablan<br />por sí solos</h2>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[560px]">Marcas líderes de LATAM confían en Reachly para sus estrategias de influencer marketing.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASOS.map(c => (
              <div key={c.brand} className="bg-white dark:bg-card border border-border rounded-2xl p-6 hover:shadow-[0_6px_24px_rgba(74,31,168,.10)] transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: c.color }}>{c.logo}</div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{c.brand}</p>
                    <p className="text-xs text-muted-foreground">{c.camp}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {c.metrics.map(m => (
                    <div key={m.l} className="text-center bg-[#F4F2FB] dark:bg-[#1A1428] rounded-xl py-3">
                      <div className="text-lg font-bold text-foreground">{m.n}</div>
                      <div className="text-[10px] text-muted-foreground">{m.l}</div>
                    </div>
                  ))}
                </div>
                <blockquote className="text-sm text-muted-foreground italic leading-relaxed mb-4">{c.quote}</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: c.avColor }}>{c.av}</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{c.author}</p>
                    <p className="text-[10px] text-muted-foreground">{c.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRECIOS ══════════════════════════════════════════════════ */}
      <section id="precios" className="py-24 px-[5%] bg-white dark:bg-[#1A1428]">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Precios</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight mb-4">Planes para cada<br />tamaño de negocio</h2>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[560px] mx-auto">Sin contratos largos. Sin costos ocultos. Cancela cuando quieras. Los influencers SIEMPRE serán bienvenidos gratis.</p>
          </div>
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={`text-sm ${!annual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Mensual</span>
            <button
              onClick={() => setAnnual(v => !v)}
              className={`w-11 h-6 rounded-full transition-colors relative ${annual ? 'bg-[#4A1FA8]' : 'bg-muted'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${annual ? 'left-5' : 'left-0.5'}`} />
            </button>
            <span className={`text-sm ${annual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Anual</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-opacity ${annual ? 'bg-emerald-100 text-emerald-700 opacity-100' : 'opacity-35 bg-muted text-muted-foreground'}`}>Ahorra 20%</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {PLANES.map(p => (
              <div
                key={p.name}
                className={`rounded-2xl p-7 relative border transition-shadow ${p.pop ? 'border-[#4A1FA8] shadow-[0_8px_40px_rgba(74,31,168,.25)] -translate-y-2' : 'border-border bg-white dark:bg-card hover:shadow-[0_4px_20px_rgba(74,31,168,.09)]'}`}
                style={p.pop ? { background: 'linear-gradient(135deg, #4A1FA8 0%, #2E1270 100%)' } : undefined}
              >
                {p.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5BE8B8] text-[#0D3D2A] text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">Más popular</div>}
                <div className={`text-sm font-semibold mb-3 ${p.pop ? 'text-white' : 'text-foreground'}`}>{p.name}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-sm font-medium ${p.pop ? 'text-white/70' : 'text-muted-foreground'}`}>$</span>
                  <span className={`text-4xl font-bold leading-none ${p.pop ? 'text-white' : 'text-foreground'}`}>{annual ? p.price.a : p.price.m}</span>
                </div>
                <p className={`text-xs mb-4 ${p.pop ? 'text-white/60' : 'text-muted-foreground'}`}>{p.price.m === '0' ? p.period : annual ? 'por mes · facturado anualmente' : p.period}</p>
                <p className={`text-sm leading-relaxed mb-5 ${p.pop ? 'text-white/65' : 'text-muted-foreground'}`}>{p.desc}</p>
                <div className={`w-full h-px mb-5 ${p.pop ? 'bg-white/15' : 'bg-border'}`} />
                <ul className="space-y-2.5 mb-7">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-[13px] ${p.pop ? 'text-white/75' : 'text-muted-foreground'}`}>
                      <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                        style={p.pop
                          ? { background: 'rgba(29,158,117,.2)', color: '#5BE8B8' }
                          : { background: '#E1F5EE', color: '#1D9E75' }
                        }>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/registro"
                  className={`block w-full text-center text-sm font-semibold py-2.5 rounded-xl transition-all ${p.btnStyle === 'white'
                    ? 'bg-white text-[#4A1FA8] hover:opacity-90'
                    : p.pop
                      ? 'border border-white/30 text-white hover:bg-white/10'
                      : 'border border-border text-[#4A1FA8] hover:border-[#4A1FA8] hover:bg-[#F0E8FF]'
                    }`}
                >
                  {p.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIOS ══════════════════════════════════════════════ */}
      <section className="py-24 px-[5%] bg-[#F4F2FB] dark:bg-[#0D0A1A]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Testimonios</p>
            <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight">Lo que dicen nuestros usuarios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIOS.map(t => (
              <div key={t.name} className="bg-white dark:bg-card border border-border rounded-2xl p-7 hover:shadow-[0_4px_20px_rgba(74,31,168,.09)] transition-shadow">
                <div className="text-[#E8A320] text-sm mb-3">{'★'.repeat(t.stars)}</div>
                <p className="text-sm text-foreground leading-relaxed mb-5 italic">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: t.color }}>{t.av}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 px-[5%] bg-white dark:bg-[#1A1428]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">FAQ</p>
            <h3 className="text-[clamp(22px,2.8vw,32px)] font-bold text-foreground leading-tight mb-4">Preguntas frecuentes</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-7">¿No encontrás lo que buscás? Escribinos directamente y te respondemos en menos de 24 horas.</p>
            <Link href="/contacto" className="inline-block border border-[#4A1FA8] text-[#4A1FA8] font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-[#F0E8FF] transition-colors">
              Contactar soporte →
            </Link>
          </div>
          <div className="space-y-1">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-border last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-foreground hover:text-[#4A1FA8] transition-colors gap-3"
                >
                  {f.q}
                  <span className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {openFaq === i && (
                  <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] text-center px-[5%] py-24">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-white text-[clamp(28px,4vw,44px)] font-bold leading-tight mb-4 tracking-tight">
            Encontrá tu match perfecto<br />hoy mismo
          </h2>
          <p className="text-white/60 text-base mb-8 leading-relaxed">
            Más de 12.400 influencers y marcas verificadas están listas para colaborar. Registrate gratis y encontrá tu match perfecto hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/registro" className="bg-white text-[#4A1FA8] font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-[#F0E8FF] transition-colors shadow-lg">
              Crear cuenta gratis →
            </Link>
            <Link href="/campanas" className="text-white border border-white/30 font-medium text-sm px-8 py-3.5 rounded-xl hover:border-white/65 hover:bg-white/[.08] transition-all">
              Ver campañas activas
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
