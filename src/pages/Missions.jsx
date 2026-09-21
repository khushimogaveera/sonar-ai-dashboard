import { MapPin, Images, ShipWheel } from 'lucide-react'
import Layout from '../components/Layout'
import DemoBadge from '../components/DemoBadge'
import { demoMissions } from '../data/demoData'

const STATUS_STYLE = {
  Complete: 'text-signal-green bg-signal-green/10 border-signal-green/25',
  Processing: 'text-signal-amber bg-signal-amber/10 border-signal-amber/25',
  Scheduled: 'text-sonar-400 bg-sonar-500/10 border-sonar-500/25',
}

export default function Missions() {
  return (
    <Layout title="Missions" subtitle="Survey missions and their scan coverage">
      <div className="flex justify-end mb-4">
        <DemoBadge label="DEMO MISSION" />
      </div>

      {demoMissions.length === 0 ? (
        <div className="panel p-10 text-center text-slate-500 text-sm">NO MISSION DATA</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {demoMissions.map((m) => (
            <div key={m.id} className="panel p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-sm text-sonar-400">{m.id}</p>
                  <p className="flex items-center gap-1.5 text-sm text-slate-200 mt-1">
                    <MapPin size={14} className="text-slate-500" />
                    {m.location}
                  </p>
                </div>
                <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLE[m.status]}`}>
                  {m.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-sonar-500/10">
                <div className="flex items-center gap-2">
                  <Images size={15} className="text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-200 tabular-nums">{m.images.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-500">Images</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShipWheel size={15} className="text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-200 tabular-nums">{m.detections}</p>
                    <p className="text-[11px] text-slate-500">Detections</p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 mt-4">
                {m.startDate}
                {m.endDate ? ` – ${m.endDate}` : ' · not yet started'}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}
