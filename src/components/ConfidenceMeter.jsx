export default function ConfidenceMeter({ value }) {
  const pct = Number((value * 100).toFixed(2))
  const color = pct >= 90 ? 'bg-signal-green' : pct >= 75 ? 'bg-sonar-400' : 'bg-signal-amber'

  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <span className="text-3xl font-semibold text-slate-100 tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-depth-700 overflow-hidden">
        <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}