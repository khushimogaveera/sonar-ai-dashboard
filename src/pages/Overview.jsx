import { Link } from 'react-router-dom'
import { Waves, ShipWheel, Anchor, ShieldCheck, ArrowUpRight } from 'lucide-react'
import Layout from '../components/Layout'
import DemoBadge from '../components/DemoBadge'
import StatusPill from '../components/StatusPill'
import { demoKpis } from '../data/demoData'
import { useDetections } from '../state/DetectionsContext'

const KPI_CARDS = [
  { label: 'Sonar Area Scanned', value: `${demoKpis.areaScannedKm2} km²`, icon: Waves },
  { label: 'Total Anomalies', value: demoKpis.totalAnomalies, icon: ShipWheel },
  { label: 'Shipwreck Detections', value: demoKpis.shipwreckDetections, icon: Anchor },
  { label: 'High Confidence', value: demoKpis.highConfidence, icon: ShieldCheck },
]

export default function Overview() {
  const { detections } = useDetections()
  const recent = detections.slice(0, 5)

  return (
    <Layout title="Overview" subtitle="Fleet-wide detection summary across active missions">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-400">Aggregated across all sonar surveys</p>
        <DemoBadge />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {KPI_CARDS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="panel p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-sonar-500/10 border border-sonar-500/20 flex items-center justify-center">
                <Icon size={16} className="text-sonar-400" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-100 tabular-nums">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="flex items-center justify-between px-5 py-4 border-b border-sonar-500/10">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Recent Detections</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest anomalies flagged across missions</p>
          </div>
          <Link to="/detections" className="flex items-center gap-1 text-xs text-sonar-400 hover:text-sonar-300 transition-colors">
            View all <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="divide-y divide-sonar-500/5">
          {recent.map((d) => (
            <Link
              to="/detections"
              key={d.id}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-depth-700/30 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="font-mono text-xs text-sonar-400 w-16 shrink-0">{d.id}</span>
                <span className="text-sm text-slate-200 w-28 shrink-0">{d.classification}</span>
                <span className="text-sm text-slate-400 tabular-nums w-16 shrink-0">
                  {(d.confidence * 100).toFixed(1)}%
                </span>
                <span className="text-xs text-slate-500 hidden sm:block">{d.survey}</span>
              </div>
              <StatusPill status={d.status} />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
