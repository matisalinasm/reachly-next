import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchInfluencers } from '@/lib/api'

// Simulated brand data based on id
function getBrandData(id: string) {
  const brands: Record<string, {
    nombre: string
    iniciales: string
    sector: string
    descripcion: string
    ubicacion: string
    sitio: string
    categoria: string[]
    stats: { label: string; value: string }[]
    campanas: { id: number; nombre: string; categoria: string; dias: number; postulantes: number }[]
  }> = {
    '1': {
      nombre: 'Nike Chile',
      iniciales: 'NK',
      sector: 'Moda / Deportes',
      descripcion: 'Marca global de ropa y calzado deportivo. En Chile desde 1990, liderando el mercado con campañas que inspiran a atletas y consumidores a superarse cada día.',
      ubicacion: 'Santiago, Chile',
      sitio: 'nike.com/chile',
      categoria: ['Moda', 'Fitness', 'Lifestyle'],
      stats: [
        { label: 'Campañas activas', value: '3' },
        { label: 'Colaboraciones', value: '24' },
        { label: 'Alcance total', value: '890K' },
        { label: 'Rating', value: '4.8 ★' },
      ],
      campanas: [
        { id: 1, nombre: 'Embajador primavera 2025', categoria: 'Moda', dias: 15, postulantes: 8 },
        { id: 7, nombre: 'Campaña de verano', categoria: 'Lifestyle', dias: 30, postulantes: 4 },
        { id: 12, nombre: 'Running Challenge', categoria: 'Fitness', dias: 20, postulantes: 12 },
      ],
    },
    '2': {
      nombre: 'Adidas LATAM',
      iniciales: 'AD',
      sector: 'Moda / Deportes',
      descripcion: 'Tres bandas, infinitas posibilidades. Adidas LATAM conecta con influencers que comparten la pasión por el deporte y el streetwear en toda América Latina.',
      ubicacion: 'Buenos Aires, Argentina',
      sitio: 'adidas.com.ar',
      categoria: ['Fitness', 'Moda', 'Gaming'],
      stats: [
        { label: 'Campañas activas', value: '2' },
        { label: 'Colaboraciones', value: '18' },
        { label: 'Alcance total', value: '1.2M' },
        { label: 'Rating', value: '4.6 ★' },
      ],
      campanas: [
        { id: 3, nombre: 'Fitness Challenge Q2', categoria: 'Fitness', dias: 10, postulantes: 15 },
        { id: 9, nombre: 'Streetwear Drop', categoria: 'Moda', dias: 25, postulantes: 6 },
      ],
    },
  }
  return brands[id] ?? brands['1']
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }]
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const brand = getBrandData(id)
  return { title: `${brand.nombre} — Reachly` }
}

export default async function MarcaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const brand = getBrandData(id)
  const influencers = await fetchInfluencers()
  const sugeridos = influencers.slice(0, 4)

  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-10">
      {/* Header */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <div className="h-28 bg-gradient-to-br from-[#2E1270] to-[#4A1FA8]" />
        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4 -mt-8 mb-5">
            <div className="w-16 h-16 rounded-2xl border-4 border-card bg-[#4A1FA8] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {brand.iniciales}
            </div>
            <Link
              href={`/mensajes`}
              className="bg-[#4A1FA8] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#6C3BF5] transition-colors"
            >
              Contactar
            </Link>
          </div>
          <h1 className="text-xl font-bold text-foreground">{brand.nombre}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{brand.sector} · {brand.ubicacion}</p>
          <p className="text-sm text-foreground/80 mt-3 max-w-2xl">{brand.descripcion}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {brand.categoria.map(c => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-[#F0E8FF] dark:bg-[#2A1F45] text-[#4A1FA8] dark:text-[#B89EF0] font-medium">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {brand.stats.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Campañas activas */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-bold text-foreground mb-4">Campañas activas</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {brand.campanas.map(c => (
              <Link
                key={c.id}
                href={`/campanas/${c.id}`}
                className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-accent transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-foreground">{c.nombre}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.categoria} · {c.postulantes} postulantes</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 block mb-1">
                    Activa
                  </span>
                  <span className="text-[10px] text-muted-foreground">{c.dias} días restantes</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-card border border-border rounded-xl p-5 h-fit">
          <h2 className="text-sm font-bold text-foreground mb-4">Información</h2>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Sector</p>
              <p className="text-sm text-foreground mt-0.5">{brand.sector}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Ubicación</p>
              <p className="text-sm text-foreground mt-0.5">{brand.ubicacion}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Sitio web</p>
              <p className="text-sm text-[#7B52D4] mt-0.5">{brand.sitio}</p>
            </div>
          </div>
          <Link
            href="/mensajes"
            className="block w-full text-center mt-5 bg-[#4A1FA8] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#6C3BF5] transition-colors"
          >
            Enviar mensaje
          </Link>
        </div>
      </div>

      {/* Influencers sugeridos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground">Influencers que podrían interesarte</h2>
          <Link href="/" className="text-sm text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sugeridos.map(inf => (
            <Link key={inf.id} href={`/influencer/${inf.id}`} className="bg-card border border-border rounded-xl p-4 hover:border-[#B89EF0] transition-colors">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mb-3">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="24" fill="#4A1FA8" />
                    <text x="24" y="24" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="16" fontWeight="600" fontFamily="sans-serif">{inf.iniciales}</text>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-foreground truncate w-full">{inf.nombre}</p>
                <p className="text-xs text-muted-foreground">{inf.categoria}</p>
                <p className="text-xs font-semibold text-emerald-600 mt-1">{inf.engagement}% eng.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
