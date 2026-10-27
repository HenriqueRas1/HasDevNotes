import { Link } from 'react-router'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight">
      {/* Arquivos da pasta public precisam do BASE_URL para funcionar fora da raiz. */}
      <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="size-7" />
      <span>
        Has<span className="text-accent">Dev</span>Notes
      </span>
    </Link>
  )
}
