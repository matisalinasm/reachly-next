export interface User {
  nombre: string
  email?: string
  tipo: 'influencer' | 'marca'
  categoria?: string
  seguidores?: number
  empresa?: string
  bio?: string
  ubicacion?: string
  iniciales?: string
  redes?: {
    instagram?: string
    tiktok?: string
    youtube?: string
    twitter?: string
    linkedin?: string
  }
}
