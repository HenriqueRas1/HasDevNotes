import { Link } from 'react-router'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight">
      <img src="/favicon.svg" alt="" className="size-7" />
      <span>
        Has<span className="text-accent">Dev</span>Notes
      </span>
    </Link>
  )
}
