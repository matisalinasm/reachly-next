import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Careers — Reachly' }

const JOBS = [
  { titulo: 'Senior Full-Stack Engineer', area: 'Tecnología', tipo: 'Full-time', lugar: 'Remoto LATAM', descripcion: 'Trabajá en el core de la plataforma con Next.js, Node.js y PostgreSQL.' },
  { titulo: 'Product Designer', area: 'Diseño', tipo: 'Full-time', lugar: 'Buenos Aires / Remoto', descripcion: 'Diseñá experiencias para miles de influencers y marcas en toda LATAM.' },
  { titulo: 'Growth Marketing Manager', area: 'Marketing', tipo: 'Full-time', lugar: 'Remoto LATAM', descripcion: 'Liderá la estrategia de adquisición y retención en múltiples mercados.' },
  { titulo: 'Customer Success (Influencers)', area: 'Operaciones', tipo: 'Full-time', lugar: 'Buenos Aires', descripcion: 'Ayudá a influencers a sacar el máximo provecho de Reachly.' },
  { titulo: 'Data Analyst', area: 'Datos', tipo: 'Part-time', lugar: 'Remoto', descripcion: 'Transformá datos de campañas en insights accionables para el equipo.' },
]

const PERKS = [
  { icon: '🌍', titulo: '100% remoto', desc: 'Trabajá desde donde quieras en LATAM.' },
  { icon: '📚', titulo: 'Budget de aprendizaje', desc: '$500 USD/año para cursos y libros.' },
  { icon: '🏥', titulo: 'Obra social', desc: 'Cobertura médica para vos y tu familia.' },
  { icon: '🎮', titulo: 'Equipamiento', desc: 'Laptop + setup para trabajar cómodo.' },
  { icon: '⏰', titulo: 'Horario flexible', desc: 'Resultados sobre horas en pantalla.' },
  { icon: '📈', titulo: 'Equity', desc: 'Opciones de participación en la empresa.' },
]

export default function CareersPage() {
  return (
    <div className="max-w-[900px] mx-auto px-[5%] py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">Construí el futuro del marketing de influencers</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Somos un equipo chico con gran impacto. Buscamos personas que quieran resolver problemas reales para millones de creadores en LATAM.</p>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        {PERKS.map(p => (
          <div key={p.titulo} className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl mb-2">{p.icon}</div>
            <p className="text-sm font-bold text-foreground">{p.titulo}</p>
            <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Positions */}
      <h2 className="text-xl font-bold text-foreground mb-5">Posiciones abiertas</h2>
      <div className="space-y-3 mb-12">
        {JOBS.map(job => (
          <div key={job.titulo} className="bg-card border border-border rounded-xl p-5 flex flex-wrap items-start justify-between gap-4 hover:border-[#B89EF0] transition-colors">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-base font-bold text-foreground">{job.titulo}</span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#F0E8FF] dark:bg-[#2A1F45] text-[#4A1FA8] dark:text-[#B89EF0]">{job.area}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{job.tipo} · {job.lugar}</p>
              <p className="text-sm text-muted-foreground">{job.descripcion}</p>
            </div>
            <button className="bg-[#4A1FA8] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#6C3BF5] transition-colors flex-shrink-0">
              Aplicar
            </button>
          </div>
        ))}
      </div>

      {/* Open application */}
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <h2 className="text-lg font-bold text-foreground mb-2">¿No encontrás tu rol?</h2>
        <p className="text-muted-foreground text-sm mb-5">Mandanos tu CV de todas formas. Si hay fit, te contactamos.</p>
        <a href="mailto:careers@reachly.app" className="inline-block bg-[#4A1FA8] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors">
          careers@reachly.app
        </a>
      </div>
    </div>
  )
}
