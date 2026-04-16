'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useUserStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    setLoading(false)

    if (error) {
      setError('Email o contraseña incorrectos')
      return
    }

    const meta = data.user.user_metadata
    setUser({
      nombre: meta.nombre ?? form.email.split('@')[0],
      email: form.email,
      tipo: meta.tipo ?? 'influencer',
      bio: meta.bio,
      ubicacion: meta.ubicacion,
      redes: meta.redes,
    })
    router.push('/')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <img src="/logo-reachly.svg" alt="Reachly" className="h-8 w-auto mx-auto mb-2" />
          <h1 className="text-xl font-bold text-foreground">Iniciar sesión</h1>
          <p className="text-muted-foreground text-sm mt-1">Bienvenido de vuelta</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-border rounded-xl py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors mb-5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">o</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10 transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-foreground">Contraseña</label>
                <button type="button" className="text-xs text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Tu contraseña"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10 transition-all"
              />
            </div>
            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full bg-[#4A1FA8] text-white font-semibold text-sm py-3 rounded-xl transition-all mt-2',
                loading ? 'opacity-70 cursor-wait' : 'hover:bg-[#6C3BF5]'
              )}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-5">
          ¿No tenés cuenta?{' '}
          <Link href="/registro" className="text-[#7B52D4] hover:text-[#4A1FA8] font-medium transition-colors">
            Registrarse gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
