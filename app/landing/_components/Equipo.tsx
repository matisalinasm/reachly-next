'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1] as const

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const cardVars = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const TEAM = [
  {
    initials: 'WJ',
    color: '#4A1FA8',
    name: 'Walter Jaramillo',
    role: 'Co-Founder & CEO',
    bio: 'Ingeniero industrial matemático, apasionado por la inovación y las operaciones. Lidera la visión y estrategia de Reachly.',
    linkedin: 'https://www.linkedin.com/in/walter-jaramillo-3b325425b/',
  },
  {
    initials: 'MS',
    color: '#1D9E75',
    name: 'Matías Salinas',
    role: 'Co-Founder & CEO',
    bio: 'Ingeniero industrial con foco en tecnología y operaciones. Diseña los sistemas que hacen que Reachly escale en toda la región.',
    linkedin: 'https://www.linkedin.com/in/matias-salinas-ing-industrial/',
  },
  {
    initials: 'BF',
    color: '#BA7517',
    name: 'Benjamín Fuentes',
    role: 'CMO',
    bio: 'Publicista con visión estratégica en marketing y comunicación de marca. Lidera el posicionamiento y crecimiento de Reachly en LATAM.',
    linkedin: 'https://www.linkedin.com/in/benjam%C3%ADn-fuentes-correa-b780b0323/',
  },
]

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73a1.77 1.77 0 110-3.54 1.77 1.77 0 010 3.54zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z" />
  </svg>
)

export function Equipo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-[5%] bg-white dark:bg-background">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7B52D4] mb-3">El equipo</p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-bold text-foreground leading-tight">
            Las personas detrás de Reachly
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVars}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TEAM.map(member => (
            <motion.div
              key={member.name}
              variants={cardVars}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(74,31,168,.12)' }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
              className="bg-white dark:bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white mb-5 flex-shrink-0"
                style={{ background: member.color }}
              >
                {member.initials}
              </div>
              <p className="text-base font-bold text-foreground mb-1">{member.name}</p>
              <p className="text-sm font-medium text-[#7B52D4] mb-4">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{member.bio}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1A56DB] hover:bg-[#1648C0] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                <LinkedInIcon />
                Ver perfil
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
