import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center px-[5%]">
      <div className="text-center">
        <p className="text-[120px] font-bold text-[#4A1FA8] leading-none select-none">404</p>
        <h1 className="text-xl font-bold text-foreground mt-4 mb-2">Página no encontrada</h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
          La página que buscás no existe o fue movida.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="bg-[#4A1FA8] text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#6C3BF5] transition-colors">
            Volver al inicio
          </Link>
          <Link href="/campanas" className="border border-border text-foreground text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-accent transition-colors">
            Ver campañas
          </Link>
        </div>
      </div>
    </div>
  )
}
