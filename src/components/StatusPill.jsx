const STATUS_STYLES = {
  Verified: 'text-signal-green bg-signal-green/10 border-signal-green/25',
  'Pending Review': 'text-signal-amber bg-signal-amber/10 border-signal-amber/25',
  Rejected: 'text-signal-red bg-signal-red/10 border-signal-red/25',
  'Needs Investigation': 'text-sonar-400 bg-sonar-500/10 border-sonar-500/25',
}

export default function StatusPill({ status }) {
  const style = STATUS_STYLES[status] || 'text-slate-400 bg-slate-500/10 border-slate-500/25'
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${style}`}>
      {status}
    </span>
  )
}
