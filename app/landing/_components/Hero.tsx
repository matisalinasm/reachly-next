'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const EASE = [0.23, 1, 0.32, 1] as const

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export function Hero() {
  const reduce = useReducedMotion()

  const initial = reduce ? false : 'hidden'

  return (
    <section className="relative bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] overflow-hidden px-[5%] pt-20 pb-16 md:pt-28 md:pb-20">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 65% 40%, rgba(123,82,212,.35) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ── Left — staggered entrance ── */}
        <motion.div variants={containerVars} initial={initial} animate="show">

          <motion.div
            variants={itemVars}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/[.18] rounded-full px-4 py-1.5 text-xs text-[#C4AEFA] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#5BE8B8] flex-shrink-0" />
            Plataforma #1 de influencer marketing en LATAM
          </motion.div>

          <motion.h1
            variants={itemVars}
            className="text-white text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight mb-4"
          >
            Conecta tu marca con los<br />
            <span className="text-[#C4AEFA]">creadores perfectos</span>
          </motion.h1>

          <motion.p
            variants={itemVars}
            className="text-white/60 text-lg leading-relaxed max-w-lg mb-8"
          >
            Reachly conecta marcas con miles de influencers verificados. Gestiona campañas, negocia acuerdos y mide resultados — todo en un solo lugar.
          </motion.p>

          <motion.div variants={itemVars} className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/registro"
              className="inline-flex items-center bg-white text-[#4A1FA8] font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-[#F0E8FF] transition-colors shadow-lg active:scale-[0.97]"
            >
              Soy una marca →
            </Link>
            <Link
              href="/registro"
              className="inline-flex items-center text-white border border-white/30 font-medium text-sm px-7 py-3.5 rounded-xl hover:border-white/65 hover:bg-white/[.08] transition-all active:scale-[0.97]"
            >
              Soy influencer
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div variants={itemVars} className="flex flex-wrap items-center gap-6">
            {[
              { n: '12.4K+', l: 'influencers' },
              { n: '3.2K+', l: 'marcas activas' },
              { n: '89K+', l: 'matches exitosos' },
            ].map((t, i) => (
              <div key={t.l} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-7 bg-white/15" />}
                <div>
                  <div className="text-white font-bold text-lg leading-none tabular-nums">{t.n}</div>
                  <div className="text-white/45 text-xs mt-0.5">{t.l}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right — floating cards (CSS animations, off main thread) ── */}
        <div className="hidden lg:block relative h-[400px]">
          {/* Match card */}
          <div className={`absolute top-0 left-8 w-[200px] ${reduce ? '' : 'animate-float-a'}`}>
            <div className="bg-white/[.12] backdrop-blur-sm border border-white/[.15] rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2 text-white text-xs font-semibold mb-3">
                <span className="text-base">🎉</span> ¡Nuevo match!
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white/20 bg-[#4A1FA8]">NC</div>
                <span className="text-white/40 text-xs">→</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white/20 bg-[#1D9E75]">MS</div>
              </div>
              <p className="text-white/60 text-[11px] mb-2">Nike Chile × @matias.style</p>
              <span className="inline-block bg-[rgba(29,158,117,.25)] text-[#5BE8B8] text-[11px] px-2.5 py-0.5 rounded-full">Embajador primavera</span>
            </div>
          </div>

          {/* Stats card */}
          <div className={`absolute top-4 right-0 w-[168px] ${reduce ? '' : 'animate-float-b'}`}>
            <div className="bg-white/[.12] backdrop-blur-sm border border-white/[.15] rounded-2xl p-4 shadow-xl">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-3">Campaña activa</p>
              {[
                { l: 'Alcance', v: '2.4M', g: false, pct: 78 },
                { l: 'Engagement', v: '8.7%', g: true, pct: 87 },
                { l: 'ROI', v: '+340%', g: true, pct: 95 },
              ].map(s => (
                <div key={s.l}>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-white/55">{s.l}</span>
                    <span className={`text-[13px] font-bold tabular-nums ${s.g ? 'text-[#5BE8B8]' : 'text-white'}`}>{s.v}</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full mb-2 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${s.pct}%`, background: 'linear-gradient(90deg, #7B52D4, #5BE8B8)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline card */}
          <div className={`absolute bottom-24 left-2 w-[272px] ${reduce ? '' : 'animate-float-c'}`}>
            <div className="bg-white/[.12] backdrop-blur-sm border border-white/[.15] rounded-2xl p-4 shadow-xl">
              <p className="text-xs font-semibold text-white mb-3">Pipeline de negociación</p>
              <div className="flex items-center">
                {[
                  { lbl: 'Postulado', color: '#9B8EC4' },
                  { lbl: 'Revisión', color: '#E8A320' },
                  { lbl: 'Negociando', color: '#185FA5' },
                  { lbl: 'Acuerdo', color: '#1D9E75' },
                  { lbl: 'Publicado', color: '#4A1FA8' },
                ].map((s, i, arr) => (
                  <div key={s.lbl} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full mb-1" style={{ background: s.color }} />
                      <span className="text-[9px] text-white/40 whitespace-nowrap">{s.lbl}</span>
                    </div>
                    {i < arr.length - 1 && <div className="flex-1 h-0.5 bg-white/12 mb-3.5 mx-1" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notification card */}
          <div className={`absolute bottom-4 right-4 w-[204px] ${reduce ? '' : 'animate-float-d'}`}>
            <div className="bg-white/[.12] backdrop-blur-sm border border-white/[.15] rounded-2xl p-4 shadow-xl">
              <div className="flex items-start gap-2.5">
                <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm flex-shrink-0 bg-[rgba(29,158,117,.25)]">📊</div>
                <div>
                  <p className="text-[11px] text-white/80 leading-snug">Reporte semanal listo — campaña superó el objetivo.</p>
                  <p className="text-[10px] text-white/30 mt-1">Hace 5 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
