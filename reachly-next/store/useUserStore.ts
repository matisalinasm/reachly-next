'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'

interface UserStore {
  user: User | null
  onboardingDone: boolean
  setUser: (u: User) => void
  clearUser: () => void
  completeOnboarding: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      onboardingDone: false,
      setUser: (u) => set({ user: u }),
      clearUser: () => set({ user: null, onboardingDone: false }),
      completeOnboarding: () => set({ onboardingDone: true }),
    }),
    { name: 'reachly-user' }
  )
)
