'use client'
import { useState, useMemo } from 'react'
import { InfluencerCard } from '@/components/influencer/InfluencerCard'
import type { Influencer } from '@/types/influencer'
import { CATEGORIAS } from '@/types/influencer'
import { cn } from '@/lib/utils'
import { Search, SlidersHorizontal } from 'lucide-react'

interface Props {
  initialInfluencers: Influencer[]
}

type Orden = 'none' | 'seguidores' | 'engagement' | 'seguidores-asc'

export function ExplorerClient({ initialInfluencers }: Props) {
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [orden, setOrden] = useState<Orden>('none')
  const [showFilters, setShowFilters] = useState(false)
  const [segMin, setSegMin] = useState(0)
  const [engMin, setEngMin] = useState(0)

  const filtered = useMemo(() => {
    let list = initialInfluencers

    if (categoria !== 'Todos') list = list.filter(i => i.categoria === categoria)
    if (query) list = list.filter(i => i.nombre.toLowerCase().includes(query.toLowerCase()))
    list = list.filter(i => i.seguidores >= segMin && i.engagement >= engMin)

    if (orden === 'seguidores') list = [...list].sort((a, b) => b.seguidores - a.seguidores)
    else if (orden === 'engagement') list = [...list].sort((a, b) => b.engagement - a.engagement)
    else if (orden === 'seguidores-asc') list = [...list].sort((a, b) => a.seguidores - b.seguidores)

    return list
  }, [initialInfluencers, query, categoria, orden, segMin, engMin])

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] text-center px-[5%] py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 65% 40%, rgba(123,82,212,.3) 0%, transparent 60%)' }} />
        <div className="relative">
          <div className="inline-block bg-white/10 border border-white/18 rounded-full px-5 py-1.5 text-xs text-[#C4AEFA] mb-4 tracking-wide">
            Plataforma #1 de influencer marketing en LATAM
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
            Conecta marcas<br />con creadores
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-md mx-auto mb-8 leading-relaxed">
            La plataforma donde influencers y empresas encuentran su match perfecto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#4A1FA8] font-bold text-sm px-7 py-3 rounded-xl hover:bg-[#F0E8FF] transition-colors shadow-md"
            >
              Soy influencer
            </button>
            <button
              onClick={() => document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white border border-white/30 font-medium text-sm px-7 py-3 rounded-xl hover:border-white/65 hover:bg-white/8 transition-all"
            >
              Soy una marca
            </button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#1A0A3D] py-6">
        <div className="max-w-[1100px] mx-auto px-[5%] flex justify-center flex-wrap gap-6 md:gap-0">
          {[['12.4K', 'Influencers'], ['3.2K', 'Marcas'], ['89K', 'Matches']].map(([num, label], i) => (
            <div key={label} className={`text-center px-8 md:px-14 ${i > 0 ? 'border-l border-white/9' : ''}`}>
              <div className="text-white text-2xl md:text-3xl font-bold">{num}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Explorer */}
      <div id="explorer" className="max-w-[1100px] mx-auto px-[5%] py-12">
        <div className="mb-7">
          <div className="text-xs font-semibold text-[#7B52D4] uppercase tracking-widest mb-1">Directorio · Explorar</div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Influencers destacados</h2>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar influencer por nombre..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10 transition-all"
            />
          </div>
          <select
            value={orden}
            onChange={e => setOrden(e.target.value as Orden)}
            className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:border-[#7B52D4] cursor-pointer transition-colors sm:w-44"
          >
            <option value="none">Ordenar por...</option>
            <option value="seguidores">Mayor seguidores</option>
            <option value="engagement">Mayor engagement</option>
            <option value="seguidores-asc">Menor seguidores</option>
          </select>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-3">
          {['Todos', ...CATEGORIAS].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={cn(
                'text-sm px-5 py-1.5 rounded-full border font-medium transition-all duration-150',
                categoria === cat
                  ? 'bg-[#4A1FA8] text-white border-[#4A1FA8]'
                  : 'bg-card text-[#4A1FA8] border-border hover:bg-[#F0E8FF] hover:border-[#C4AEFA]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Advanced filters toggle */}
        <button
          onClick={() => setShowFilters(v => !v)}
          className="flex items-center gap-2 text-sm text-[#6B5A8E] border border-border bg-card px-4 py-2 rounded-lg mb-4 hover:border-[#C4AEFA] hover:text-[#4A1FA8] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros avanzados {showFilters ? '▴' : '▾'}
        </button>

        {showFilters && (
          <div className="bg-card border border-border rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-sm animate-fade-up">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-2">Seguidores mínimos</label>
              <select
                value={segMin}
                onChange={e => setSegMin(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-[#7B52D4] cursor-pointer"
              >
                <option value={0}>Sin mínimo</option>
                <option value={10000}>10K+</option>
                <option value={50000}>50K+</option>
                <option value={100000}>100K+</option>
                <option value={200000}>200K+</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-2">Engagement mínimo</label>
              <select
                value={engMin}
                onChange={e => setEngMin(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-[#7B52D4] cursor-pointer"
              >
                <option value={0}>Sin mínimo</option>
                <option value={3}>3%+</option>
                <option value={5}>5%+</option>
                <option value={7}>7%+</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => { setSegMin(0); setEngMin(0); setQuery(''); setCategoria('Todos'); setOrden('none') }}
                className="text-sm border border-red-300 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="text-xs text-muted-foreground mb-4">
          {filtered.length} influencer{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-20 text-sm">No se encontraron influencers.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((inf, i) => (
              <InfluencerCard key={inf.id} influencer={inf} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
