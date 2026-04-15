import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'GDPR — Reachly' }

export default function GdprPage() {
  return (
    <div className="max-w-[800px] mx-auto px-[5%] py-12">
      <h1 className="text-3xl font-bold text-foreground mb-2">Cumplimiento GDPR</h1>
      <p className="text-muted-foreground text-sm mb-8">Última actualización: 1 de enero de 2025</p>

      <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
        <section>
          <p>Reachly cumple con el Reglamento General de Protección de Datos (GDPR) de la Unión Europea. Esta página describe nuestras prácticas de cumplimiento y cómo protegemos los datos de usuarios europeos.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Base legal para el procesamiento</h2>
          <div className="space-y-3">
            {[
              { base: 'Ejecución de contrato', desc: 'Procesamos datos necesarios para proveer nuestros servicios cuando aceptás nuestros Términos de Uso.' },
              { base: 'Interés legítimo', desc: 'Para mejorar la seguridad, prevenir fraudes y optimizar la plataforma.' },
              { base: 'Consentimiento', desc: 'Para comunicaciones de marketing y cookies no esenciales.' },
              { base: 'Obligación legal', desc: 'Cuando debemos cumplir con requerimientos legales o regulatorios.' },
            ].map(b => (
              <div key={b.base} className="bg-card border border-border rounded-xl p-4">
                <p className="font-bold text-foreground mb-1">{b.base}</p>
                <p className="text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Tus derechos bajo el GDPR</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Derecho de acceso:</strong> Solicitá una copia de tus datos personales.</li>
            <li><strong className="text-foreground">Derecho de rectificación:</strong> Corregí datos incorrectos o incompletos.</li>
            <li><strong className="text-foreground">Derecho de supresión:</strong> Solicitá la eliminación de tus datos ("derecho al olvido").</li>
            <li><strong className="text-foreground">Derecho de portabilidad:</strong> Recibí tus datos en formato estructurado y legible.</li>
            <li><strong className="text-foreground">Derecho de oposición:</strong> Oponete al procesamiento basado en interés legítimo.</li>
            <li><strong className="text-foreground">Derecho de restricción:</strong> Limitá cómo procesamos tus datos en ciertas circunstancias.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Transferencias internacionales</h2>
          <p>Cuando transferimos datos fuera del Espacio Económico Europeo (EEE), lo hacemos utilizando mecanismos de transferencia adecuados como Cláusulas Contractuales Estándar (SCCs).</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Retención de datos</h2>
          <p>Conservamos tus datos solo el tiempo necesario para cumplir con los propósitos descritos en nuestra Política de Privacidad, o el tiempo requerido por ley.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Responsable de protección de datos (DPO)</h2>
          <p>Para ejercer tus derechos o hacer consultas GDPR, contactá a nuestro DPO: <span className="text-[#7B52D4]">gdpr@reachly.app</span></p>
          <p className="mt-2">También podés presentar una reclamación ante la autoridad de control de protección de datos de tu país.</p>
        </section>
      </div>
    </div>
  )
}
