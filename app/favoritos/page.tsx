'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { InfluencerCard } from '@/components/influencer/InfluencerCard'
import { CampanaCard } from '@/components/campanas/CampanaCard'
import { useFavoritosStore } from '@/store/useFavoritosStore'
import { fetchInfluencers, fetchCampanas } from '@/lib/api'
import type { Influencer } from '@/types/influencer'
import type { Campana } from '@/types/campana'
import { cn } from '@/lib/utils'

type Tab = 'influencers' | 'campanas'

export default function FavoritosPage() {
  const { influencers: favInfIds, campanas: favCampIds } = useFavoritosStore()
  const [allInf, setAllInf] = useState<Influencer[]>([])
  const [allCamp, setAllCamp] = useState<Campana[]>([])
  const [tab, setTab] = useState<Tab>('influencers')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchInfluencers(), fetchCampanas()]).then(([infs, camps]) => {
      setAllInf(infs)
      setAllCamp(camps)
      setLoading(false)
    })
  }, [])

  const favInfs = allInf.filter(i => favInfIds.includes(i.id))
  const favCamps = allCamp.filter(c => favCampIds.includes(c.id))

  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-12">
      <h1 className="text-2xl font-bold text-foreground mb-1">Guardados</h1>
      <p className="text-muted-foreground text-sm mb-7">
        {favInfs.length + favCamps.length} items guardados
      </p>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-xl p-1 w-fit mb-8">
        {([['influencers', `Influencers (${favInfIds.length})`], ['campanas', `Campañas (${favCampIds.length})`]] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'text-sm px-5 py-2 rounded-lg font-medium transition-all',
              tab === t ? 'bg-[#4A1FA8] text-white' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Cargando...</div>
      ) : tab === 'influencers' ? (
        favInfs.length === 0 ? (
          <EmptyState type="influencers" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {favInfs.map((inf, i) => <InfluencerCard key={inf.id} influencer={inf} index={i} />)}
          </div>
        )
      ) : (
        favCamps.length === 0 ? (
          <EmptyState type="campanas" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favCamps.map((c, i) => <CampanaCard key={c.id} campana={c} index={i} />)}
          </div>
        )
      )}
    </div>
  )
}

function EmptyState({ type }: { type: Tab }) {
  return (
    <div className="text-center py-20">
      <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-4" />
      <h3 className="text-base font-semibold text-foreground mb-2">
        {type === 'influencers' ? 'Sin influencers guardados' : 'Sin campañas guardadas'}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        {type === 'influencers' ? 'Explorá y guardá los que más te interesen.' : 'Guardá campañas para revisarlas después.'}
      </p>
      <Link
        href={type === 'influencers' ? '/' : '/campanas'}
        className="inline-block bg-[#4A1FA8] text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#6C3BF5] transition-colors"
      >
        {type === 'influencers' ? 'Explorar influencers' : 'Ver campañas'}
      </Link>
    </div>
  )
}
