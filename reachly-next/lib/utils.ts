import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSeguidores(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

export function getAvatarColor(categoria: string): string {
  const map: Record<string, string> = {
    Moda: '#4A1FA8',
    Tech: '#185FA5',
    Fitness: '#D85A30',
    'Gastronomía': '#1D9E75',
    Viajes: '#BA7517',
    Gaming: '#534AB7',
  }
  return map[categoria] ?? '#4A1FA8'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
