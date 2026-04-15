import type { Metadata } from 'next'
import { fetchCampanas } from '@/lib/api'
import { CampanasClient } from './CampanasClient'

export const metadata: Metadata = {
  title: 'Campañas',
  description: 'Explorá las campañas disponibles y postulate a colaboraciones con las mejores marcas.',
}

export default async function CampanasPage() {
  const campanas = await fetchCampanas()
  return <CampanasClient campanas={campanas} />
}
