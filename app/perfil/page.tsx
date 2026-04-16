'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUserStore } from '@/store/useUserStore'
import { InfluencerAvatar } from '@/components/ui/InfluencerAvatar'
import { fetchCampanas } from '@/lib/api'
import type { Campana } from '@/types/campana'
import { Edit2, ExternalLink } from 'lucide-react'

const REDES_ICONS: Record<string, React.ReactNode> = {
  instagram: <span className="text-xs font-bold">IG</span>,
  youtube: <span className="text-xs font-bold">YT</span>,
  twitter: <span className="text-xs font-bold">TW</span>,
  tiktok: <span className="text-xs font-bold">TK</span>,
}

const STATS = [
  { label: 'Seguidores', value: '87.5K' },
  { label: 'Engagement', value: '6.4%' },
  { label: 'Campañas', value: '12' },
  { label: 'Rating', value: '4.9 ★' },
]

export default function PerfilPage() {
  const { user } = useUserStore()
  const [campanas, setCampanas] = useState<Campana[]>([])

  useEffect(() => {
    fetchCampanas().then(c => setCampanas(c.slice(0, 3)))
  }, [])

  const nombre = user?.nombre ?? 'Tu nombre'
  const bio = user?.bio ?? 'Influencer de contenido lifestyle y moda. Creando contenido auténtico para marcas que importan.'
  const ubicacion = user?.ubicacion ?? 'Buenos Aires, Argentina'
  const iniciales = nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase() || '?'
  const redes: Record<string, string> = (user as any)?.redes ?? { instagram: 'matiinfluencer', tiktok: 'matiok' }

  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-10">
      {/* Header card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-br from-[#4A1FA8] to-[#7B52D4]" />
        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4 -mt-10 mb-5">
            <div className="w-20 h-20 rounded-2xl border-4 border-card overflow-hidden flex-shrink-0">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="40" fill="#4A1FA8" />
                <text x="40" y="40" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="26" fontWeight="700" fontFamily="sans-serif">{iniciales}</text>
              </svg>
            </div>
            <Link
              href="/onboarding"
              className="flex items-center gap-2 border border-border text-sm font-medium text-foreground px-4 py-2 rounded-xl hover:bg-accent transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> Editar perfil
            </Link>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">{nombre}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{ubicacion}</p>
              <p className="text-sm text-foreground/80 mt-3 max-w-xl">{bio}</p>
              {/* Redes */}
              {Object.keys(redes).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.entries(redes).filter(([, v]) => v).map(([red, handle]) => (
                    <span key={red} className="flex items-center gap-1.5 text-xs bg-muted text-foreground px-3 py-1.5 rounded-full">
                      {REDES_ICONS[red] ?? <ExternalLink className="w-3.5 h-3.5" />}
                      @{handle}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categorías y detalles */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-bold text-foreground mb-3">Categorías</h2>
            <div className="flex flex-wrap gap-2">
              {['Moda', 'Lifestyle', 'Viajes'].map(c => (
                <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-[#F0E8FF] dark:bg-[#2A1F45] text-[#4A1FA8] dark:text-[#B89EF0] font-medium">{c}</span>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-bold text-foreground mb-3">Audiencia</h2>
            <div className="space-y-2.5">
              {[
                { label: 'Mujeres', pct: 68 },
                { label: 'Hombres', pct: 32 },
              ].map(a => (
                <div key={a.label}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{a.label}</span><span>{a.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#4A1FA8] rounded-full" style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="pt-1 border-t border-border mt-3">
                <p className="text-xs text-muted-foreground">Edad principal: <span className="text-foreground font-medium">18–34 años</span></p>
                <p className="text-xs text-muted-foreground mt-1">País principal: <span className="text-foreground font-medium">Argentina</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Campañas recientes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">Campañas recientes</h2>
              <Link href="/campanas" className="text-xs text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">Ver todas →</Link>
            </div>
            {campanas.map(c => (
              <Link key={c.id} href={`/campanas/${c.id}`} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F0E8FF] dark:bg-[#2A1F45] flex items-center justify-center text-sm font-bold text-[#4A1FA8] dark:text-[#B89EF0] flex-shrink-0">
                    {c.iniciales}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{c.titulo}</div>
                    <div className="text-xs text-muted-foreground">{c.marca} · {c.categoria}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  Completada
                </span>
              </Link>
            ))}
          </div>

          {/* Portfolio placeholder */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-bold text-foreground mb-4">Portfolio de contenido</h2>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-[#F0E8FF] to-[#E8E0FB] dark:from-[#2A1F45] dark:to-[#1A1428]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
