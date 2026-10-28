/** Tag em formato de "chip" arredondado, como os filtros do design. */
export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted">
      #{children}
    </span>
  )
}
