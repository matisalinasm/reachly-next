'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CASOS } from '../_data'

const EASE = [0.23, 1, 0.32, 1] as const

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const cardVars = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export function CasosDeExito() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="casos" className="py-24 px-[5%] bg-[#F4F2FB] dark:bg-[#0D0A1A]">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Casos de éxito</p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight mb-4">
            Resultados que hablan<br />por sí solos
          </h2>
          <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[560px]">
            Marcas líderes de LATAM confían en Reachly para sus estrategias de influencer marketing.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVars}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {CASOS.map(c => (
            <motion.div
              key={c.brand}
              variants={cardVars}
              whileHover={{ y: -4, boxShadow: `0 12px 40px ${c.color}26` }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
              className="bg-white dark:bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: c.color }}
                >
                  {c.logo}
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{c.brand}</p>
                  <p className="text-xs text-muted-foreground">{c.camp}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {c.metrics.map(m => (
                  <div key={m.l} className="text-center bg-[#F4F2FB] dark:bg-[#1A1428] rounded-xl py-3">
                    <div className="text-lg font-bold text-foreground tabular-nums">{m.n}</div>
                    <div className="text-[10px] text-muted-foreground">{m.l}</div>
                  </div>
                ))}
              </div>

              <blockquote className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                {c.quote}
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: c.avColor }}
                >
                  {c.av}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{c.author}</p>
                  <p className="text-[10px] text-muted-foreground">{c.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
