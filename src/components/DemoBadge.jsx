import { CircleDot } from 'lucide-react'

export default function DemoBadge({ label = 'DEMO DATA', className = '' }) {
  return (
    <span className={`demo-badge ${className}`}>
      <CircleDot size={10} />
      {label}
    </span>
  )
}
