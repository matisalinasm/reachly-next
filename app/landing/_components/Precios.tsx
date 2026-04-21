'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PLANES } from '../_data'

const EASE = [0.23, 1, 0.32, 1] as const

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const cardVars = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export function Precios() {
  const [annual, setAnnual] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="precios" className="py-24 px-[5%] bg-white dark:bg-[#1A1428]">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Precios</p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight mb-4">
            Planes para cada<br />tamaño de negocio
          </h2>
          <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[560px] mx-auto">
            Sin contratos largos. Sin costos ocultos. Cancela cuando quieras. Los influencers SIEMPRE serán bienvenidos gratis.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
        >
          <span className={`text-sm transition-colors ${!annual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
            Mensual
          </span>

          <button
            onClick={() => setAnnual(v => !v)}
            aria-label="Cambiar ciclo de facturación"
            className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${annual ? 'bg-[#4A1FA8]' : 'bg-muted'}`}
          >
            <motion.span
              layout
              transition={{ type: 'spring', duration: 0.3, bounce: 0.25 }}
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
              style={{ left: annual ? '22px' : '2px' }}
            />
          </button>

          <span className={`text-sm transition-colors ${annual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
            Anual
          </span>

          <motion.span
            animate={{ opacity: annual ? 1 : 0.35 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
          >
            Ahorra 20%
          </motion.span>
        </motion.div>

        {/* Pricing grid */}
        <motion.div
          ref={ref}
          variants={containerVars}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start"
        >
          {PLANES.map(p => (
            <motion.div
              key={p.name}
              variants={cardVars}
              whileHover={!p.pop ? { y: -4, boxShadow: '0 12px 40px rgba(74,31,168,.14)' } : {}}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
              className={`rounded-2xl p-7 relative border ${
                p.pop
                  ? 'border-[#4A1FA8] shadow-[0_8px_40px_rgba(74,31,168,.25)] -translate-y-2'
                  : 'border-border bg-white dark:bg-card'
              }`}
              style={p.pop ? { background: 'linear-gradient(135deg, #4A1FA8 0%, #2E1270 100%)' } : undefined}
            >
              {p.pop && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5BE8B8] text-[#0D3D2A] text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Más popular
                </div>
              )}
              {p.pop && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none animate-shimmer-border"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(196,174,250,.5)' }}
                />
              )}

              <div className={`text-sm font-semibold mb-3 ${p.pop ? 'text-white' : 'text-foreground'}`}>{p.name}</div>

              <div className="flex items-end gap-1 mb-1">
                <span className={`text-sm font-medium ${p.pop ? 'text-white/70' : 'text-muted-foreground'}`}>$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={annual ? p.price.a : p.price.m}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className={`text-4xl font-bold leading-none tabular-nums ${p.pop ? 'text-white' : 'text-foreground'}`}
                  >
                    {annual ? p.price.a : p.price.m}
                  </motion.span>
                </AnimatePresence>
              </div>

              <p className={`text-xs mb-4 ${p.pop ? 'text-white/60' : 'text-muted-foreground'}`}>
                {p.price.m === '0' ? p.period : annual ? 'por mes · facturado anualmente' : p.period}
              </p>
              <p className={`text-sm leading-relaxed mb-5 ${p.pop ? 'text-white/65' : 'text-muted-foreground'}`}>
                {p.desc}
              </p>

              <div className={`w-full h-px mb-5 ${p.pop ? 'bg-white/15' : 'bg-border'}`} />

              <ul className="space-y-2.5 mb-7">
                {p.features.map(f => (
                  <li key={f} className={`flex items-start gap-2 text-[13px] ${p.pop ? 'text-white/75' : 'text-muted-foreground'}`}>
                    <span
                      className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={
                        p.pop
                          ? { background: 'rgba(29,158,117,.2)', color: '#5BE8B8' }
                          : { background: '#E1F5EE', color: '#1D9E75' }
                      }
                    >
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/registro"
                className={`block w-full text-center text-sm font-semibold py-2.5 rounded-xl active:scale-[0.97] ${
                  p.btnStyle === 'white'
                    ? 'bg-white text-[#4A1FA8] hover:opacity-90'
                    : p.pop
                    ? 'border border-white/30 text-white hover:bg-white/10'
                    : 'border border-border text-[#4A1FA8] hover:border-[#4A1FA8] hover:bg-[#F0E8FF]'
                }`}
                style={{ transition: 'all 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              >
                {p.btn}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
