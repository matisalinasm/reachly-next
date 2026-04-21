import type { Metadata } from 'next'
import { Hero } from './_components/Hero'
import { LogoMarquee } from './_components/LogoMarquee'
import { Servicios } from './_components/Servicios'
import { ComoFunciona } from './_components/ComoFunciona'
import { StatsBand } from './_components/StatsBand'
import { CasosDeExito } from './_components/CasosDeExito'
import { Precios } from './_components/Precios'
import { Testimonios } from './_components/Testimonios'
import { FAQ } from './_components/FAQ'
import { Equipo } from './_components/Equipo'
import { CTAFinal } from './_components/CTAFinal'

export const metadata: Metadata = {
  title: 'Reachly — Conecta marcas con influencers verificados de LATAM',
  description: 'La plataforma #1 de influencer marketing en LATAM. Conecta tu marca con creadores verificados, gestiona campañas y mide el ROI en tiempo real.',
}

export default function LandingPage() {
  return (
    <div className="bg-background">
      <Hero />
      <LogoMarquee />
      <Servicios />
      <ComoFunciona />
      <StatsBand />
      <CasosDeExito />
      <Precios />
      <Testimonios />
      <FAQ />
      <Equipo />
      <CTAFinal />
    </div>
  )
}
