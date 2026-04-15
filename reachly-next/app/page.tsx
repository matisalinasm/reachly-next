import type { Metadata } from 'next'
import { ExplorerClient } from './ExplorerClient'
import { fetchInfluencers } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Explorar influencers',
  description: 'Descubrí los mejores influencers de LATAM. Filtrá por categoría, seguidores y engagement.',
}

export default async function HomePage() {
  const influencers = await fetchInfluencers()
  return <ExplorerClient initialInfluencers={influencers} />
}
