'use client'
import { useEffect, useState } from 'react'
import { fetchInfluencers } from '@/lib/api'
import type { Influencer } from '@/types/influencer'
import { InfluencerAvatar } from '@/components/ui/InfluencerAvatar'
import Link from 'next/link'
import { X, Plus } from 'lucide-react'

const METRICS = [
  { key: 'seguidores', label: 'Seguidores', format: (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v.toString() },
  { key: 'engagement', label: 'Engagement', format: (v: number) => `${v}%` },
  { key: 'categoria', label: 'Categoría', format: (v: string) => v },
]

function getBar(value: number, max: number) {
  return Math.round((value / max) * 100)
}

export default function ComparadorPage() {
  const [all, setAll] = useState<Influencer[]>([])
  const [selected, setSelected] = useState<Influencer[]>([])
  const [query, setQuery] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => { fetchInfluencers().then(setAll) }, [])

  const filtered = query.length >= 1
    ? all.filter(i => i.nombre.toLowerCase().includes(query.toLowerCase()) && !selected.find(s => s.id === i.id))
    : []

  function addInfluencer(inf: Influencer) {
    if (selected.length >= 3) return
    setSelected(p => [...p, inf])
    setQuery('')
    setShowPicker(false)
  }

  function remove(id: number) {
    setSelected(p => p.filter(i => i.id !== id))
  }

  const maxSeg = Math.max(...selected.map(i => i.seguidores), 1)
  const maxEng = Math.max(...selected.map(i => i.engagement), 1)

  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-10">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-foreground mb-1">Comparador de influencers</h1>
        <p className="text-muted-foreground text-sm">Comparé hasta 3 influencers lado a lado.</p>
      </div>

      {/* Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[0, 1, 2].map(slot => {
          const inf = selected[slot]
          return (
            <div key={slot} className={`bg-card border rounded-2xl p-5 flex flex-col items-center text-center min-h-[160px] justify-center ${inf ? 'border-[#B89EF0]' : 'border-dashed border-border'}`}>
              {inf ? (
                <>
                  <div className="relative mb-3">
                    <InfluencerAvatar iniciales={inf.iniciales} categoria={inf.categoria} size="lg" />
                    <button
                      onClick={() => remove(inf.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-foreground">{inf.nombre}</p>
                  <p className="text-xs text-muted-foreground">{inf.categoria}</p>
                  <Link href={`/influencer/${inf.id}`} className="text-[10px] text-[#7B52D4] hover:underline mt-1">Ver perfil →</Link>
                </>
              ) : (
                <button
                  onClick={() => setShowPicker(true)}
                  className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs">Agregar influencer</span>
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Search picker */}
      {showPicker && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Buscar influencer</p>
            <button onClick={() => { setShowPicker(false); setQuery('') }} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Nombre del influencer..."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-colors mb-2"
          />
          {filtered.length > 0 && (
            <div className="space-y-1">
              {filtered.slice(0, 5).map(inf => (
                <button
                  key={inf.id}
                  onClick={() => addInfluencer(inf)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent text-left transition-colors"
                >
                  <InfluencerAvatar iniciales={inf.iniciales} categoria={inf.categoria} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{inf.nombre}</p>
                    <p className="text-xs text-muted-foreground">{inf.categoria} · {inf.engagement}% eng.</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {query.length >= 1 && filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Sin resultados</p>
          )}
        </div>
      )}

      {/* Comparison table */}
      {selected.length >= 2 && (
        <div className="space-y-6">
          <h2 className="text-base font-bold text-foreground">Comparativa</h2>

          {/* Seguidores */}
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Seguidores</p>
            <div className="space-y-3">
              {selected.map(inf => (
                <div key={inf.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{inf.nombre}</span>
                    <span className="text-muted-foreground">{inf.seguidores >= 1000 ? `${(inf.seguidores / 1000).toFixed(0)}K` : inf.seguidores}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#4A1FA8] rounded-full transition-all duration-700" style={{ width: `${getBar(inf.seguidores, maxSeg)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Engagement Rate</p>
            <div className="space-y-3">
              {selected.map(inf => (
                <div key={inf.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{inf.nombre}</span>
                    <span className="text-emerald-600 font-semibold">{inf.engagement}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${getBar(inf.engagement, maxEng)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Métrica</th>
                  {selected.map(inf => (
                    <th key={inf.id} className="text-center p-4 text-xs font-semibold text-foreground">{inf.nombre.split(' ')[0]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Categoría', vals: selected.map(i => i.categoria) },
                  { label: 'Estado', vals: selected.map(i => i.estado === 'disponible' ? 'Disponible' : i.estado === 'en-campaña' ? 'En campaña' : 'Top') },
                  { label: 'Seguidores', vals: selected.map(i => i.seguidores >= 1000 ? `${(i.seguidores / 1000).toFixed(0)}K` : `${i.seguidores}`) },
                  { label: 'Precio aprox.', vals: selected.map(i => `$${(i.seguidores / 1000 * 15).toFixed(0)}`) },
                ].map(row => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className="p-4 text-muted-foreground font-medium">{row.label}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className="p-4 text-center text-foreground">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected.length < 2 && !showPicker && (
        <div className="text-center py-16 text-muted-foreground">
          <div className="text-sm font-semibold text-muted-foreground mb-3">vs</div>
          <p className="text-sm">Agregá al menos 2 influencers para comparar</p>
        </div>
      )}
    </div>
  )
}
