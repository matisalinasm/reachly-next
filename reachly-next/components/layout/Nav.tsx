'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useThemeStore } from '@/store/useThemeStore'
import { fetchInfluencers, fetchCampanas } from '@/lib/api'
import type { Influencer } from '@/types/influencer'
import type { Campana } from '@/types/campana'
import { InfluencerAvatar } from '@/components/ui/InfluencerAvatar'
import { cn } from '@/lib/utils'
import { Search, Moon, Sun, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Explorar' },
  { href: '/campanas', label: 'Campañas' },
  { href: '/tendencias', label: 'Tendencias' },
  { href: '/comparador', label: 'Comparador' },
  { href: '/mensajes', label: 'Mensajes' },
  { href: '/favoritos', label: 'Guardados' },
]

const LANDING_NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#casos', label: 'Casos de éxito' },
  { href: '#precios', label: 'Precios' },
  { href: '#faq', label: 'FAQ' },
]

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const { isDark, toggle } = useThemeStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ influencers: Influencer[]; campanas: Campana[] }>({
    influencers: [],
    campanas: [],
  })
  const [allInfluencers, setAllInfluencers] = useState<Influencer[]>([])
  const [allCampanas, setAllCampanas] = useState<Campana[]>([])
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Preload data when search opens
  useEffect(() => {
    if (searchOpen && allInfluencers.length === 0) {
      Promise.all([fetchInfluencers(), fetchCampanas()]).then(([infs, camps]) => {
        setAllInfluencers(infs)
        setAllCampanas(camps)
      })
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [searchOpen, allInfluencers.length])

  // Keyboard shortcut Cmd/Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  function handleSearch(q: string) {
    setQuery(q)
    setActiveIdx(-1)
    if (!q || q.length < 2) {
      setResults({ influencers: [], campanas: [] })
      return
    }
    const lower = q.toLowerCase()
    setResults({
      influencers: allInfluencers
        .filter(i => i.nombre.toLowerCase().includes(lower) || i.categoria.toLowerCase().includes(lower))
        .slice(0, 5),
      campanas: allCampanas
        .filter(c => c.titulo.toLowerCase().includes(lower) || c.marca.toLowerCase().includes(lower))
        .slice(0, 4),
    })
  }

  const allResults = [
    ...results.influencers.map(i => ({ type: 'influencer' as const, id: i.id, name: i.nombre, sub: i.categoria, iniciales: i.iniciales, categoria: i.categoria })),
    ...results.campanas.map(c => ({ type: 'campana' as const, id: c.id, name: c.titulo, sub: c.marca, iniciales: c.iniciales, categoria: c.categoria })),
  ]

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, allResults.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && activeIdx >= 0) {
      const r = allResults[activeIdx]
      if (r) navigate(r)
    }
  }

  function navigate(r: typeof allResults[number]) {
    setSearchOpen(false)
    setQuery('')
    router.push(r.type === 'influencer' ? `/influencer/${r.id}` : `/campanas/${r.id}`)
  }

  const isLanding = pathname === '/landing'
  const activeLinks = isLanding ? LANDING_NAV_LINKS : NAV_LINKS

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 z-50 h-16 flex items-center justify-between px-[5%] transition-shadow duration-200',
          'bg-[#4A1FA8] dark:bg-[#1A1428]',
          scrolled && 'shadow-[0_4px_28px_rgba(74,31,168,.4)]'
        )}
      >
        {/* Brand */}
        <Link href="/landing" className="flex flex-col leading-none text-white hover:opacity-90 transition-opacity flex-shrink-0">
          <span className="text-xl font-bold tracking-tight">Reachly</span>
          <span className="text-[10px] font-normal text-[#B89EF0] uppercase tracking-widest">influencer platform</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {/* Search icon — only on landing */}
          {isLanding && (
            <button
              onClick={() => setSearchOpen(true)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {activeLinks.map(({ href, label }) => (
            isLanding ? (
              <a
                key={href}
                href={href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-150"
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm transition-colors duration-150',
                  pathname === href ? 'text-white font-medium' : 'text-white/70 hover:text-white'
                )}
              >
                {label}
              </Link>
            )
          ))}

          {/* Plataforma CTA — only on landing */}
          {isLanding && (
            <Link
              href="/"
              className="text-sm text-white font-medium hover:text-[#C4AEFA] transition-colors duration-150"
            >
              Plataforma →
            </Link>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search trigger — only on non-landing */}
          {!isLanding && (
            <>
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/15 rounded-lg px-3 py-1.5 text-sm transition-all duration-150"
                aria-label="Buscar"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="text-xs hidden lg:inline">Buscar</span>
                <kbd className="hidden lg:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/12 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/12 transition-colors"
            aria-label="Cambiar tema"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Login / Register */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center bg-white text-[#4A1FA8] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#F0E8FF] transition-colors duration-150"
          >
            {isLanding ? 'Iniciar sesión' : 'Registrarse'}
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/12 transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 z-40 bg-[#4A1FA8] dark:bg-[#1A1428] border-t border-white/10 shadow-lg animate-slide-down">
          <div className="flex flex-col gap-1 p-5">
            {activeLinks.map(({ href, label }) => (
              isLanding ? (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base py-2 px-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'text-base py-2 px-3 rounded-lg transition-colors',
                    pathname === href ? 'text-white bg-white/15 font-medium' : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {label}
                </Link>
              )
            ))}
            {isLanding && (
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-base py-2 px-3 rounded-lg text-white font-medium hover:bg-white/10 transition-colors"
              >
                Plataforma →
              </Link>
            )}
            <Link
              href={isLanding ? '/login' : '/registro'}
              onClick={() => setMenuOpen(false)}
              className="mt-3 text-center bg-white text-[#4A1FA8] font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-[#F0E8FF] transition-colors"
            >
              {isLanding ? 'Iniciar sesión' : 'Registrarse'}
            </Link>
          </div>
        </div>
      )}

      {/* Search modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex justify-center pt-[min(20vh,140px)] bg-[#0D0A1A]/60 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false) }}
        >
          <div className="w-[90%] max-w-[560px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[70vh] flex flex-col animate-scale-in">
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar influencers, campañas..."
                className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground outline-none"
              />
              <kbd className="text-[10px] border border-border text-muted-foreground px-1.5 py-0.5 rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div className="overflow-y-auto p-2">
              {query.length < 2 ? (
                <p className="text-center text-muted-foreground text-sm py-8">Escribe para buscar en toda la plataforma</p>
              ) : allResults.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-8">Sin resultados para &ldquo;{query}&rdquo;</p>
              ) : (
                <>
                  {results.influencers.length > 0 && (
                    <>
                      <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Influencers</p>
                      {results.influencers.map((inf, idx) => (
                        <button
                          key={inf.id}
                          onClick={() => navigate({ type: 'influencer', id: inf.id, name: inf.nombre, sub: inf.categoria, iniciales: inf.iniciales, categoria: inf.categoria })}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                            activeIdx === idx ? 'bg-accent' : 'hover:bg-accent/50'
                          )}
                        >
                          <InfluencerAvatar iniciales={inf.iniciales} categoria={inf.categoria} size="sm" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{inf.nombre}</p>
                            <p className="text-xs text-muted-foreground">{inf.categoria} · {inf.seguidores.toLocaleString()} seg.</p>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F0E8FF] text-[#4A1FA8]">Influencer</span>
                        </button>
                      ))}
                    </>
                  )}
                  {results.campanas.length > 0 && (
                    <>
                      <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">Campañas</p>
                      {results.campanas.map((c, idx) => {
                        const globalIdx = results.influencers.length + idx
                        return (
                          <button
                            key={c.id}
                            onClick={() => navigate({ type: 'campana', id: c.id, name: c.titulo, sub: c.marca, iniciales: c.iniciales, categoria: c.categoria })}
                            className={cn(
                              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                              activeIdx === globalIdx ? 'bg-accent' : 'hover:bg-accent/50'
                            )}
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-bold text-blue-800 dark:text-blue-300 flex-shrink-0">
                              {c.iniciales}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{c.titulo}</p>
                              <p className="text-xs text-muted-foreground">{c.marca} · {c.categoria}</p>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Campaña</span>
                          </button>
                        )
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
