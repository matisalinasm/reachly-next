import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Política de cookies — Reachly' }

const TIPOS = [
  { tipo: 'Esenciales', desc: 'Necesarias para que la plataforma funcione. No pueden desactivarse.', ejemplos: 'Sesión, autenticación, preferencias de seguridad.' },
  { tipo: 'Funcionales', desc: 'Recuerdan tus preferencias para una mejor experiencia.', ejemplos: 'Tema oscuro/claro, idioma, filtros guardados.' },
  { tipo: 'Analíticas', desc: 'Nos ayudan a entender cómo se usa la plataforma para mejorarla.', ejemplos: 'Páginas visitadas, tiempo de sesión, errores.' },
  { tipo: 'Marketing', desc: 'Usadas para mostrarte publicidad relevante (con tu consentimiento).', ejemplos: 'Retargeting, conversiones de campañas.' },
]

export default function CookiesPage() {
  return (
    <div className="max-w-[800px] mx-auto px-[5%] py-12">
      <h1 className="text-3xl font-bold text-foreground mb-2">Política de cookies</h1>
      <p className="text-muted-foreground text-sm mb-8">Última actualización: 1 de enero de 2025</p>

      <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
        <section>
          <p>Reachly usa cookies y tecnologías similares para mejorar tu experiencia, analizar el uso de la plataforma y mostrarte contenido relevante. Esta política explica qué cookies usamos y cómo podés gestionarlas.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Tipos de cookies que usamos</h2>
          <div className="space-y-4">
            {TIPOS.map(t => (
              <div key={t.tipo} className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-bold text-foreground mb-1">{t.tipo}</h3>
                <p className="text-muted-foreground mb-2">{t.desc}</p>
                <p className="text-xs text-muted-foreground"><span className="font-semibold">Ejemplos:</span> {t.ejemplos}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Cómo gestionar cookies</h2>
          <p className="mb-3">Podés controlar las cookies desde la configuración de tu navegador. Ten en cuenta que desactivar ciertas cookies puede afectar el funcionamiento de la plataforma.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
            <li>Firefox: Preferencias → Privacidad y seguridad</li>
            <li>Safari: Preferencias → Privacidad</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Cookies de terceros</h2>
          <p>Algunos de nuestros socios (analytics, publicidad) pueden establecer cookies en tu dispositivo. Revisá sus respectivas políticas de privacidad para más información.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Contacto</h2>
          <p>Para preguntas sobre nuestra política de cookies: <span className="text-[#7B52D4]">privacidad@reachly.app</span></p>
        </section>
      </div>
    </div>
  )
}
