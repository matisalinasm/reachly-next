import { cn } from '@/lib/utils'
import type { InfluencerStatus } from '@/types/influencer'

interface StatusBadgeProps {
  estado: InfluencerStatus
  className?: string
}

const config: Record<InfluencerStatus, { label: string; className: string }> = {
  'top': {
    label: '⭐ Top',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  },
  'en-campaña': {
    label: '🟡 En campaña',
    className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  },
  disponible: {
    label: '🟢 Disponible',
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
}

export function StatusBadge({ estado, className }: StatusBadgeProps) {
  const { label, className: cls } = config[estado]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide',
        cls,
        className
      )}
    >
      {label}
    </span>
  )
}
