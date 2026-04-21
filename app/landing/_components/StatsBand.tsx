'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS = [
  { raw: 12400, suffix: '+', label: 'Influencers registrados' },
  { raw: 3200, suffix: '+', label: 'Marcas activas' },
  { raw: 89000, suffix: '+', label: 'Matches exitosos' },
  { raw: 4.9, suffix: '/5', label: 'Satisfacción promedio' },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  const isFloat = !Number.isInteger(target)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const duration = 1400
    let raf: number

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(isFloat ? Math.round(eased * target * 10) / 10 : Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [active, target, isFloat])

  const formatted = isFloat
    ? count.toFixed(1)
    : count >= 1000
    ? count.toLocaleString('es-CL')
    : count.toString()

  return (
    <span className="tabular-nums">
      {formatted}{suffix}
    </span>
  )
}

export function StatsBand() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="bg-[#1A0A3D] py-14 px-[5%]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-white text-3xl font-bold tracking-tight">
              <CountUp target={s.raw} suffix={s.suffix} active={inView} />
            </div>
            <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
