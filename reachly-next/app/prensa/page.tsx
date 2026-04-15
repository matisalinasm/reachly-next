import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Prensa — Reachly' }

const NOTAS = [
  { medio: 'La Nación', titulo: '"Reachly, la startup argentina que quiere ser el LinkedIn de los influencers"', fecha: 'Mar 2025', logo: 'LN' },
  { medio: 'Infobae', titulo: '"La plataforma que revoluciona el marketing de influencers en LATAM"', fecha: 'Feb 2025', logo: 'IB' },
  { medio: 'TechCrunch', titulo: '"Reachly raises seed round to connect brands with Latin American influencers"', fecha: 'Ene 2025', logo: 'TC' },
  { medio: 'Forbes Argentina', titulo: '"Las 10 startups argentinas más prometedoras de 2025"', fecha: 'Dic 2024', logo: 'FB' },
]

export default function PrensaPage() {
  return (
    <div className="max-w-[900px] mx-auto px-[5%] py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">Reachly en la prensa</h1>
        <p className="text-muted-foreground">Para consultas de medios, escribinos a <span className="text-[#7B52D4]">prensa@reachly.app</span></p>
      </div>

      {/* Kit de prensa */}
      <div className="bg-gradient-to-br from-[#4A1FA8] to-[#2E1270] rounded-2xl p-8 text-white mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Kit de prensa</h2>
          <p className="text-white/70 text-sm">Logos, imágenes, datos clave y bio oficial para periodistas.</p>
        </div>
        <button className="bg-white text-[#4A1FA8] font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#F0E8FF] transition-colors">
          Descargar kit
        </button>
      </div>

      {/* Cobertura */}
      <h2 className="text-xl font-bold text-foreground mb-6">Cobertura destacada</h2>
      <div className="space-y-4 mb-12">
        {NOTAS.map(n => (
          <div key={n.titulo} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:border-[#B89EF0] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground flex-shrink-0">
              {n.logo}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#7B52D4] mb-1">{n.medio} · {n.fecha}</p>
              <p className="text-sm font-medium text-foreground leading-snug">{n.titulo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contacto */}
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <h2 className="text-lg font-bold text-foreground mb-2">Contacto de prensa</h2>
        <p className="text-muted-foreground text-sm mb-4">¿Sos periodista o trabajás en medios? Estamos disponibles para entrevistas, datos exclusivos y demos.</p>
        <div className="space-y-1 text-sm">
          <p className="text-foreground">📧 <span className="text-[#7B52D4]">prensa@reachly.app</span></p>
          <p className="text-foreground">📱 <span className="text-[#7B52D4]">+54 11 4000-0000</span></p>
        </div>
      </div>
    </div>
  )
}
