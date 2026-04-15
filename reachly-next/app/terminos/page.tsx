import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Términos de uso — Reachly' }

export default function TerminosPage() {
  return (
    <div className="max-w-[800px] mx-auto px-[5%] py-12">
      <h1 className="text-3xl font-bold text-foreground mb-2">Términos de uso</h1>
      <p className="text-muted-foreground text-sm mb-8">Última actualización: 1 de enero de 2025</p>

      <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">1. Aceptación de los términos</h2>
          <p>Al acceder y usar Reachly, aceptás quedar vinculado por estos Términos de Uso. Si no estás de acuerdo con alguna parte de estos términos, no podés usar nuestros servicios.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">2. Descripción del servicio</h2>
          <p>Reachly es una plataforma que conecta influencers con marcas para facilitar colaboraciones comerciales. Actuamos como intermediarios y no somos parte de los contratos entre influencers y marcas.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">3. Cuentas de usuario</h2>
          <p>Para usar ciertas funciones, debés crear una cuenta. Sos responsable de mantener la confidencialidad de tu contraseña y de toda actividad que ocurra en tu cuenta. Debés notificarnos inmediatamente ante cualquier uso no autorizado.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">4. Contenido del usuario</h2>
          <p>Al publicar contenido en Reachly, otorgás una licencia no exclusiva, mundial, libre de regalías para usar, reproducir y distribuir ese contenido en conexión con el servicio. Sos responsable de que el contenido que publicás sea legal y no infrinja derechos de terceros.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">5. Conducta prohibida</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Publicar información falsa o engañosa</li>
            <li>Hacerse pasar por otra persona o entidad</li>
            <li>Usar la plataforma para actividades ilegales</li>
            <li>Intentar acceder sin autorización a otros sistemas</li>
            <li>Publicar contenido de spam o publicidad no solicitada</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">6. Limitación de responsabilidad</h2>
          <p>Reachly no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos que resulten del uso o la imposibilidad de usar el servicio.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">7. Cambios en los términos</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entran en vigor al publicarlos en esta página. El uso continuado del servicio implica la aceptación de los nuevos términos.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">8. Contacto</h2>
          <p>Para consultas sobre estos términos: <span className="text-[#7B52D4]">legal@reachly.app</span></p>
        </section>
      </div>
    </div>
  )
}
