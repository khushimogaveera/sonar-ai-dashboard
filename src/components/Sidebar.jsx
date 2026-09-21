import { NavLink } from 'react-router-dom'
import {
  Waves,
  LayoutGrid,
  ScanLine,
  Map as MapIcon,
  ListTree,
  BarChart3,
  ClipboardCheck,
  FileOutput,
  Compass,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/overview', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/sonar-analysis', label: 'Sonar Analysis', icon: ScanLine },
  { to: '/hazard-map', label: 'Hazard Map', icon: MapIcon },
  { to: '/detections', label: 'Detections', icon: ListTree },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/review-queue', label: 'Review Queue', icon: ClipboardCheck },
  { to: '/missions', label: 'Missions', icon: Compass },
  { to: '/reports', label: 'Reports', icon: FileOutput },
]

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col border-r border-sonar-500/10 bg-depth-900/80 backdrop-blur-sm">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sonar-500/10">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-sonar-500/10 border border-sonar-500/25">
          <Waves className="w-4.5 h-4.5 text-sonar-400" size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-100 leading-none">
            SONAR AI
          </p>
          <p className="text-[10px] text-slate-500 mt-1 leading-none">
            Debris Detection System
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={17} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sonar-500/10">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-signal-amber/10 border border-signal-amber/25">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulseSoft absolute inline-flex h-full w-full rounded-full bg-signal-amber opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-amber"></span>
          </span>

          <span className="text-xs font-medium text-signal-amber tracking-wide">
            DEMO MODE
          </span>
        </div>
      </div>
    </aside>
  )
}