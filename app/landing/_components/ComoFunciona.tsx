'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { STEPS_MARCAS, STEPS_CREATORS } from '../_data'

const EASE = [0.23, 1, 0.32, 1] as const

const stepVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const stepItemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export function ComoFunciona() {
  const [tab, setTab] = useState<'marcas' | 'creators'>('marcas')
  const steps = tab === 'marcas' ? STEPS_MARCAS : STEPS_CREATORS

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="como-funciona" className="py-24 px-[5%] bg-white dark:bg-[#1A1428]">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Cómo funciona Reachly</p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight mb-4">
            De cero a campañas<br />en pocos minutos
          </h2>
          <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[560px]">
            Un proceso simple y guiado para que lances tu primera campaña hoy mismo.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex gap-2 mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
        >
          {(['marcas', 'creators'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium relative active:scale-[0.97] ${
                tab === t
                  ? 'text-white'
                  : 'border border-border text-muted-foreground hover:text-foreground hover:border-[#C4AEFA]'
              }`}
              style={{ transition: 'border-color 180ms ease, color 180ms ease' }}
            >
              {tab === t && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-[#4A1FA8] rounded-full"
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                />
              )}
              <span className="relative z-10">
                {t === 'marcas' ? 'Para Marcas' : 'Para Influencers'}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Steps with AnimatePresence crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            ref={ref}
            variants={stepVars}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={stepItemVars} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-[calc(50%+24px)] right-0 h-0.5 bg-border" />
                )}
                <div className="w-10 h-10 rounded-full bg-[#4A1FA8] text-white font-bold text-sm flex items-center justify-center mb-4 relative z-10 shadow-[0_4px_12px_rgba(74,31,168,.35)]">
                  {s.num}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
