import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Sobre nosotros — Reachly' }

const VALUES = [
  { icon: '🔍', titulo: 'Transparencia', desc: 'Sin letra pequeña. Métricas reales, precios claros y procesos abiertos para marcas e influencers por igual.' },
  { icon: '⚡', titulo: 'Velocidad', desc: 'Sabemos que el tiempo es dinero. Diseñamos cada flujo para que puedas pasar de idea a campaña activa en horas.' },
  { icon: '🤝', titulo: 'Confianza', desc: 'Verificamos cada perfil y protegemos a ambas partes. Las colaboraciones que facilita Reachly están construidas sobre datos y acuerdos reales.' },
  { icon: '🌎', titulo: 'Impacto LATAM', desc: 'Somos de la región y para la región. Entendemos la cultura, los mercados y los creadores de contenido de Latinoamérica mejor que nadie.' },
]

const TEAM = [
  { iniciales: 'WJ', color: '#4A1FA8', nombre: 'Walter Jaramillo', rol: 'Co-Founder & CEO', bio: 'Ingeniero industrial matemático, apasionado por la innovación y las operaciones. Lidera la visión y estrategia de Reachly.' },
  { iniciales: 'MS', color: '#1D9E75', nombre: 'Matías Salinas', rol: 'Co-Founder & CEO', bio: 'Ingeniero industrial con foco en tecnología y operaciones. Diseña los sistemas que hacen que Reachly escale en toda la región.' },
  { iniciales: 'BF', color: '#BA7517', nombre: 'Benjamín Fuentes', rol: 'CMO', bio: 'Publicista con visión estratégica en marketing y comunicación de marca. Lidera el posicionamiento y crecimiento de Reachly en LATAM.' },
]

export default function SobreNosotrosPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] text-center px-[5%] py-16">
        <div className="inline-block bg-white/10 border border-white/[.18] rounded-full px-4 py-1.5 text-xs text-[#C4AEFA] mb-5">Nuestra historia</div>
        <h1 className="text-white text-[clamp(28px,4vw,48px)] font-bold leading-tight">
          Construyendo el futuro<br />del influencer marketing
        </h1>
      </div>

      {/* Misión */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Nuestra misión</p>
            <h2 className="text-[clamp(22px,3vw,36px)] font-bold text-foreground leading-tight mb-5">Conectar talento con oportunidad a escala</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">Reachly nació en 2026 con una convicción simple: el marketing de influencers era demasiado manual, opaco y poco accesible para la mayoría de las marcas y creadores de contenido de Latinoamérica.</p>
            <p className="text-base text-muted-foreground leading-relaxed">Construimos una plataforma que elimina la fricción en cada etapa del proceso — desde la búsqueda del influencer correcto hasta la medición del impacto real de la campaña — para que las marcas puedan escalar y los creadores puedan monetizar su trabajo de forma justa y transparente.</p>
          </div>
          <div className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] rounded-2xl p-7">
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: '2026', l: 'Año de fundación' },
                { n: '5', l: 'Países activos en LATAM' },
                { n: '12.4K+', l: 'Influencers en la plataforma' },
                { n: '3.2K+', l: 'Marcas que confían en nosotros' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-white text-3xl font-bold mb-1">{s.n}</div>
                  <div className="text-white/50 text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 px-[5%] bg-[#F4F2FB] dark:bg-[#0D0A1A]">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-10">Nuestros valores</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(v => (
              <div key={v.titulo} className="bg-white dark:bg-card border border-border rounded-2xl p-6">
                <div className="text-[28px] mb-3">{v.icon}</div>
                <h3 className="text-base font-bold text-foreground mb-2">{v.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <div className="bg-[#1A0A3D] py-10 px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { n: '89K+', l: 'Matches exitosos' },
            { n: '$12M+', l: 'En pagos procesados' },
            { n: '4.9/5', l: 'Satisfacción promedio' },
            { n: '97%', l: 'Retención anual' },
          ].map(s => (
            <div key={s.l}>
              <div className="text-white text-3xl font-bold mb-1.5">{s.n}</div>
              <div className="text-white/45 text-xs uppercase tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipo */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-10">El equipo</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map(m => (
              <div key={m.nombre} className="bg-card border border-border rounded-2xl p-7 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg" style={{ background: m.color }}>
                  {m.iniciales}
                </div>
                <p className="text-[17px] font-bold text-foreground mb-1">{m.nombre}</p>
                <p className="text-xs text-[#9B8EC4] font-medium tracking-wide mb-3">{m.rol}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-16 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-white dark:bg-card border border-border rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">¿Querés ser parte de lo que construimos?</h3>
            <p className="text-muted-foreground text-sm mb-7">Únete como influencer, marca, o sumá a nuestra causa como parte del equipo.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/registro" className="bg-[#4A1FA8] text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors">
                Crear cuenta gratis
              </Link>
              <Link href="/careers" className="border border-border text-foreground font-medium text-sm px-7 py-3 rounded-xl hover:bg-accent transition-colors">
                Ver posiciones abiertas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
