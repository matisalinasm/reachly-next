export type InfluencerStatus = 'disponible' | 'en-campaña' | 'top'

export interface Influencer {
  id: number
  nombre: string
  categoria: string
  seguidores: number
  engagement: number
  iniciales: string
  estado: InfluencerStatus
  bio?: string
  ubicacion?: string
  redes?: {
    instagram?: string
    tiktok?: string
    youtube?: string
    twitter?: string
  }
}

export type Categoria = 'Moda' | 'Tech' | 'Fitness' | 'Gastronomía' | 'Viajes' | 'Gaming'

export const CATEGORIAS: Categoria[] = ['Moda', 'Tech', 'Fitness', 'Gastronomía', 'Viajes', 'Gaming']

export const CATEGORIA_COLORS: Record<string, { bg: string; text: string; avatar: string }> = {
  Moda:        { bg: '#F0E8FF', text: '#4A1FA8', avatar: '#4A1FA8' },
  Tech:        { bg: '#E6F1FB', text: '#0C447C', avatar: '#185FA5' },
  Fitness:     { bg: '#FAECE7', text: '#993C1D', avatar: '#D85A30' },
  Gastronomía: { bg: '#E1F5EE', text: '#0F6E56', avatar: '#1D9E75' },
  Viajes:      { bg: '#FAEEDA', text: '#854F0B', avatar: '#BA7517' },
  Gaming:      { bg: '#EEEDFE', text: '#3C3489', avatar: '#534AB7' },
}
