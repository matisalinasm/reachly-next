'use client'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { InfluencerAvatar } from '@/components/ui/InfluencerAvatar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useFavoritosStore } from '@/store/useFavoritosStore'
import { formatSeguidores } from '@/lib/utils'
import { CATEGORIA_COLORS } from '@/types/influencer'
import type { Influencer } from '@/types/influencer'
import { cn } from '@/lib/utils'

interface Props {
  influencer: Influencer
  index?: number
}

export function InfluencerCard({ influencer: inf, index = 0 }: Props) {
  const { isInfluencerFav, toggleInfluencer } = useFavoritosStore()
  const isFav = isInfluencerFav(inf.id)
  const colors = CATEGORIA_COLORS[inf.categoria] ?? { bg: '#F0E8FF', text: '#4A1FA8' }

  return (
    <Link
      href={`/influencer/${inf.id}`}
      className={cn(
        'group block bg-card border border-border rounded-[18px] p-[22px]',
        'hover:border-[#B89EF0] hover:shadow-[0_8px_36px_rgba(74,31,168,.12)] hover:-translate-y-0.5',
        'transition-all duration-200',
        'animate-fade-up'
      )}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Header row */}
      <div className="flex justify-between items-start mb-3">
        <InfluencerAvatar iniciales={inf.iniciales} categoria={inf.categoria} size="md" />
        <button
          onClick={e => { e.preventDefault(); toggleInfluencer(inf.id) }}
          className="text-lg leading-none transition-transform duration-150 hover:scale-125 active:scale-90"
          aria-label={isFav ? 'Quitar favorito' : 'Agregar favorito'}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Name */}
      <div className="text-[15px] font-bold text-card-foreground mb-1.5 tracking-tight">
        {inf.nombre}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <StatusBadge estado={inf.estado} />
        <span
          className="inline-flex text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{ background: colors.bg, color: colors.text }}
        >
          {inf.categoria}
        </span>
      </div>

      {/* Stats */}
      <div className="space-y-1 text-sm text-muted-foreground">
        <div>
          <strong className="text-[#4A1FA8] dark:text-[#B89EF0] font-bold">
            {formatSeguidores(inf.seguidores)}
          </strong>{' '}
          seguidores
        </div>
        <div>
          <strong className="text-[#4A1FA8] dark:text-[#B89EF0] font-bold">
            {inf.engagement}%
          </strong>{' '}
          engagement
        </div>
      </div>
    </Link>
  )
}
