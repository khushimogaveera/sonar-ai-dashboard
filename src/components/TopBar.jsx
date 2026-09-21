import { Bell, ChevronDown, CircleUser, Radio } from 'lucide-react'

export default function TopBar({ title, subtitle }) {
  return (
    <header className="h-16 sticky top-0 z-10 flex items-center justify-between px-6 border-b border-sonar-500/10 bg-depth-900/70 backdrop-blur-md">
      <div>
        <h1 className="text-base font-semibold text-slate-100 leading-none">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sonar-500/15 bg-depth-800/60 text-xs text-slate-300 hover:border-sonar-500/30 transition-colors">
          <span className="text-slate-500">Mission</span>
          <span className="font-medium text-slate-200">Mission_001</span>
          <ChevronDown size={13} className="text-slate-500" />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-signal-green/20 bg-signal-green/5 text-xs text-signal-green">
          <Radio size={13} />
          <span>System Nominal</span>
        </div>

        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-depth-700/60 transition-colors">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-sonar-400"></span>
        </button>

        <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-sonar-500/15 bg-depth-800/60 text-slate-300 hover:border-sonar-500/30 transition-colors">
          <CircleUser size={18} />
        </button>
      </div>
    </header>
  )
}
