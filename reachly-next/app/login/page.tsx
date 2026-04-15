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
    })
    router.push('/')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-[#4A1FA8] mb-2">Reachly</div>
          <h1 className="text-xl font-bold text-foreground">Iniciar sesión</h1>
          <p className="text-muted-foreground text-sm mt-1">Bienvenido de vuelta</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
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
