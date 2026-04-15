'use client'
import { useState } from 'react'
import { InfluencerAvatar } from '@/components/ui/InfluencerAvatar'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'

const CONVS = [
  { id: 1, nombre: 'Nike Chile', iniciales: 'NK', categoria: 'Moda', lastMsg: '¡Perfecto! Confirmamos la campaña para la próxima semana.', time: '5 min', unread: 2 },
  { id: 2, nombre: 'Adidas LATAM', iniciales: 'AD', categoria: 'Fitness', lastMsg: 'Nos interesa tu perfil para nuestra campaña de verano.', time: '1h', unread: 1 },
  { id: 3, nombre: 'Samsung CL', iniciales: 'SM', categoria: 'Tech', lastMsg: 'Revisamos tu propuesta. Te contactamos pronto.', time: '3h', unread: 0 },
  { id: 4, nombre: 'Spotify', iniciales: 'SP', categoria: 'Música', lastMsg: 'Gracias por tu postulación a la campaña de podcasts.', time: 'Ayer', unread: 0 },
]

const INITIAL_MSGS = [
  { id: 1, from: 'them', text: '¡Hola! Vimos tu perfil y nos encanta tu contenido de moda.', time: '10:00' },
  { id: 2, from: 'me', text: '¡Muchas gracias! ¿En qué puedo ayudarlos?', time: '10:05' },
  { id: 3, from: 'them', text: 'Estamos lanzando una campaña de verano y queremos contarte con vos.', time: '10:07' },
  { id: 4, from: 'me', text: '¡Me interesa mucho! ¿Cuándo podríamos tener una llamada para ver los detalles?', time: '10:10' },
  { id: 5, from: 'them', text: '¡Perfecto! Confirmamos la campaña para la próxima semana.', time: '10:15' },
]

export default function MensajesPage() {
  const [activeConv, setActiveConv] = useState(CONVS[0])
  const [msgs, setMsgs] = useState(INITIAL_MSGS)
  const [input, setInput] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)

  function sendMsg() {
    if (!input.trim()) return
    setMsgs(p => [...p, { id: Date.now(), from: 'me', text: input.trim(), time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) }])
    setInput('')
  }

  return (
    <div className="max-w-[1100px] mx-auto px-[5%] py-8">
      <h1 className="text-xl font-bold text-foreground mb-5">Mensajes</h1>

      <div className="bg-card border border-border rounded-2xl overflow-hidden" style={{ height: 560 }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className={cn('w-full sm:w-72 border-r border-border flex-shrink-0 flex flex-col', !showSidebar && 'hidden sm:flex')}>
            <div className="p-4 border-b border-border">
              <input placeholder="Buscar conversaciones..." className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-[#7B52D4] transition-colors" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {CONVS.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => { setActiveConv(conv); setShowSidebar(false) }}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 border-b border-border text-left hover:bg-accent transition-colors',
                    activeConv.id === conv.id && 'bg-accent'
                  )}
                >
                  <InfluencerAvatar iniciales={conv.iniciales} categoria={conv.categoria} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-foreground">{conv.nombre}</span>
                      <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMsg}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#4A1FA8] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className={cn('flex-1 flex flex-col', showSidebar && 'hidden sm:flex')}>
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <button className="sm:hidden text-muted-foreground hover:text-foreground mr-1" onClick={() => setShowSidebar(true)}>←</button>
              <InfluencerAvatar iniciales={activeConv.iniciales} categoria={activeConv.categoria} size="sm" />
              <div>
                <div className="text-sm font-semibold text-foreground">{activeConv.nombre}</div>
                <div className="text-xs text-emerald-500">● En línea</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map(m => (
                <div key={m.id} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                    m.from === 'me'
                      ? 'bg-[#4A1FA8] text-white rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  )}>
                    {m.text}
                    <div className={cn('text-[10px] mt-1 text-right', m.from === 'me' ? 'text-white/60' : 'text-muted-foreground')}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
                placeholder="Escribí un mensaje..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-[#7B52D4] transition-colors"
              />
              <button
                onClick={sendMsg}
                className="w-10 h-10 rounded-xl bg-[#4A1FA8] hover:bg-[#6C3BF5] text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
