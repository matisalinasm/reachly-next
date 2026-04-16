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

export async function fetchCampanas(): Promise<Campana[]> {
  const { data, error } = await supabase
    .from('campaigns')
    .select(`
      id, title, description, budget_range, status, min_followers,
      brands(profiles(nombre)),
      campaign_categories(name)
    `)
    .order('created_at', { ascending: false })

  if (error || !data || data.length === 0) return []

  return data.map((row: any) => {
    const marca = row.brands?.profiles?.nombre ?? 'Marca'
    const categoria = row.campaign_categories?.name ?? 'General'
    return {
      id: row.id,
      marca,
      titulo: row.title ?? '',
      descripcion: row.description ?? '',
      categoria,
      presupuesto: row.budget_range ?? 'A convenir',
      iniciales: marca.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase(),
      estado: (row.status as 'activa' | 'cerrada' | 'borrador') ?? 'activa',
      seguidoresMin: row.min_followers ?? undefined,
    }
  })
}

export async function fetchCampana(id: number): Promise<Campana | null> {
  const { data, error } = await supabase
    .from('campaigns')
    .select(`
      id, title, description, budget_range, status, min_followers,
      brands(profiles(nombre)),
      campaign_categories(name)
    `)
    .eq('id', id)
    .single()

  if (error || !data) return null

  const row = data as any
  const marca = row.brands?.profiles?.nombre ?? 'Marca'
  const categoria = row.campaign_categories?.name ?? 'General'

  return {
    id: row.id,
    marca,
    titulo: row.title ?? '',
    descripcion: row.description ?? '',
    categoria,
    presupuesto: row.budget_range ?? 'A convenir',
    iniciales: marca.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase(),
    estado: (row.status as 'activa' | 'cerrada' | 'borrador') ?? 'activa',
    seguidoresMin: row.min_followers ?? undefined,
  }
}

export { CATEGORIA_COLORS }
