'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { Edit2, Camera, Plus, X, ExternalLink, Save, Loader2, MapPin, Grid3x3, User } from 'lucide-react'

const REDES_CONFIG = [
  { id: 'instagram', label: 'Instagram', prefix: '@', icon: <span className="text-xs font-black">IG</span>, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
  { id: 'tiktok', label: 'TikTok', prefix: '@', icon: <span className="text-xs font-black">TK</span>, color: 'text-foreground', bg: 'bg-muted' },
  { id: 'youtube', label: 'YouTube', prefix: '', icon: <span className="text-xs font-black">YT</span>, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { id: 'twitter', label: 'Twitter/X', prefix: '@', icon: <span className="text-xs font-black">X</span>, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20' },
  { id: 'linkedin', label: 'LinkedIn', prefix: '', icon: <span className="text-xs font-black">in</span>, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
]

const CATEGORIAS_LIST = ['Moda', 'Tech', 'Fitness', 'Gastronomía', 'Viajes', 'Gaming', 'Música', 'Arte', 'Educación', 'Lifestyle']

interface Profile {
  id: string
  nombre: string
  bio: string | null
  ubicacion: string | null
  avatar_url: string | null
  tipo: 'influencer' | 'marca'
  redes: Record<string, string> | null
  categorias: string[] | null
  portfolio: PortfolioItem[] | null
}

interface PortfolioItem {
  id: string
  url: string
  caption: string
  platform: string
}

type Tab = 'perfil' | 'blog'

export default function PerfilPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('perfil')
  const [editOpen, setEditOpen] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [saving, setSaving] = useState(false)
  const [addPostOpen, setAddPostOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({ nombre: '', bio: '', ubicacion: '' })
  const [redes, setRedes] = useState<Record<string, string>>({})
  const [categorias, setCategorias] = useState<string[]>([])
  const [newPost, setNewPost] = useState({ url: '', caption: '', platform: 'instagram' })

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setProfile(data as Profile)
        setForm({ nombre: data.nombre ?? '', bio: data.bio ?? '', ubicacion: data.ubicacion ?? '' })
        setRedes(data.redes ?? {})
        setCategorias(data.categorias ?? [])
      }
      setLoading(false)
    }
    load()
  }, [router])

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !profile) return
    setUploadingAvatar(true)
    const ext = file.name.split('.').pop()
    const path = `${profile.id}/avatar.${ext}`
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
      const updates: Promise<any>[] = [
        supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id),
      ]
      if (profile.tipo === 'influencer') {
        updates.push(
          supabase.from('influencers').upsert({ profile_id: profile.id, avatar_url: publicUrl, full_name: profile.nombre }, { onConflict: 'profile_id' })
        )
      }
      await Promise.all(updates)
      setProfile(p => p ? { ...p, avatar_url: publicUrl } : p)
    }
    setUploadingAvatar(false)
  }

  async function handleSaveProfile() {
    if (!profile) return
    setSaving(true)

    const ops: Promise<any>[] = [
      supabase.from('profiles').update({
        nombre: form.nombre, bio: form.bio, ubicacion: form.ubicacion,
        redes, categorias, updated_at: new Date().toISOString(),
      }).eq('id', profile.id),
      supabase.auth.updateUser({ data: { nombre: form.nombre } }),
    ]

    // Sincronizar tabla influencers si corresponde
    if (profile.tipo === 'influencer') {
      ops.push(
        supabase.from('influencers').upsert({
          profile_id: profile.id,
          full_name: form.nombre,
          bio: form.bio,
          location: form.ubicacion,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'profile_id' })
      )
    }

    await Promise.all(ops)
    setProfile(p => p ? { ...p, ...form, redes, categorias } : p)
    setSaving(false)
    setEditOpen(false)
  }

  async function handleAddPost() {
    if (!profile || !newPost.url) return
    const item: PortfolioItem = { id: crypto.randomUUID(), url: newPost.url, caption: newPost.caption, platform: newPost.platform }
    const updated = [...(profile.portfolio ?? []), item]
    await supabase.from('profiles').update({ portfolio: updated }).eq('id', profile.id)
    setProfile(p => p ? { ...p, portfolio: updated } : p)
    setNewPost({ url: '', caption: '', platform: 'instagram' })
    setAddPostOpen(false)
  }

  async function handleDeletePost(id: string) {
    if (!profile) return
    const updated = (profile.portfolio ?? []).filter(p => p.id !== id)
    await supabase.from('profiles').update({ portfolio: updated }).eq('id', profile.id)
    setProfile(p => p ? { ...p, portfolio: updated } : p)
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!profile) return null

  const nombre = profile.nombre || 'Sin nombre'
  const iniciales = nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase() || '?'
  const redesFilled = Object.entries(profile.redes ?? {}).filter(([, v]) => v)
  const portfolioCount = (profile.portfolio ?? []).length

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      {/* Full-width cover */}
      <div className="h-52 bg-gradient-to-br from-[#4A1FA8] via-[#6C3BF5] to-[#7B52D4] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #ffffff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C4AEFA 0%, transparent 40%)'
        }} />
      </div>

      <div className="max-w-[1100px] mx-auto px-[5%]">
        {/* Avatar row */}
        <div className="flex flex-wrap items-end justify-between gap-4 -mt-14 mb-6 relative z-10">
          <div className="flex items-end gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl border-4 border-background overflow-hidden bg-[#4A1FA8] flex items-center justify-center shadow-xl">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={nombre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-3xl font-bold">{iniciales}</span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#4A1FA8] border-2 border-background flex items-center justify-center hover:bg-[#6C3BF5] transition-colors shadow-md"
              >
                {uploadingAvatar ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <Camera className="w-3.5 h-3.5 text-white" />}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            {/* Name + meta */}
            <div className="pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{nombre}</h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0E8FF] dark:bg-[#2A1F45] text-[#4A1FA8] dark:text-[#B89EF0] capitalize">
                  {profile.tipo}
                </span>
              </div>
              {profile.ubicacion && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.ubicacion}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 border border-border bg-card text-sm font-medium text-foreground px-4 py-2.5 rounded-xl hover:bg-accent transition-colors shadow-sm mb-1"
          >
            <Edit2 className="w-3.5 h-3.5" /> Editar perfil
          </button>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-sm text-foreground/80 max-w-2xl mb-6 leading-relaxed">{profile.bio}</p>
        )}

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Posts', value: portfolioCount.toString(), icon: <Grid3x3 className="w-4 h-4" /> },
            { label: 'Redes', value: redesFilled.length.toString(), icon: <span className="text-sm font-black">@</span> },
            { label: 'Categorías', value: (profile.categorias ?? []).length.toString(), icon: <span className="text-sm">#</span> },
            { label: 'Tipo', value: profile.tipo === 'influencer' ? 'Influencer' : 'Marca', icon: <User className="w-4 h-4" /> },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F0E8FF] dark:bg-[#2A1F45] flex items-center justify-center text-[#4A1FA8] dark:text-[#B89EF0] flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-foreground leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit mb-6">
          {(['perfil', 'blog'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-6 py-2 text-sm font-medium rounded-lg transition-all',
                tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'blog' ? 'Portfolio / Blog' : 'Perfil'}
            </button>
          ))}
        </div>

        {/* Tab: Perfil */}
        {tab === 'perfil' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
            {/* Left */}
            <div className="space-y-5">
              {/* Redes */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-foreground">Redes sociales</h2>
                  <button onClick={() => setEditOpen(true)} className="text-xs text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">Editar</button>
                </div>
                {redesFilled.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground mb-2">No tenés redes cargadas</p>
                    <button onClick={() => setEditOpen(true)} className="text-xs text-[#7B52D4] hover:text-[#4A1FA8] font-medium transition-colors">+ Agregar</button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {redesFilled.map(([red, handle]) => {
                      const cfg = REDES_CONFIG.find(r => r.id === red)
                      return (
                        <div key={red} className="flex items-center gap-3">
                          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', cfg?.bg, cfg?.color)}>
                            {cfg?.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground">{cfg?.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{cfg?.prefix}{handle}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Categorías */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-foreground">Categorías</h2>
                  <button onClick={() => setEditOpen(true)} className="text-xs text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">Editar</button>
                </div>
                {(profile.categorias ?? []).length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground mb-2">Sin categorías</p>
                    <button onClick={() => setEditOpen(true)} className="text-xs text-[#7B52D4] hover:text-[#4A1FA8] font-medium transition-colors">+ Agregar</button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.categorias!.map(cat => (
                      <span key={cat} className="text-xs px-3 py-1.5 rounded-full bg-[#F0E8FF] dark:bg-[#2A1F45] text-[#4A1FA8] dark:text-[#B89EF0] font-medium">{cat}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Completar perfil prompt */}
              {(!profile.bio || redesFilled.length === 0) && (
                <div className="bg-gradient-to-br from-[#F0E8FF] to-[#E8E0FB] dark:from-[#2A1F45] dark:to-[#1A1428] border border-[#C4AEFA]/40 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-[#4A1FA8] dark:text-[#B89EF0] mb-1">Completá tu perfil</h3>
                  <p className="text-xs text-[#4A1FA8]/70 dark:text-[#B89EF0]/70 mb-3">Los perfiles completos reciben 3x más visibilidad de marcas.</p>
                  <button
                    onClick={() => setEditOpen(true)}
                    className="text-xs font-semibold text-white bg-[#4A1FA8] px-4 py-2 rounded-lg hover:bg-[#6C3BF5] transition-colors"
                  >
                    Completar ahora
                  </button>
                </div>
              )}
            </div>

            {/* Right */}
            <div className="lg:col-span-2 space-y-5">
              {/* Sobre mí */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-foreground">Sobre mí</h2>
                  <button onClick={() => setEditOpen(true)} className="text-xs text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">Editar</button>
                </div>
                {profile.bio ? (
                  <p className="text-sm text-foreground/80 leading-relaxed">{profile.bio}</p>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
                    <p className="text-sm text-muted-foreground mb-3">Contá algo sobre vos para que las marcas te conozcan mejor.</p>
                    <button onClick={() => setEditOpen(true)} className="text-sm text-[#7B52D4] hover:text-[#4A1FA8] font-medium transition-colors">+ Agregar bio</button>
                  </div>
                )}
              </div>

              {/* Portfolio preview */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-foreground">Portfolio reciente</h2>
                  <button onClick={() => setTab('blog')} className="text-xs text-[#7B52D4] hover:text-[#4A1FA8] transition-colors">
                    Ver todo ({portfolioCount}) →
                  </button>
                </div>
                {portfolioCount === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
                    <p className="text-sm text-muted-foreground mb-3">Mostrá tu mejor contenido a las marcas.</p>
                    <button
                      onClick={() => { setTab('blog'); setAddPostOpen(true) }}
                      className="text-sm text-[#7B52D4] hover:text-[#4A1FA8] font-medium transition-colors"
                    >
                      + Agregar primer post
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {(profile.portfolio ?? []).slice(0, 6).map(post => {
                      const cfg = REDES_CONFIG.find(r => r.id === post.platform)
                      return (
                        <a
                          key={post.id}
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aspect-square rounded-xl bg-gradient-to-br from-[#F0E8FF] to-[#E8E0FB] dark:from-[#2A1F45] dark:to-[#1A1428] flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity"
                        >
                          <span className={cn('text-sm font-black', cfg?.color)}>{cfg?.icon}</span>
                          {post.caption && <span className="text-[9px] text-muted-foreground text-center px-2 line-clamp-2">{post.caption}</span>}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Blog / Portfolio */}
        {tab === 'blog' && (
          <div className="pb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-foreground">Mi portfolio</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{portfolioCount} publicaciones</p>
              </div>
              <button
                onClick={() => setAddPostOpen(true)}
                className="flex items-center gap-2 bg-[#4A1FA8] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#6C3BF5] transition-colors"
              >
                <Plus className="w-4 h-4" /> Agregar post
              </button>
            </div>

            {portfolioCount === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">No hay posts todavía</h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">Agregá links a tus mejores posts de Instagram, TikTok, YouTube y más para que las marcas vean tu trabajo.</p>
                <button
                  onClick={() => setAddPostOpen(true)}
                  className="bg-[#4A1FA8] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#6C3BF5] transition-colors"
                >
                  Agregar mi primer post
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {profile.portfolio!.map(post => {
                  const cfg = REDES_CONFIG.find(r => r.id === post.platform)
                  return (
                    <div key={post.id} className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
                      <div className={cn('h-40 flex flex-col items-center justify-center gap-2 relative', cfg?.bg ?? 'bg-muted')}>
                        <span className={cn('text-2xl font-black', cfg?.color)}>{cfg?.label}</span>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-4">
                        {post.caption && <p className="text-sm text-foreground line-clamp-2 mb-3">{post.caption}</p>}
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7B52D4] hover:text-[#4A1FA8] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> Ver post
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit profile modal */}
      {editOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) setEditOpen(false) }}>
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Editar perfil</h2>
              <button onClick={() => setEditOpen(false)} className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="overflow-y-auto p-6 space-y-5">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Información básica</h3>
                <div className="space-y-3">
                  {[
                    { id: 'nombre', label: 'Nombre', placeholder: 'Tu nombre completo' },
                    { id: 'ubicacion', label: 'Ubicación', placeholder: 'Ciudad, País' },
                  ].map(f => (
                    <div key={f.id}>
                      <label className="text-xs font-semibold text-foreground block mb-1.5">{f.label}</label>
                      <input
                        type="text"
                        value={form[f.id as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10 transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1.5">Bio</label>
                    <textarea
                      value={form.bio}
                      onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                      placeholder="Contá algo sobre vos..."
                      maxLength={250}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] focus:ring-2 focus:ring-[#7B52D4]/10 transition-all resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right mt-1">{form.bio.length}/250</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Redes sociales</h3>
                <div className="space-y-2.5">
                  {REDES_CONFIG.map(r => (
                    <div key={r.id} className="flex items-center gap-3">
                      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', r.bg, r.color)}>{r.icon}</div>
                      <div className="relative flex-1">
                        {r.prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{r.prefix}</span>}
                        <input
                          type="text"
                          value={redes[r.id] ?? ''}
                          onChange={e => setRedes(p => ({ ...p, [r.id]: e.target.value }))}
                          placeholder={r.label}
                          className={cn('w-full py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-all', r.prefix ? 'pl-7 pr-4' : 'px-4')}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categorías</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIAS_LIST.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategorias(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                      className={cn('text-xs px-3 py-1.5 rounded-full border font-medium transition-all', categorias.includes(cat) ? 'bg-[#4A1FA8] text-white border-[#4A1FA8]' : 'bg-card text-foreground border-border hover:border-[#C4AEFA]')}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex gap-3">
              <button onClick={() => setEditOpen(false)} className="px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent transition-colors">Cancelar</button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-[#4A1FA8] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#6C3BF5] transition-colors disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add post modal */}
      {addPostOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) setAddPostOpen(false) }}>
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Agregar post al portfolio</h2>
              <button onClick={() => setAddPostOpen(false)} className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-2">Plataforma</label>
                <div className="flex flex-wrap gap-2">
                  {REDES_CONFIG.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setNewPost(p => ({ ...p, platform: r.id }))}
                      className={cn('flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all', newPost.platform === r.id ? 'bg-[#4A1FA8] text-white border-[#4A1FA8]' : 'border-border text-foreground hover:border-[#C4AEFA]')}
                    >
                      {r.icon} {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">URL del post</label>
                <input
                  type="url"
                  value={newPost.url}
                  onChange={e => setNewPost(p => ({ ...p, url: e.target.value }))}
                  placeholder="https://instagram.com/p/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Descripción <span className="text-muted-foreground font-normal">(opcional)</span></label>
                <textarea
                  value={newPost.caption}
                  onChange={e => setNewPost(p => ({ ...p, caption: e.target.value }))}
                  placeholder="Contá de qué trata el post..."
                  maxLength={150}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-all resize-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex gap-3">
              <button onClick={() => setAddPostOpen(false)} className="px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent transition-colors">Cancelar</button>
              <button
                onClick={handleAddPost}
                disabled={!newPost.url}
                className="flex-1 bg-[#4A1FA8] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#6C3BF5] transition-colors disabled:opacity-40"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
