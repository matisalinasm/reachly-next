import { createClient } from '@supabase/supabase-js'
import type { Influencer } from '@/types/influencer'
import type { Campana } from '@/types/campana'
import { CATEGORIAS, CATEGORIA_COLORS } from '@/types/influencer'

// Cliente público (anon key) — funciona server y client side para datos públicos
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function getIniciales(nombre: string): string {
  return nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase() || '?'
}

function getEstado(id: number, engagement: number): Influencer['estado'] {
  if (engagement >= 6) return 'top'
  if (id % 2 === 0) return 'en-campaña'
  return 'disponible'
}

export async function fetchInfluencers(): Promise<Influencer[]> {
  const { data, error } = await supabase
    .from('influencers')
    .select('id, full_name, bio, location, followers_count, engagement_rate, avatar_url, profile_id, profiles(categorias, redes)')
    .order('followers_count', { ascending: false })

  if (error || !data || data.length === 0) return []

  return data.map((row: any) => {
    const cats: string[] = row.profiles?.categorias ?? []
    const categoria = cats[0] ?? 'Lifestyle'
    const engagement = parseFloat((row.engagement_rate ?? 0).toFixed(1))
    return {
      id: row.id,
      nombre: row.full_name ?? 'Sin nombre',
      categoria,
      seguidores: row.followers_count ?? 0,
      engagement,
      iniciales: getIniciales(row.full_name ?? ''),
      estado: getEstado(row.id, engagement),
      bio: row.bio ?? undefined,
      ubicacion: row.location ?? undefined,
      avatar_url: row.avatar_url ?? undefined,
      profile_id: row.profile_id,
    }
  })
}

export async function fetchInfluencer(id: number): Promise<Influencer | null> {
  const { data, error } = await supabase
    .from('influencers')
    .select('id, full_name, bio, location, followers_count, engagement_rate, avatar_url, profile_id, profiles(categorias, redes)')
    .eq('id', id)
    .single()

  if (error || !data) return null

  const row = data as any
  const cats: string[] = row.profiles?.categorias ?? []
  const categoria = cats[0] ?? 'Lifestyle'
  const engagement = parseFloat((row.engagement_rate ?? 0).toFixed(1))

  return {
    id: row.id,
    nombre: row.full_name ?? 'Sin nombre',
    categoria,
    seguidores: row.followers_count ?? 0,
    engagement,
    iniciales: getIniciales(row.full_name ?? ''),
    estado: getEstado(row.id, engagement),
    bio: row.bio ?? undefined,
    ubicacion: row.location ?? undefined,
    avatar_url: row.avatar_url ?? undefined,
    profile_id: row.profile_id,
    redes: row.profiles?.redes ?? undefined,
  }
}

// Campañas — por ahora usa datos mock hasta conectar la tabla campaigns
const BASE = 'https://jsonplaceholder.typicode.com'
const MARCAS = ['Nike Chile', 'Adidas LATAM', 'Samsung CL', 'Coca-Cola', 'Netflix', 'Spotify', 'Apple LATAM', 'Zara']
const PRESUPUESTOS = ['$500 - $1.000', '$1.000 - $3.000', '$3.000 - $8.000', '$8.000+']

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
