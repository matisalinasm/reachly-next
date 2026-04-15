import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchInfluencer, fetchInfluencers } from '@/lib/api'
import { InfluencerAvatar } from '@/components/ui/InfluencerAvatar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { CATEGORIA_COLORS } from '@/types/influencer'
import { formatSeguidores } from '@/lib/utils'

export async function generateStaticParams() {
  const influencers = await fetchInfluencers()
  return influencers.map(i => ({ id: String(i.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const inf = await fetchInfluencer(Number(id))
  if (!inf) return { title: 'Perfil no encontrado' }
  return {
    title: inf.nombre,
    description: `${inf.nombre} · ${inf.categoria} · ${formatSeguidores(inf.seguidores)} seguidores`,
  }
}

export default async function InfluencerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const inf = await fetchInfluencer(Number(id))
  if (!inf) notFound()

  const colors = CATEGORIA_COLORS[inf.categoria] ?? { bg: '#F0E8FF', text: '#4A1FA8' }

  const stats = [
    { label: 'Seguidores', value: formatSeguidores(inf.seguidores) },
    { label: 'Engagement', value: `${inf.engagement}%` },
    { label: 'Campañas', value: String(inf.id % 8 + 1) },
    { label: 'Rating', value: '4.8 ⭐' },
  ]

  return (
    <div className="max-w-[900px] mx-auto px-[5%] py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-flex items-center gap-1">
        ← Volver al explorador
      </Link>

      {/* Profile header */}
      <div className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] rounded-2xl p-8 mb-5 mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <InfluencerAvatar iniciales={inf.iniciales} categoria={inf.categoria} size="xl" />
          <div className="flex-1">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{inf.nombre}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <StatusBadge estado={inf.estado} />
              <span
                className="inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                {inf.categoria}
              </span>
            </div>
            <p className="text-white/60 text-sm">Creador de contenido especializado en {inf.categoria.toLowerCase()}</p>
          </div>
          <Link
            href="/registro"
            className="flex-shrink-0 bg-white text-[#4A1FA8] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#F0E8FF] transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-[#4A1FA8] dark:text-[#B89EF0] tracking-tight">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-base font-bold text-foreground mb-3">Sobre {inf.nombre.split(' ')[0]}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creador de contenido especializado en {inf.categoria.toLowerCase()} con{' '}
              {formatSeguidores(inf.seguidores)} seguidores y un engagement del {inf.engagement}%.
              Trabajó con más de {inf.id % 8 + 1} marcas en el último año.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-base font-bold text-foreground mb-4">Redes sociales</h2>
            <div className="space-y-3">
              {[
                { red: 'Instagram', handle: `@${inf.nombre.toLowerCase().replace(/\s+/g, '_')}`, followers: formatSeguidores(inf.seguidores) },
                { red: 'TikTok', handle: `@${inf.nombre.toLowerCase().replace(/\s+/g, '.')}`, followers: formatSeguidores(Math.floor(inf.seguidores * 0.7)) },
                { red: 'YouTube', handle: inf.nombre, followers: formatSeguidores(Math.floor(inf.seguidores * 0.4)) },
              ].map(r => (
                <div key={r.red} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{r.red}</div>
                    <div className="text-xs text-muted-foreground">{r.handle}</div>
                  </div>
                  <div className="text-sm font-bold text-[#4A1FA8] dark:text-[#B89EF0]">{r.followers}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-base font-bold text-foreground mb-4">Categorías</h2>
            <div className="flex flex-wrap gap-2">
              {[inf.categoria, 'Lifestyle', 'Digital'].map(cat => (
                <span key={cat} className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-base font-bold text-foreground mb-4">Contacto</h2>
            <Link
              href="/registro"
              className="block text-center w-full bg-[#4A1FA8] text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#6C3BF5] transition-colors mb-3"
            >
              Enviar propuesta
            </Link>
            <Link
              href="/mensajes"
              className="block text-center w-full border border-border text-muted-foreground font-medium text-sm px-4 py-2.5 rounded-xl hover:border-[#B89EF0] transition-colors"
            >
              Mensaje directo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
