import { useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Copy } from 'lucide-react'
import Layout from '../components/Layout'
import DemoBadge from '../components/DemoBadge'
import StatusPill from '../components/StatusPill'
import { useDetections } from '../state/DetectionsContext'
import { duplicateCandidate } from '../data/demoData'

export default function ReviewQueue() {
  const { detections, updateDetection } = useDetections()
  const pending = detections.filter((d) => d.status === 'Pending Review' || d.status === 'Needs Investigation')
  const [notes, setNotes] = useState({})

  function setStatus(id, status) {
    updateDetection(id, { status })
  }

  return (
    <Layout title="Review Queue" subtitle="Human verification of AI-flagged anomalies">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">{pending.length} detections awaiting review</p>
        <DemoBadge label="DEMO AI RESULT" />
      </div>

      <div className="space-y-4 mb-8">
        {pending.length === 0 && (
          <div className="panel p-8 text-center text-slate-500 text-sm">Review queue is empty — nothing pending.</div>
        )}

        {pending.map((d) => (
          <div key={d.id} className="panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-sonar-400">{d.id}</span>
                  <StatusPill status={d.status} />
                </div>
                <p className="text-lg font-semibold text-slate-100">{d.classification}</p>
                <p className="text-sm text-slate-400 tabular-nums mt-0.5">{(d.confidence * 100).toFixed(1)}% confidence</p>
                <p className="text-xs text-slate-500 mt-1">
                  {d.survey} · {d.latitude}, {d.longitude}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStatus(d.id, 'Verified')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-signal-green/10 border border-signal-green/25 text-signal-green text-sm hover:bg-signal-green/15 transition-colors"
                >
                  <CheckCircle2 size={15} /> Verify
                </button>
                <button
                  onClick={() => setStatus(d.id, 'Rejected')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-signal-red/10 border border-signal-red/25 text-signal-red text-sm hover:bg-signal-red/15 transition-colors"
                >
                  <XCircle size={15} /> Reject
                </button>
                <button
                  onClick={() => setStatus(d.id, 'Needs Investigation')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sonar-500/10 border border-sonar-500/25 text-sonar-400 text-sm hover:bg-sonar-500/15 transition-colors"
                >
                  <AlertTriangle size={15} /> Needs Investigation
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-sonar-500/10">
              <label className="block text-xs text-slate-500 mb-1.5">Operator Notes</label>
              <textarea
                value={notes[d.id] || ''}
                onChange={(e) => setNotes((n) => ({ ...n, [d.id]: e.target.value }))}
                rows={2}
                placeholder="Add observations for this detection…"
                className="w-full px-3 py-2 rounded-lg bg-depth-800/60 border border-sonar-500/15 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sonar-500/40 resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="panel p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold tracking-wide text-slate-400">POSSIBLE DUPLICATE</h3>
          <DemoBadge label="DEMO / FUTURE MODULE" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sonar-500/10 border border-sonar-500/20 flex items-center justify-center">
              <Copy size={16} className="text-sonar-400" />
            </div>
            <div>
              <p className="text-sm text-slate-200">
                <span className="font-mono text-sonar-400">{duplicateCandidate.detectionId}</span> potential match:{' '}
                <span className="font-mono text-sonar-400">{duplicateCandidate.matchId}</span>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Similarity: {(duplicateCandidate.similarity * 100).toFixed(0)}% · Distance: {duplicateCandidate.distanceMeters} m
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-2 rounded-lg bg-depth-700/60 border border-sonar-500/15 text-sm text-slate-300 hover:border-sonar-500/35 transition-colors">
              Mark Duplicate
            </button>
            <button className="px-3.5 py-2 rounded-lg bg-depth-700/60 border border-sonar-500/15 text-sm text-slate-300 hover:border-sonar-500/35 transition-colors">
              Keep Separate
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
