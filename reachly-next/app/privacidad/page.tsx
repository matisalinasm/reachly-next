import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Política de privacidad — Reachly' }

export default function PrivacidadPage() {
  return (
    <div className="max-w-[800px] mx-auto px-[5%] py-12">
      <h1 className="text-3xl font-bold text-foreground mb-2">Política de privacidad</h1>
      <p className="text-muted-foreground text-sm mb-8">Última actualización: 1 de enero de 2025</p>

      <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">1. Información que recopilamos</h2>
          <p className="mb-2">Recopilamos información que nos proporcionás directamente:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Datos de registro (nombre, email, tipo de cuenta)</li>
            <li>Información de perfil (bio, ubicación, redes sociales)</li>
            <li>Datos de uso de la plataforma</li>
            <li>Comunicaciones a través de nuestra plataforma</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">2. Cómo usamos tu información</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Para proveer y mejorar nuestros servicios</li>
            <li>Para facilitar conexiones entre influencers y marcas</li>
            <li>Para enviarte notificaciones relevantes (con tu consentimiento)</li>
            <li>Para análisis internos y mejora del producto</li>
            <li>Para cumplir obligaciones legales</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">3. Compartir información</h2>
          <p>No vendemos tu información personal. La compartimos solo con:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Otras partes del acuerdo de colaboración (con tu consentimiento)</li>
            <li>Proveedores de servicios que nos ayudan a operar la plataforma</li>
            <li>Autoridades cuando sea requerido por ley</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">4. Tus derechos</h2>
          <p className="mb-2">Tenés derecho a:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Acceder a tus datos personales</li>
            <li>Corregir información incorrecta</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al procesamiento de tus datos</li>
            <li>Portabilidad de datos</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">5. Seguridad</h2>
          <p>Implementamos medidas de seguridad técnicas y organizacionales para proteger tu información contra acceso no autorizado, pérdida o divulgación.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">6. Cookies</h2>
          <p>Usamos cookies para mejorar tu experiencia. Podés gestionar tus preferencias en nuestra <span className="text-[#7B52D4]">Política de cookies</span>.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">7. Contacto</h2>
          <p>Para ejercer tus derechos o consultas de privacidad: <span className="text-[#7B52D4]">privacidad@reachly.app</span></p>
        </section>
      </div>
    </div>
  )
}
