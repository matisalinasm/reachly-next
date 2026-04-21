import { LOGOS } from '../_data'

export function LogoMarquee() {
  return (
    <div className="bg-white dark:bg-card border-y border-border py-7 overflow-hidden">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[.14em] text-muted-foreground mb-5">
        Marcas que confían en Reachly
      </p>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white dark:from-card to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white dark:from-card to-transparent pointer-events-none" />

        <div className="animate-marquee flex w-max">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span
              key={i}
              className="px-8 text-[13px] font-black font-mono tracking-wider text-muted-foreground border-r border-border hover:text-[#4A1FA8] transition-colors cursor-default whitespace-nowrap py-1"
              style={{ transition: 'color 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
