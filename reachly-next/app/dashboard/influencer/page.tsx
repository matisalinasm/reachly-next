import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchCampanas } from '@/lib/api'
import { CampanaCard } from '@/components/campanas/CampanaCard'

export const metadata: Metadata = { title: 'Dashboard — Influencer' }

const stats = [
  { label: 'Seguidores', value: '87.5K', change: '+2.3K', up: true },
  { label: 'Engagement', value: '6.4%', change: '+0.2pp', up: true },
  { label: 'Campañas activas', value: '3', change: '+1', up: true },
  { label: 'Ingresos este mes', value: '$4.2K', change: '+$800', up: true },
]

const pipeline = [
  { stage: 'Postulaciones', items: ['Nike Chile — Verano 2025', 'Samsung — Tech Review'] },
  { stage: 'En negociación', items: ['Adidas LATAM — Fitness'] },
  { stage: 'Activas', items: ['Coca-Cola — Lifestyle'] },
  { stage: 'Completadas', items: ['Netflix — Serie Lanzamiento', 'Spotify — Playlist'] },
]

export default async function DashboardInfluencerPage() {
  const campanas = await fetchCampanas()
  const suggested = campanas.slice(0, 4)

  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-10">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] rounded-2xl p-7 mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">¡Hola, Matías! 👋</h1>
          <p className="text-white/60 text-sm">Tenés 3 campañas activas y 2 postulaciones pendientes.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/perfil" className="bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/25 transition-colors">
            Editar perfil
          </Link>
          <Link href="/campanas" className="bg-[#7B52D4] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#6C3BF5] transition-colors">
            Explorar campañas
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="text-xs text-muted-foreground mb-2">{s.label}</div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className={`text-xs font-semibold mt-1 ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {s.up ? '▲' : '▼'} {s.change} este mes
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-bold text-foreground mb-4">Pipeline de campañas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-x-auto">
            {pipeline.map(col => (
              <div key={col.stage} className="bg-card border border-border rounded-xl p-4 min-w-[140px]">
                <div className="text-xs font-semibold text-muted-foreground mb-3">{col.stage}</div>
                <div className="space-y-2">
                  {col.items.map(item => (
                    <div key={item} className="bg-muted rounded-lg p-2.5 text-xs text-foreground leading-snug">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-bold text-foreground mb-4">Notificaciones</h2>
          <div className="space-y-3">
            {[
              { icon: '🎉', msg: 'Nike Chile aceptó tu postulación', time: '5 min' },
              { icon: '📢', msg: 'Nueva campaña en tu categoría', time: '1h' },
              { icon: '👀', msg: 'Adidas vio tu perfil', time: '3h' },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">{n.icon}</div>
                <div className="flex-1">
                  <p className="text-xs text-foreground">{n.msg}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested campaigns */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground">Campañas sugeridas para vos</h2>
          <Link href="/campanas" className="text-sm text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">Ver todas →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggested.map((c, i) => <CampanaCard key={c.id} campana={c} index={i} />)}
        </div>
      </div>
    </div>
  )
}
