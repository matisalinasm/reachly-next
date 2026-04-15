'use client'
import { useState } from 'react'

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-[900px] mx-auto px-[5%] py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-3">Contacto</h1>
        <p className="text-muted-foreground">¿Tenés preguntas? Estamos para ayudarte.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info */}
        <div className="space-y-5">
          {[
            { icon: '📧', titulo: 'Email general', info: 'hola@reachly.app' },
            { icon: '💼', titulo: 'Marcas y enterprise', info: 'marcas@reachly.app' },
            { icon: '🌟', titulo: 'Para influencers', info: 'influencers@reachly.app' },
            { icon: '📰', titulo: 'Prensa', info: 'prensa@reachly.app' },
          ].map(c => (
            <div key={c.titulo} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <span className="text-xl">{c.icon}</span>
              <div>
                <p className="text-xs text-muted-foreground">{c.titulo}</p>
                <p className="text-sm font-medium text-[#7B52D4]">{c.info}</p>
              </div>
            </div>
          ))}
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Horario de atención</p>
            <p className="text-sm text-foreground">Lun–Vie, 9:00–18:00 (ART)</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-card border border-border rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-foreground mb-2">¡Mensaje enviado!</h2>
              <p className="text-muted-foreground text-sm">Te respondemos en menos de 24 horas hábiles.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">Nombre</label>
                  <input
                    required
                    type="text"
                    value={form.nombre}
                    onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Asunto</label>
                <input
                  required
                  type="text"
                  value={form.asunto}
                  onChange={e => setForm(p => ({ ...p, asunto: e.target.value }))}
                  placeholder="¿Sobre qué querés hablar?"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">Mensaje</label>
                <textarea
                  required
                  value={form.mensaje}
                  onChange={e => setForm(p => ({ ...p, mensaje: e.target.value }))}
                  placeholder="Contanos tu consulta..."
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4A1FA8] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#6C3BF5] transition-colors"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
