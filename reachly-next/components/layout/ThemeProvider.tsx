'use client'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDark } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return <>{children}</>
}
