import type { Influencer } from '@/types/influencer'
import type { Campana } from '@/types/campana'
import { CATEGORIAS, CATEGORIA_COLORS } from '@/types/influencer'

const BASE = 'https://jsonplaceholder.typicode.com'

const MARCAS = [
  'Nike Chile', 'Adidas LATAM', 'Samsung CL', 'Coca-Cola',
  'Netflix', 'Spotify', 'Apple LATAM', 'Zara',
]

const PRESUPUESTOS = ['$500 - $1.000', '$1.000 - $3.000', '$3.000 - $8.000', '$8.000+']

function getIniciales(nombre: string): string {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase()
}

function getEstado(id: number, engagement: number): Influencer['estado'] {
  if (engagement >= 6) return 'top'
  if (id % 2 === 0) return 'en-campaña'
  return 'disponible'
}

export async function fetchInfluencers(): Promise<Influencer[]> {
  const res = await fetch(`${BASE}/users`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Error fetching influencers')
  const users = await res.json()
  return users.map((u: { id: number; name: string }, i: number) => {
    const engagement = parseFloat((u.id * 0.7 + 2.1).toFixed(1))
    return {
      id: u.id,
      nombre: u.name,
      categoria: CATEGORIAS[i % CATEGORIAS.length],
      seguidores: Math.floor(u.id * 13750 + 20000),
      engagement,
      iniciales: getIniciales(u.name),
      estado: getEstado(u.id, engagement),
    }
  })
}

export async function fetchInfluencer(id: number): Promise<Influencer | null> {
  const influencers = await fetchInfluencers()
  return influencers.find(inf => inf.id === id) ?? null
}

export async function fetchCampanas(): Promise<Campana[]> {
  const res = await fetch(`${BASE}/posts`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Error fetching campanas')
  const posts = await res.json()
  return posts.slice(0, 20).map((p: { id: number; title: string; body: string }, i: number) => ({
    id: p.id,
    marca: MARCAS[i % MARCAS.length],
    titulo: p.title.charAt(0).toUpperCase() + p.title.slice(1),
    descripcion: p.body,
    categoria: CATEGORIAS[i % CATEGORIAS.length],
    presupuesto: PRESUPUESTOS[i % PRESUPUESTOS.length],
    iniciales: MARCAS[i % MARCAS.length].split(' ').map(w => w[0]).join('').slice(0, 2),
    estado: 'activa' as const,
  }))
}

export async function fetchCampana(id: number): Promise<Campana | null> {
  const campanas = await fetchCampanas()
  return campanas.find(c => c.id === id) ?? null
}

export { CATEGORIA_COLORS }
