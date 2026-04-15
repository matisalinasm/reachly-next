'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  isDark: boolean
  toggle: () => void
  setDark: (val: boolean) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () =>
        set((s) => {
          const next = !s.isDark
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', next)
          }
          return { isDark: next }
        }),
      setDark: (val) => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', val)
        }
        set({ isDark: val })
      },
    }),
    { name: 'reachly-theme' }
  )
)
