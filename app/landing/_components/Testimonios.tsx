'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TESTIMONIOS } from '../_data'

const EASE = [0.23, 1, 0.32, 1] as const

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const cardVars = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export function Testimonios() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-[5%] bg-[#F4F2FB] dark:bg-[#0D0A1A]">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Testimonios</p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight">
            Lo que dicen nuestros usuarios
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVars}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIOS.map(t => (
            <motion.div
              key={t.name}
              variants={cardVars}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(74,31,168,.12)' }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
              className="bg-white dark:bg-card border border-border rounded-2xl p-7"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8A320]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-5 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.av}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
