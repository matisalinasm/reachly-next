'use client'
import Link from 'next/link'
import { useFavoritosStore } from '@/store/useFavoritosStore'
import { CATEGORIA_COLORS } from '@/types/influencer'
import type { Campana } from '@/types/campana'
import { cn } from '@/lib/utils'

interface Props {
  campana: Campana
  index?: number
}

export function CampanaCard({ campana: c, index = 0 }: Props) {
  const { isCampanaFav, toggleCampana } = useFavoritosStore()
  const isFav = isCampanaFav(c.id)
  const colors = CATEGORIA_COLORS[c.categoria] ?? { bg: '#F0E8FF', text: '#4A1FA8' }

  return (
    <Link
      href={`/campanas/${c.id}`}
      className={cn(
        'group block bg-card border border-border rounded-[18px] p-[22px]',
        'hover:border-[#B89EF0] hover:shadow-[0_8px_36px_rgba(74,31,168,.12)] hover:-translate-y-0.5',
        'transition-all duration-200 animate-fade-up'
      )}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: colors.bg, color: colors.text }}
        >
          {c.iniciales}
        </div>
        <button
          onClick={e => { e.preventDefault(); toggleCampana(c.id) }}
          className="text-lg leading-none transition-transform hover:scale-125 active:scale-90"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Marca + title */}
      <div className="text-xs font-semibold text-muted-foreground mb-1">{c.marca}</div>
      <div className="text-[15px] font-bold text-card-foreground mb-2 leading-snug line-clamp-2">
        {c.titulo}
      </div>

      {/* Category + budget */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className="inline-flex text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{ background: colors.bg, color: colors.text }}
        >
          {c.categoria}
        </span>
        <span className="inline-flex text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          {c.presupuesto}
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{c.descripcion}</p>
    </Link>
  )
}
