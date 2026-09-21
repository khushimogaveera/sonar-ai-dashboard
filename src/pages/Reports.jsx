import { FileDown, FileJson, FileText } from 'lucide-react'
import Layout from '../components/Layout'
import DemoBadge from '../components/DemoBadge'
import { useDetections } from '../state/DetectionsContext'

function toReportRow(d) {
  return {
    detection_id: d.id,
    classification: d.classification,
    confidence: Number(d.confidence.toFixed(3)),
    latitude: d.latitude,
    longitude: d.longitude,
    width_m: d.width,
    height_m: d.height,
    survey: d.survey,
    timestamp: d.timestamp,
    status: d.status,
    metadata_source: d.source,
  }
}

function download(filename, content, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function Reports() {
  const { detections } = useDetections()
  const rows = detections.map(toReportRow)

  function downloadCsv() {
    const headers = Object.keys(rows[0] || {})
    const lines = [headers.join(','), ...rows.map((r) => headers.map((h) => r[h]).join(','))]
    download('sonar-ai-detections.csv', lines.join('\n'), 'text/csv')
  }

  function downloadJson() {
    download('sonar-ai-detections.json', JSON.stringify(rows, null, 2), 'application/json')
  }

  function generatePdf() {
    const win = window.open('', '_blank')
    if (!win) return
    const tableRows = rows
      .map(
        (r) => `<tr>
          <td>${r.detection_id}</td><td>${r.classification}</td><td>${(r.confidence * 100).toFixed(1)}%</td>
          <td>${r.latitude}</td><td>${r.longitude}</td><td>${r.width_m} × ${r.height_m} m</td>
          <td>${r.survey}</td><td>${r.timestamp}</td><td>${r.status}</td><td>${r.metadata_source}</td>
        </tr>`
      )
      .join('')
    win.document.write(`
      <html><head><title>Sonar AI — Detection Report</title>
      <style>
        body { font-family: 'IBM Plex Sans', sans-serif; padding: 32px; color: #111; }
        h1 { font-size: 18px; margin-bottom: 2px; }
        p.sub { color: #666; font-size: 12px; margin-top: 0; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
        th { background: #f3f3f3; }
        .badge { display: inline-block; margin-top: 16px; font-size: 10px; color: #b5720b; border: 1px solid #e8a33d; padding: 2px 8px; border-radius: 999px; }
      </style></head>
      <body>
        <h1>Sonar AI — Detection Report</h1>
        <p class="sub">Generated ${new Date().toLocaleString()} · Side Scan Sonar Man-Made Debris Detection System</p>
        <table>
          <thead><tr><th>ID</th><th>Classification</th><th>Confidence</th><th>Lat</th><th>Lng</th><th>Dimensions</th><th>Survey</th><th>Timestamp</th><th>Status</th><th>Source</th></tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
        <span class="badge">DEMO DATA — mock detections &amp; metadata, not a real survey report</span>
        <script>window.onload = () => window.print()</script>
      </body></html>
    `)
    win.document.close()
  }

  return (
    <Layout title="Reports" subtitle="Export detection data for offline analysis">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-400">{rows.length} detections included in export</p>
        <DemoBadge />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <ExportCard icon={FileDown} label="Download CSV" desc="Spreadsheet-ready detection table" onClick={downloadCsv} />
        <ExportCard icon={FileJson} label="Download JSON" desc="Structured export for downstream tooling" onClick={downloadJson} />
        <ExportCard icon={FileText} label="Generate PDF" desc="Print-ready summary report" onClick={generatePdf} />
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sonar-500/10 text-left text-[11px] text-slate-500">
              <th className="px-4 py-3">Detection ID</th>
              <th className="px-4 py-3">Classification</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Latitude</th>
              <th className="px-4 py-3">Longitude</th>
              <th className="px-4 py-3">Width</th>
              <th className="px-4 py-3">Height</th>
              <th className="px-4 py-3">Survey</th>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Metadata Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sonar-500/5">
            {rows.map((r) => (
              <tr key={r.detection_id}>
                <td className="px-4 py-3 font-mono text-xs text-sonar-400">{r.detection_id}</td>
                <td className="px-4 py-3 text-slate-200">{r.classification}</td>
                <td className="px-4 py-3 text-slate-300 tabular-nums">{(r.confidence * 100).toFixed(1)}%</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{r.latitude}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{r.longitude}</td>
                <td className="px-4 py-3 text-slate-400">{r.width_m} m</td>
                <td className="px-4 py-3 text-slate-400">{r.height_m} m</td>
                <td className="px-4 py-3 text-slate-400">{r.survey}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{r.timestamp}</td>
                <td className="px-4 py-3 text-slate-400">{r.status}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{r.metadata_source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

function ExportCard({ icon: Icon, label, desc, onClick }) {
  return (
    <button onClick={onClick} className="panel p-5 text-left hover:border-sonar-500/30 border border-transparent transition-colors">
      <div className="w-9 h-9 rounded-lg bg-sonar-500/10 border border-sonar-500/20 flex items-center justify-center mb-4">
        <Icon size={16} className="text-sonar-400" />
      </div>
      <p className="text-sm font-medium text-slate-200">{label}</p>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </button>
  )
}
