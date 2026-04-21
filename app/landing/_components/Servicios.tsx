'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Check, Building2, Sparkles, Trophy } from 'lucide-react'

const EASE = [0.23, 1, 0.32, 1] as const

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const cardVars = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const FEATURES_MARCAS = [
  'Búsqueda con filtros avanzados',
  'Sistema de match inteligente',
  'Pipeline kanban de negociación',
  'Comparador side-by-side',
  'Analytics y reportes descargables',
  'Dashboard centralizado',
]
const FEATURES_INFLUENCERS = [
  'Perfil verificado y visible para marcas',
  'Postulación a campañas activas',
  'Match automático con marcas afines',
  'Chat directo con tomadores de decisión',
  'Dashboard con tus estadísticas',
  '100% gratuito, siempre',
]
const FEATURES_AGENCIAS = [
  'Gestión multi-cliente desde 1 panel',
  'Acceso completo a la base de datos',
  'Reportes white-label exportables',
  'API de integración con tus herramientas',
  'Account manager dedicado',
  'SLA 99.9% garantizado',
]

function FeatureItem({ text, inverted }: { text: string; inverted?: boolean }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <span
        className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={
          inverted
            ? { background: 'rgba(29,158,117,.2)', color: '#5BE8B8' }
            : { background: '#E1F5EE', color: '#1D9E75' }
        }
      >
        <Check className="w-2.5 h-2.5" strokeWidth={3} />
      </span>
      <span className={inverted ? 'text-white/75' : 'text-muted-foreground'}>{text}</span>
    </li>
  )
}

export function Servicios() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="servicios" className="py-24 px-[5%] bg-[#F4F2FB] dark:bg-[#0D0A1A]">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">Servicios</p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight mb-4">
            Diseñado para cada<br />lado del ecosistema
          </h2>
          <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[560px]">
            Ya seas una marca, influencer o agencia, Reachly tiene las herramientas exactas que necesitás para crecer.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVars}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {/* Para Marcas */}
          <motion.div
            variants={cardVars}
            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(74,31,168,.2)' }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            className="bg-white dark:bg-card border border-border rounded-2xl p-8 cursor-default"
          >
            <div className="w-[52px] h-[52px] rounded-2xl bg-[#F0E8FF] dark:bg-[#2A1F45] flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6 text-[#4A1FA8]" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Para Marcas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Encuentra a los creadores perfectos, gestiona negociaciones y mide el ROI de cada campaña en tiempo real.
            </p>
            <ul className="space-y-2.5 mb-7">
              {FEATURES_MARCAS.map(f => <FeatureItem key={f} text={f} />)}
            </ul>
            <Link
              href="/registro"
              className="block w-full text-center border border-border text-[#4A1FA8] font-medium text-sm py-2.5 rounded-xl hover:border-[#4A1FA8] hover:bg-[#F0E8FF] active:scale-[0.98] transition-all"
              style={{ transition: 'all 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              Crear cuenta de marca →
            </Link>
          </motion.div>

          {/* Para Influencers — featured */}
          <motion.div
            variants={cardVars}
            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(74,31,168,.35)' }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            className="rounded-2xl p-8 cursor-default relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #4A1FA8 0%, #2E1270 100%)' }}
          >
            {/* Subtle glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 70% 20%, rgba(255,255,255,.08) 0%, transparent 60%)' }}
            />
            <div className="relative">
              <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,.15)' }}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Para Influencers</h3>
              <p className="text-sm text-white/65 leading-relaxed mb-6">
                Monetiza tu audiencia conectándote con marcas que se alinean con tu contenido y valores. Siempre gratis.
              </p>
              <ul className="space-y-2.5 mb-7">
                {FEATURES_INFLUENCERS.map(f => <FeatureItem key={f} text={f} inverted />)}
              </ul>
              <Link
                href="/registro"
                className="block w-full text-center bg-white text-[#4A1FA8] font-semibold text-sm py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
                style={{ transition: 'all 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              >
                Crear mi perfil gratis →
              </Link>
            </div>
          </motion.div>

          {/* Para Agencias */}
          <motion.div
            variants={cardVars}
            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(74,31,168,.2)' }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            className="bg-white dark:bg-card border border-border rounded-2xl p-8 cursor-default"
          >
            <div className="w-[52px] h-[52px] rounded-2xl bg-[#F0E8FF] dark:bg-[#2A1F45] flex items-center justify-center mb-5">
              <Trophy className="w-6 h-6 text-[#4A1FA8]" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Para Agencias</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Gestiona múltiples clientes y campañas desde un único panel con acceso multi-cuenta y reportes white-label.
            </p>
            <ul className="space-y-2.5 mb-7">
              {FEATURES_AGENCIAS.map(f => <FeatureItem key={f} text={f} />)}
            </ul>
            <Link
              href="/registro"
              className="block w-full text-center border border-border text-[#4A1FA8] font-medium text-sm py-2.5 rounded-xl hover:border-[#4A1FA8] hover:bg-[#F0E8FF] active:scale-[0.98] transition-all"
              style={{ transition: 'all 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              Hablar con ventas →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
