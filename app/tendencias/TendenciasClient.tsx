'use client'
import { useState } from 'react'
import Link from 'next/link'
import { InfluencerAvatar } from '@/components/ui/InfluencerAvatar'
import type { Influencer } from '@/types/influencer'
import { CATEGORIAS, CATEGORIA_COLORS } from '@/types/influencer'
import { formatSeguidores } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Periodo = 'hoy' | 'semana' | 'mes' | 'anual'

const PERIODO_LABELS: Record<Periodo, string> = {
  hoy: 'Viernes 11 de abril 2026',
  semana: 'Semana del 7 al 11 de abril 2026',
  mes: 'Abril 2026',
  anual: 'Año 2026',
}

const CAT_ICONS: Record<string, string> = {
  Moda: 'MD', Tech: 'TC', Fitness: 'FT', 'Gastronomía': 'GS', Viajes: 'VJ', Gaming: 'GM',
}

const overallStats = [
  { label: 'Influencers activos', value: '12.4K', change: '+8.2%', up: true },
  { label: 'Campañas nuevas', value: '347', change: '+12.5%', up: true },
  { label: 'Engagement promedio', value: '5.7%', change: '+0.4pp', up: true },
  { label: 'Matches esta semana', value: '1.2K', change: '-3.1%', up: false },
]

export function TendenciasClient({ influencers }: { influencers: Influencer[] }) {
  const [periodo, setPeriodo] = useState<Periodo>('semana')

  const ranked = [...influencers].sort((a, b) => b.engagement - a.engagement)

  // Simulate movers with seeded pseudo-random
  const withChange = ranked.map((inf, i) => ({
    ...inf,
    cambio: ((inf.id * 7 + i * 3) % 10) / 10 * (inf.id % 2 === 0 ? 1 : -1) * 3,
  }))
  const topUp = [...withChange].sort((a, b) => b.cambio - a.cambio).slice(0, 5)
  const topDown = [...withChange].sort((a, b) => a.cambio - b.cambio).slice(0, 5)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] text-center px-[5%] py-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 65% 40%, rgba(123,82,212,.3) 0%, transparent 60%)' }} />
        <div className="relative">
          <div className="inline-block bg-white/10 border border-white/18 rounded-full px-4 py-1 text-xs text-[#C4AEFA] mb-4">Actualizado en tiempo real</div>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">Tendencias & Ranking</h1>
          <p className="text-white/60 text-base max-w-md mx-auto">
            Los influencers que más crecen, las categorías que dominan y hacia dónde va el mercado.
          </p>
        </div>
      </section>

      {/* Period selector */}
      <div className="max-w-[1100px] mx-auto px-[5%] pt-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-card border border-border rounded-xl p-1 gap-1">
          {(['hoy', 'semana', 'mes', 'anual'] as Periodo[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              className={cn(
                'text-sm px-4 py-2 rounded-lg font-medium transition-all',
                periodo === p ? 'bg-[#4A1FA8] text-white' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">{PERIODO_LABELS[periodo]}</span>
      </div>

      <div className="max-w-[1100px] mx-auto px-[5%] py-8 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {overallStats.map((s, i) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-2xl p-5 hover:border-[#B89EF0] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{s.label}</div>
              <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{s.value}</div>
              <div className={cn('text-xs font-semibold mt-1.5', s.up ? 'text-emerald-600' : 'text-red-500')}>
                {s.up ? '▲' : '▼'} {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* Ranking table */}
        <div>
          <div className="mb-5">
            <div className="text-xs font-semibold text-[#7B52D4] uppercase tracking-widest mb-1">Ranking</div>
            <h2 className="text-xl font-bold text-foreground">Top influencers</h2>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[48px_1fr_100px_100px_80px] px-5 py-3 bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span>#</span><span>Influencer</span><span>Seguidores</span><span>Engagement</span><span>Tendencia</span>
            </div>
            {ranked.map((inf, i) => {
              const cambio = withChange.find(w => w.id === inf.id)?.cambio ?? 0
              const isUp = cambio >= 0
              return (
                <Link
                  key={inf.id}
                  href={`/influencer/${inf.id}`}
                  className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[48px_1fr_100px_100px_80px] items-center px-5 py-4 border-t border-border hover:bg-muted/30 transition-colors"
                >
                  <span className={cn(
                    'text-lg font-bold',
                    i === 0 ? 'text-amber-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-700' : 'text-muted-foreground'
                  )}>
                    {i + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <InfluencerAvatar iniciales={inf.iniciales} categoria={inf.categoria} size="sm" />
                    <div>
                      <div className="text-sm font-semibold text-foreground">{inf.nombre}</div>
                      <div className="text-xs text-muted-foreground">{inf.categoria}</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground hidden md:block">{formatSeguidores(inf.seguidores)}</span>
                  <span className="text-sm font-semibold text-foreground hidden md:block">{inf.engagement}%</span>
                  <span className={cn('text-xs font-bold', isUp ? 'text-emerald-600' : 'text-red-500')}>
                    {isUp ? '▲' : '▼'} {Math.abs(cambio).toFixed(1)}%
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="mb-5">
            <div className="text-xs font-semibold text-[#7B52D4] uppercase tracking-widest mb-1">Categorías</div>
            <h2 className="text-xl font-bold text-foreground">Categorías en tendencia</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIAS.map((cat, i) => {
              const c = CATEGORIA_COLORS[cat]
              const growth = ((i * 7 + 3) % 15 + 2).toFixed(1)
              return (
                <Link
                  key={cat}
                  href="/"
                  className="bg-card border border-border rounded-2xl p-5 hover:border-[#B89EF0] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-up"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3" style={{ background: c.bg }}>
                    {CAT_ICONS[cat]}
                  </div>
                  <div className="text-sm font-bold text-foreground mb-1">{cat}</div>
                  <div className="text-[11px] text-muted-foreground mb-2">
                    {influencers.filter(i => i.categoria === cat).length} influencers
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600">▲ +{growth}%</div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Top movers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Mayor crecimiento', list: topUp, up: true },
            { title: 'Mayor descenso', list: topDown, up: false },
          ].map(({ title, list, up }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-foreground mb-4">{title}</h3>
              <div className="space-y-1">
                {list.map(inf => (
                  <Link
                    key={inf.id}
                    href={`/influencer/${inf.id}`}
                    className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 hover:opacity-80 transition-opacity"
                  >
                    <InfluencerAvatar iniciales={inf.iniciales} categoria={inf.categoria} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">{inf.nombre}</div>
                      <div className="text-xs text-muted-foreground">{inf.categoria} · {formatSeguidores(inf.seguidores)}</div>
                    </div>
                    <span className={cn('text-sm font-bold', up ? 'text-emerald-600' : 'text-red-500')}>
                      {up ? '▲' : '▼'} {Math.abs(inf.cambio).toFixed(1)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
