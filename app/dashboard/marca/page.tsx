import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchInfluencers } from '@/lib/api'
import { InfluencerCard } from '@/components/influencer/InfluencerCard'

export const metadata: Metadata = { title: 'Dashboard — Marca' }

const stats = [
  { label: 'Influencers activos', value: '8', change: '+2', up: true },
  { label: 'Campañas activas', value: '3', change: '+1', up: true },
  { label: 'Alcance total', value: '2.1M', change: '+340K', up: true },
  { label: 'ROI promedio', value: '4.8x', change: '+0.6x', up: true },
]

const campanasPipeline = [
  { nombre: 'Campaña Verano 2025', estado: 'Activa', influencers: 3, alcance: '450K' },
  { nombre: 'Lanzamiento Producto X', estado: 'En negociación', influencers: 2, alcance: '—' },
  { nombre: 'Brand Awareness Q2', estado: 'Borrador', influencers: 0, alcance: '—' },
]

export default async function DashboardMarcaPage() {
  const influencers = await fetchInfluencers()
  const matches = influencers.filter(i => i.estado === 'disponible').slice(0, 4)

  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-10">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] rounded-2xl p-7 mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Hola, Nike Chile</h1>
          <p className="text-white/60 text-sm">Tenés 3 campañas activas y 12 nuevos matches esta semana.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/campanas" className="bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/25 transition-colors">
            Ver campañas
          </Link>
          <Link href="/" className="bg-[#7B52D4] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#6C3BF5] transition-colors">
            Buscar influencers
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="text-xs text-muted-foreground mb-2">{s.label}</div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className={`text-xs font-semibold mt-1 ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
              ▲ {s.change} este mes
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Campaigns */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-bold text-foreground mb-4">Mis campañas</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {campanasPipeline.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-accent transition-colors">
                <div>
                  <div className="text-sm font-semibold text-foreground">{c.nombre}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {c.influencers} influencer{c.influencers !== 1 ? 's' : ''} · Alcance: {c.alcance}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  c.estado === 'Activa' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                  c.estado === 'En negociación' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {c.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent matches */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-bold text-foreground mb-4">Matches recientes</h2>
          <div className="space-y-3">
            {influencers.slice(0, 4).map(inf => (
              <Link key={inf.id} href={`/influencer/${inf.id}`} className="flex items-center gap-3 py-1.5 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="16" fill="#4A1FA8" />
                    <text x="16" y="16" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="600" fontFamily="sans-serif">{inf.iniciales}</text>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">{inf.nombre}</div>
                  <div className="text-[10px] text-muted-foreground">{inf.categoria}</div>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">{inf.engagement}%</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested influencers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground">Influencers disponibles para tu campaña</h2>
          <Link href="/" className="text-sm text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {matches.map((inf, i) => <InfluencerCard key={inf.id} influencer={inf} index={i} />)}
        </div>
      </div>
    </div>
  )
}
