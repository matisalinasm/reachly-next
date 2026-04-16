'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

const CATEGORIAS = ['Moda', 'Tech', 'Fitness', 'Gastronomía', 'Viajes', 'Gaming', 'Música', 'Arte', 'Educación', 'Lifestyle']
const OBJETIVOS = ['Conseguir campañas', 'Hacer networking', 'Crecer mi audiencia', 'Encontrar influencers', 'Publicar campañas', 'Analizar tendencias']
const REDES = [
  { id: 'instagram', label: 'Instagram', prefix: '@', placeholder: 'tu_usuario' },
  { id: 'tiktok', label: 'TikTok', prefix: '@', placeholder: 'tu_usuario' },
  { id: 'youtube', label: 'YouTube', prefix: '', placeholder: 'tu_canal' },
  { id: 'twitter', label: 'Twitter/X', prefix: '@', placeholder: 'tu_usuario' },
]

type Step = 1 | 2 | 3 | 4

export default function OnboardingPage() {
  const router = useRouter()
  const { user, setUser, completeOnboarding } = useUserStore()
  const [step, setStep] = useState<Step>(1)
  const [nombre, setNombre] = useState(user?.nombre ?? '')
  const [bio, setBio] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [selectedObjs, setSelectedObjs] = useState<string[]>([])
  const [redes, setRedes] = useState<Record<string, string>>({})

  const pct = (step / 4) * 100

  function toggleChip(val: string, arr: string[], setArr: (v: string[]) => void) {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  async function finish() {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (!authUser) return

    const tipo = user?.tipo ?? authUser.user_metadata?.tipo ?? 'influencer'

    const ops: Promise<any>[] = [
      supabase.auth.updateUser({
        data: { nombre, bio, ubicacion, redes, categorias: selectedCats, objetivos: selectedObjs },
      }),
      supabase.from('profiles').upsert({
        id: authUser.id,
        nombre,
        bio,
        ubicacion,
        redes,
        categorias: selectedCats,
        objetivos: selectedObjs,
        updated_at: new Date().toISOString(),
      }),
    ]

    // Si es influencer, crear/actualizar registro en la tabla influencers
    if (tipo === 'influencer') {
      ops.push(
        supabase.from('influencers').upsert({
          profile_id: authUser.id,
          full_name: nombre,
          bio,
          location: ubicacion,
          followers_count: 0,
          engagement_rate: 0,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'profile_id' })
      )
    }

    await Promise.all(ops)

    setUser({ nombre, bio, ubicacion, tipo, redes })
    completeOnboarding()
    setStep(4)
  }

  const iniciales = nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase() || '?'

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background py-8 px-5">
      {/* Progress */}
      <div className="max-w-[620px] mx-auto mb-6">
        <div className="flex items-center gap-3 mb-3">
          {(['Tu perfil', 'Intereses', 'Redes', 'Listo'] as const).map((label, i) => {
            const s = (i + 1) as Step
            return (
              <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all',
                  step > s ? 'bg-emerald-500 text-white' : step === s ? 'bg-[#4A1FA8] text-white' : 'bg-border text-muted-foreground'
                )}>
                  {step > s ? '✓' : s}
                </div>
                <span className={cn('text-xs hidden sm:block', step === s ? 'text-[#4A1FA8] font-semibold' : 'text-muted-foreground')}>
                  {label}
                </span>
                {i < 3 && <div className={cn('flex-1 h-0.5 mx-1', step > s ? 'bg-emerald-500' : 'bg-border')} />}
              </div>
            )
          })}
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#4A1FA8] to-[#7B52D4] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="max-w-[620px] mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8">

          {/* Step 1: Profile */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-foreground mb-2">Completá tu perfil</h2>
              <p className="text-muted-foreground text-sm mb-6">Contanos un poco sobre vos.</p>

              {/* Avatar preview */}
              <div className="flex items-center gap-4 p-4 bg-muted rounded-xl mb-6">
                <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="24" fill="#4A1FA8" />
                    <text x="24" y="24" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="17" fontWeight="600" fontFamily="sans-serif">{iniciales}</text>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{nombre || 'Tu nombre'}</div>
                  <div className="text-xs text-muted-foreground">Nuevo en Reachly</div>
                </div>
              </div>

              <div className="space-y-4 mb-7">
                {[
                  { label: 'Nombre completo', value: nombre, onChange: setNombre, placeholder: 'Tu nombre', type: 'text' },
                  { label: 'Ubicación', value: ubicacion, onChange: setUbicacion, placeholder: 'Ciudad, país', type: 'text' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-foreground block mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={e => f.onChange(e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">Bio</label>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Contá algo sobre vos en una o dos frases..."
                    maxLength={200}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10 transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => nombre.trim() && setStep(2)}
                  className="bg-[#4A1FA8] text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-foreground mb-2">Tus intereses</h2>
              <p className="text-muted-foreground text-sm mb-6">Seleccioná las categorías que más te interesan.</p>

              <div className="mb-6">
                <label className="text-xs font-semibold text-foreground block mb-3">Categorías</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIAS.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleChip(cat, selectedCats, setSelectedCats)}
                      className={cn(
                        'text-sm px-4 py-1.5 rounded-full border font-medium transition-all',
                        selectedCats.includes(cat) ? 'bg-[#4A1FA8] text-white border-[#4A1FA8]' : 'bg-card text-foreground border-border hover:border-[#C4AEFA]'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <label className="text-xs font-semibold text-foreground block mb-3">¿Qué buscás en Reachly?</label>
                <div className="flex flex-wrap gap-2">
                  {OBJETIVOS.map(obj => (
                    <button
                      key={obj}
                      onClick={() => toggleChip(obj, selectedObjs, setSelectedObjs)}
                      className={cn(
                        'text-sm px-4 py-1.5 rounded-full border font-medium transition-all',
                        selectedObjs.includes(obj) ? 'bg-[#4A1FA8] text-white border-[#4A1FA8]' : 'bg-card text-foreground border-border hover:border-[#C4AEFA]'
                      )}
                    >
                      {obj}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-5 py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent transition-colors">Atrás</button>
                <button onClick={() => setStep(3)} className="bg-[#4A1FA8] text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors">Continuar</button>
              </div>
            </div>
          )}

          {/* Step 3: Social networks */}
          {step === 3 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-foreground mb-2">Conectá tus redes</h2>
              <p className="text-muted-foreground text-sm mb-6">Opcional — podés completarlo desde tu perfil más tarde.</p>

              <div className="space-y-3 mb-7">
                {REDES.map(r => (
                  <div key={r.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                      {r.label.slice(0, 2)}
                    </div>
                    <div className="relative flex-1">
                      {r.prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{r.prefix}</span>}
                      <input
                        type="text"
                        value={redes[r.id] ?? ''}
                        onChange={e => setRedes(p => ({ ...p, [r.id]: e.target.value }))}
                        placeholder={r.placeholder}
                        className={cn(
                          'w-full py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-all',
                          r.prefix ? 'pl-7 pr-4' : 'px-4'
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="px-5 py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent transition-colors">Atrás</button>
                <button onClick={finish} className="bg-[#4A1FA8] text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors">Finalizar</button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="animate-fade-up text-center py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <svg className="w-9 h-9 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                ¡Bienvenido{nombre ? `, ${nombre.split(' ')[0]}` : ''}!
              </h2>
              <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
                Ya podés explorar influencers, descubrir campañas y conectar con las mejores marcas de LATAM.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/" className="block bg-[#4A1FA8] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors">
                  Explorar influencers
                </Link>
                <Link href="/campanas" className="block border border-border text-muted-foreground text-sm py-3 rounded-xl hover:border-[#B89EF0] transition-colors">
                  Ver campañas
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Omitir por ahora
          </Link>
        </div>
      </div>
    </div>
  )
}
