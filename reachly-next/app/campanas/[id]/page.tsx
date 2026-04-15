import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchCampana, fetchCampanas } from '@/lib/api'
import { CATEGORIA_COLORS } from '@/lib/api'

export async function generateStaticParams() {
  const campanas = await fetchCampanas()
  return campanas.map(c => ({ id: String(c.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const campana = await fetchCampana(Number(id))
  if (!campana) return { title: 'Campaña no encontrada' }
  return { title: campana.titulo, description: campana.descripcion }
}

export default async function CampanaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const campana = await fetchCampana(Number(id))
  if (!campana) notFound()

  const colors = CATEGORIA_COLORS[campana.categoria] ?? { bg: '#F0E8FF', text: '#4A1FA8' }

  return (
    <div className="max-w-[800px] mx-auto px-[5%] py-12">
      <Link href="/campanas" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-flex items-center gap-1">
        ← Volver a campañas
      </Link>

      <div className="bg-card border border-border rounded-2xl p-8 mt-4">
        {/* Header */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: colors.bg, color: colors.text }}
          >
            {campana.iniciales}
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">{campana.marca}</div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{campana.titulo}</h1>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: colors.bg, color: colors.text }}>
            {campana.categoria}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            {campana.presupuesto}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F0E8FF] text-[#4A1FA8]">
            🟢 Activa
          </span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8">{campana.descripcion}</p>

        {/* Apply CTA */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/registro"
            className="flex-1 text-center bg-[#4A1FA8] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors"
          >
            Postularme a esta campaña
          </Link>
          <Link
            href="/campanas"
            className="flex-1 text-center border border-border text-muted-foreground font-medium text-sm px-6 py-3 rounded-xl hover:border-[#B89EF0] hover:text-foreground transition-colors"
          >
            Ver más campañas
          </Link>
        </div>
      </div>
    </div>
  )
}
