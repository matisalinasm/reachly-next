export interface Campana {
  id: number
  marca: string
  titulo: string
  descripcion: string
  categoria: string
  presupuesto: string
  iniciales: string
  estado?: 'activa' | 'cerrada' | 'borrador'
  seguidoresMin?: number
  engagementMin?: number
}
