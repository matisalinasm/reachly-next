'use client'
import { useState, useMemo } from 'react'
import { CampanaCard } from '@/components/campanas/CampanaCard'
import type { Campana } from '@/types/campana'
import { CATEGORIAS } from '@/types/influencer'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

export function CampanasClient({ campanas }: { campanas: Campana[] }) {
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState('Todos')

  const filtered = useMemo(() => {
    let list = campanas
    if (categoria !== 'Todos') list = list.filter(c => c.categoria === categoria)
    if (query) list = list.filter(c =>
      c.titulo.toLowerCase().includes(query.toLowerCase()) ||
      c.marca.toLowerCase().includes(query.toLowerCase())
    )
    return list
  }, [campanas, query, categoria])

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] px-[5%] py-14 text-center">
        <div className="inline-block bg-white/10 border border-white/18 rounded-full px-4 py-1 text-xs text-[#C4AEFA] mb-4">
          Campañas activas
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">Campañas disponibles</h1>
        <p className="text-white/60 text-base max-w-md mx-auto">
          Encontrá la colaboración perfecta para tu perfil y audiencia.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto px-[5%] py-10">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar campaña o marca..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['Todos', ...CATEGORIAS].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={cn(
                'text-sm px-4 py-1.5 rounded-full border font-medium transition-all',
                categoria === cat
                  ? 'bg-[#4A1FA8] text-white border-[#4A1FA8]'
                  : 'bg-card text-[#4A1FA8] border-border hover:bg-[#F0E8FF]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-muted-foreground mb-4">{filtered.length} campañas</div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16 text-sm">No se encontraron campañas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => <CampanaCard key={c.id} campana={c} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
