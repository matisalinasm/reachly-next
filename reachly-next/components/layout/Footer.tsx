import Link from 'next/link'

const PLATAFORMA = [
  { href: '/', label: 'Explorar influencers' },
  { href: '/campanas', label: 'Campañas' },
  { href: '/tendencias', label: 'Tendencias' },
  { href: '/comparador', label: 'Comparador' },
]

const EMPRESA = [
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/prensa', label: 'Prensa' },
  { href: '/careers', label: 'Careers' },
  { href: '/contacto', label: 'Contacto' },
]

const LEGAL = [
  { href: '/terminos', label: 'Términos de uso' },
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/gdpr', label: 'GDPR' },
]

export function Footer() {
  return (
    <footer className="bg-[#0D0625] pt-16 pb-8">
      <div className="max-w-[1100px] mx-auto px-[5%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/7 mb-7">
          {/* Brand col */}
          <div>
            <img src="/logo-reachly-white.svg" alt="Reachly" className="h-6 w-auto mb-2" />
            <p className="text-sm text-white/35 leading-relaxed max-w-[260px] mb-5">
              La plataforma que conecta marcas con los mejores creadores de contenido de LATAM.
            </p>
            <div className="flex gap-2">
              {['in', 'ig', 'tw', 'yt'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="w-[34px] h-[34px] rounded-lg bg-white/6 flex items-center justify-center text-xs font-bold text-white/50 hover:bg-[rgba(123,82,212,0.4)] hover:text-white transition-all duration-150"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <FooterCol title="Plataforma" links={PLATAFORMA} />
          <FooterCol title="Empresa" links={EMPRESA} />
          <FooterCol title="Legal" links={LEGAL} />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-white/25">© 2025 Reachly. Todos los derechos reservados.</span>
          <div className="flex gap-5">
            {LEGAL.map(l => (
              <Link key={l.href} href={l.href} className="text-xs text-white/25 hover:text-white/55 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold text-white/45 uppercase tracking-widest mb-4">{title}</div>
      <ul className="flex flex-col gap-2.5">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/35 hover:text-white/80 transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
