'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

type Tipo = 'influencer' | 'marca'
type Step = 1 | 2 | 3

const TIPOS = [
  {
    id: 'influencer' as Tipo,
    icon: '🎤',
    title: 'Soy influencer',
    desc: 'Quiero conectar con marcas y conseguir campañas pagas.',
  },
  {
    id: 'marca' as Tipo,
    icon: '🏢',
    title: 'Soy una marca',
    desc: 'Quiero encontrar creadores para mis campañas de marketing.',
  },
]

export default function RegistroPage() {
  const router = useRouter()
  const { setUser } = useUserStore()
  const [step, setStep] = useState<Step>(1)
  const [tipo, setTipo] = useState<Tipo | null>(null)
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  function validate() {
    const e: Record<string, string> = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido'
    if (!form.email.trim()) e.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.password) e.password = 'La contraseña es requerida'
    else if (form.password.length < 8) e.password = 'Mínimo 8 caracteres'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setServerError('')

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          nombre: form.nombre,
          tipo: tipo,
        },
      },
    })

    setLoading(false)

    if (error) {
      setServerError(error.message)
      return
    }

    setUser({
      nombre: form.nombre,
      email: form.email,
      tipo: tipo!,
    })
    setStep(3)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[480px]">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={cn(
              'w-2 h-2 rounded-full transition-all',
              step === s ? 'bg-[#4A1FA8] w-6' : step > s ? 'bg-[#4A1FA8]' : 'bg-border'
            )} />
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          {/* Step 1: Type selection */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h1 className="text-2xl font-bold text-foreground mb-2">Crear cuenta</h1>
              <p className="text-muted-foreground text-sm mb-7">¿Cómo querés usar Reachly?</p>
              <div className="space-y-3 mb-8">
                {TIPOS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTipo(t.id)}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-150',
                      tipo === t.id
                        ? 'border-[#4A1FA8] bg-[#F0E8FF] dark:bg-[#2A1F45]'
                        : 'border-border hover:border-[#B89EF0] hover:bg-accent'
                    )}
                  >
                    <span className="text-3xl">{t.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => tipo && setStep(2)}
                disabled={!tipo}
                className="w-full bg-[#4A1FA8] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* Step 2: Form */}
          {step === 2 && (
            <div className="animate-fade-up">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {tipo === 'influencer' ? 'Crea tu perfil' : 'Perfil de tu marca'}
              </h1>
              <p className="text-muted-foreground text-sm mb-7">
                {tipo === 'influencer' ? 'Completa tus datos para conectar con marcas.' : 'Completa los datos de tu empresa.'}
              </p>
              <div className="space-y-4 mb-7">
                {[
                  { id: 'nombre', label: tipo === 'influencer' ? 'Nombre completo' : 'Nombre de la marca', type: 'text', placeholder: tipo === 'influencer' ? 'Tu nombre' : 'Nombre de tu empresa' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                  { id: 'password', label: 'Contraseña', type: 'password', placeholder: 'Mínimo 8 caracteres' },
                ].map(f => (
                  <div key={f.id}>
                    <label className="text-xs font-semibold text-foreground block mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.id as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all',
                        errors[f.id] ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10'
                      )}
                    />
                    {errors[f.id] && <p className="text-xs text-red-500 mt-1">{errors[f.id]}</p>}
                  </div>
                ))}
              </div>
              {serverError && (
                <p className="text-xs text-red-500 mb-4 text-center">{serverError}</p>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-5 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-accent">
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-[#4A1FA8] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="animate-fade-up text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-3xl mx-auto mb-5 animate-scale-in">
                🎉
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                ¡Bienvenido, {form.nombre.split(' ')[0]}!
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Tu cuenta está lista. Completá tu perfil para empezar.
              </p>
              <Link
                href="/onboarding"
                className="block w-full bg-[#4A1FA8] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors mb-3"
              >
                Completar perfil →
              </Link>
              <Link
                href="/"
                className="block w-full border border-border text-muted-foreground text-sm py-3 rounded-xl hover:border-[#B89EF0] transition-colors"
              >
                Explorar ahora
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-5">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-[#7B52D4] hover:text-[#4A1FA8] font-medium transition-colors">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
