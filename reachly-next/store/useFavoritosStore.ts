'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritosStore {
  influencers: number[]
  campanas: number[]
  toggleInfluencer: (id: number) => void
  toggleCampana: (id: number) => void
  isInfluencerFav: (id: number) => boolean
  isCampanaFav: (id: number) => boolean
}

export const useFavoritosStore = create<FavoritosStore>()(
  persist(
    (set, get) => ({
      influencers: [],
      campanas: [],
      toggleInfluencer: (id) =>
        set((s) => ({
          influencers: s.influencers.includes(id)
            ? s.influencers.filter((i) => i !== id)
            : [...s.influencers, id],
        })),
      toggleCampana: (id) =>
        set((s) => ({
          campanas: s.campanas.includes(id)
            ? s.campanas.filter((i) => i !== id)
            : [...s.campanas, id],
        })),
      isInfluencerFav: (id) => get().influencers.includes(id),
      isCampanaFav: (id) => get().campanas.includes(id),
    }),
    { name: 'reachly-favoritos' }
  )
)
