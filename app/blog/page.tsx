'use client'
import Link from 'next/link'
import { useState } from 'react'

const POSTS = [
  { id: 1, titulo: 'Cómo calcular el ROI real de una campaña con influencers en 5 pasos', extracto: 'Muchas marcas invierten en influencer marketing sin saber si sus campañas son rentables. Te damos la fórmula exacta para medirlo.', categoria: 'Guías', fecha: '10 abr 2025', minutos: 6, emoji: '📊' },
  { id: 2, titulo: 'Guía completa para crear un brief de campaña que los influencers amen', extracto: 'Un buen brief es la diferencia entre contenido mediocre y una campaña viral. Aquí está la plantilla que usan las mejores marcas.', categoria: 'Guías', fecha: '5 abr 2025', minutos: 5, emoji: '📝' },
  { id: 3, titulo: 'Cuánto cobrar por una colaboración: la guía de tarifas para creadores en 2025', extracto: 'Desde stories hasta reels, desde nano hasta mega-influencer. Los rangos de precios reales que manejan las marcas hoy.', categoria: 'Para influencers', fecha: '1 abr 2025', minutos: 7, emoji: '💰' },
  { id: 4, titulo: 'Cómo Nike Chile logró 2.4M de alcance con solo 15 influencers en Reachly', extracto: 'El equipo de marketing de Nike Chile nos cuenta cómo pasaron de campañas masivas ineficientes a colaboraciones quirúrgicas.', categoria: 'Casos de éxito', fecha: '25 mar 2025', minutos: 8, emoji: '🏆' },
  { id: 5, titulo: 'IA en el influencer marketing: cómo los algoritmos están transformando la selección de creadores', extracto: 'Del match manual al match automatizado. Exploramos cómo la inteligencia artificial está cambiando la industria en tiempo real.', categoria: 'Tendencias', fecha: '18 mar 2025', minutos: 6, emoji: '🤖' },
  { id: 6, titulo: 'Las 7 métricas que toda marca debe rastrear antes de elegir un influencer', extracto: 'Seguidores, engagement rate, alcance, autenticidad de audiencia... ¿cuáles son realmente las que importan? Te lo explicamos.', categoria: 'Análisis', fecha: '10 mar 2025', minutos: 5, emoji: '📈' },
]

const FEATURED = {
  titulo: 'El auge del nano-influencer en LATAM: por qué las marcas están apostando a audiencias pequeñas pero poderosas',
  extracto: 'Los micro y nano influencers están redefiniendo el influencer marketing en la región. Con tasas de engagement hasta 4 veces superiores a las cuentas masivas, descubrí por qué las marcas más inteligentes están redirigiendo su presupuesto.',
  categoria: 'Tendencias',
  fecha: '12 abr 2025',
  minutos: 8,
  emoji: '📱',
  autor: 'Laura Castillo',
  autorIniciales: 'LC',
}

const CATEGORIAS = ['Todas', 'Guías', 'Tendencias', 'Análisis', 'Para influencers', 'Casos de éxito']

export default function BlogPage() {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] text-center px-[5%] py-14">
        <h1 className="text-white text-[clamp(28px,4vw,44px)] font-bold">Blog de Reachly</h1>
        <p className="text-white/60 mt-3 text-base max-w-md mx-auto">Recursos, tendencias y guías para influencers y marcas.</p>
      </div>

      <div className="max-w-[1100px] mx-auto px-[5%] py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIAS.map((c, i) => (
            <span key={c} className={`text-sm px-4 py-1.5 rounded-full font-medium cursor-pointer transition-colors ${i === 0 ? 'bg-[#4A1FA8] text-white' : 'bg-card border border-border text-muted-foreground hover:border-[#C4AEFA] hover:text-foreground'}`}>
              {c}
            </span>
          ))}
        </div>

        {/* Featured */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-10 flex flex-col lg:flex-row">
          <div className="w-full lg:w-64 flex-shrink-0 bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] flex items-center justify-center text-[72px] py-12 lg:py-0">
            {FEATURED.emoji}
          </div>
          <div className="p-7 flex flex-col justify-center">
            <span className="text-xs font-semibold text-[#7B52D4] uppercase tracking-wider mb-3">{FEATURED.categoria}</span>
            <h2 className="text-xl font-bold text-foreground leading-snug mb-3 hover:text-[#4A1FA8] dark:hover:text-[#B89EF0] transition-colors cursor-pointer">{FEATURED.titulo}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{FEATURED.extracto}</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4A1FA8] flex items-center justify-center text-xs font-bold text-white">{FEATURED.autorIniciales}</div>
              <div>
                <p className="text-xs font-semibold text-foreground">{FEATURED.autor}</p>
                <p className="text-[10px] text-muted-foreground">{FEATURED.fecha} · {FEATURED.minutos} min de lectura</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map(post => (
            <div key={post.id} className="bg-card border border-border rounded-2xl p-6 hover:border-[#B89EF0] hover:shadow-[0_4px_20px_rgba(74,31,168,.09)] transition-all group cursor-pointer">
              <div className="text-3xl mb-4">{post.emoji}</div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7B52D4]">{post.categoria}</span>
              <h3 className="text-base font-bold text-foreground mt-2 mb-2 group-hover:text-[#4A1FA8] dark:group-hover:text-[#B89EF0] transition-colors leading-snug">{post.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.extracto}</p>
              <p className="text-xs text-muted-foreground">{post.fecha} · {post.minutos} min</p>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Recibí los mejores insights en tu inbox</h3>
          <p className="text-white/60 text-sm mb-6">Tendencias, casos de éxito y guías prácticas. Sin spam.</p>
          {subscribed ? (
            <p className="text-white/80 font-medium">✅ ¡Te suscribiste! Próximamente recibirás novedades.</p>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => { e.preventDefault(); setSubscribed(true) }}>
              <input type="email" required placeholder="tu@email.com" className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white/50 text-sm transition-colors" />
              <button type="submit" className="bg-white text-[#4A1FA8] font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#F0E8FF] transition-colors flex-shrink-0">
                Suscribirse
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
