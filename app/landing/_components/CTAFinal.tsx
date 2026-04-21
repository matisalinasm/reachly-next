'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const EASE = [0.23, 1, 0.32, 1] as const

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export function CTAFinal() {
  return (
    <section className="relative bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] text-center px-[5%] py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(123,82,212,.4) 0%, transparent 65%)' }}
      />

      {/* Subtle floating orbs */}
      <motion.div
        className="absolute w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'rgba(196,174,250,.06)', top: '10%', left: '5%' }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'rgba(91,232,184,.05)', bottom: '15%', right: '8%' }}
        animate={{ y: [0, 16, 0], x: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="relative max-w-[600px] mx-auto"
      >
        <motion.h2
          variants={itemVars}
          className="text-white text-[clamp(28px,4vw,44px)] font-bold leading-tight mb-4 tracking-tight"
        >
          Encontrá tu match perfecto<br />hoy mismo
        </motion.h2>

        <motion.p variants={itemVars} className="text-white/60 text-base mb-8 leading-relaxed">
          Más de 12.400 influencers y marcas verificadas están listas para colaborar. Registrate gratis y encontrá tu match perfecto hoy.
        </motion.p>

        <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', duration: 0.25, bounce: 0.2 }}>
            <Link
              href="/registro"
              className="inline-flex items-center justify-center bg-white text-[#4A1FA8] font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-[#F0E8FF] transition-colors shadow-lg w-full sm:w-auto"
              style={{ transition: 'background-color 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              Crear cuenta gratis →
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', duration: 0.25, bounce: 0.2 }}>
            <Link
              href="/campanas"
              className="inline-flex items-center justify-center text-white border border-white/30 font-medium text-sm px-8 py-3.5 rounded-xl hover:border-white/65 hover:bg-white/[.08] transition-all w-full sm:w-auto"
              style={{ transition: 'all 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              Ver campañas activas
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
