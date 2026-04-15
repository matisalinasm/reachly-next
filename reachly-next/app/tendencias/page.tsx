import type { Metadata } from 'next'
import { TendenciasClient } from './TendenciasClient'
import { fetchInfluencers } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Tendencias',
  description: 'Ranking semanal de influencers, categorías en tendencia y mayores movimientos del mercado.',
}

export default async function TendenciasPage() {
  const influencers = await fetchInfluencers()
  return <TendenciasClient influencers={influencers} />
}
