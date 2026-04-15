import { cn, getAvatarColor } from '@/lib/utils'

interface InfluencerAvatarProps {
  iniciales: string
  categoria?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
}

const sizes = {
  sm: { wh: 32, r: 16, fontSize: 11 },
  md: { wh: 44, r: 22, fontSize: 15 },
  lg: { wh: 56, r: 28, fontSize: 19 },
  xl: { wh: 80, r: 40, fontSize: 26 },
}

const containerSizes = {
  sm: 'w-8 h-8',
  md: 'w-11 h-11',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
}

export function InfluencerAvatar({
  iniciales,
  categoria,
  size = 'md',
  color,
  className,
}: InfluencerAvatarProps) {
  const fill = color ?? (categoria ? getAvatarColor(categoria) : '#4A1FA8')
  const s = sizes[size]

  return (
    <div className={cn('rounded-full flex-shrink-0 overflow-hidden', containerSizes[size], className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={s.wh}
        height={s.wh}
        viewBox={`0 0 ${s.wh} ${s.wh}`}
        aria-label={iniciales}
      >
        <circle cx={s.r} cy={s.r} r={s.r} fill={fill} />
        <text
          x={s.r}
          y={s.r}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize={s.fontSize}
          fontWeight="600"
          fontFamily="sans-serif"
        >
          {iniciales}
        </text>
      </svg>
    </div>
  )
}
