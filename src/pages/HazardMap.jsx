import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import Layout from '../components/Layout'
import DemoBadge from '../components/DemoBadge'
import StatusPill from '../components/StatusPill'
import { useDetections } from '../state/DetectionsContext'

const STATUS_COLOR = {
  Verified: '#3ddc97',
  'Pending Review': '#e8a33d',
  Rejected: '#e85d4f',
  'Needs Investigation': '#33c1d6',
}

export default function HazardMap() {
  const { detections } = useDetections()
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = useMemo(
    () => (statusFilter === 'All' ? detections : detections.filter((d) => d.status === statusFilter)),
    [detections, statusFilter]
  )

  const center = filtered.length
    ? [filtered[0].latitude, filtered[0].longitude]
    : [18.9213, 72.8347]

  return (
    <Layout title="Hazard Map" subtitle="Geotagged detections across survey areas">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {['All', 'Verified', 'Pending Review', 'Needs Investigation', 'Rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                statusFilter === s
                  ? 'border-sonar-500/40 bg-sonar-500/10 text-sonar-400'
                  : 'border-sonar-500/10 text-slate-400 hover:border-sonar-500/25'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <DemoBadge label="DEMO COORDINATES" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        <div className="panel overflow-hidden h-[560px]">
          <MapContainer center={center} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((d) => (
              <CircleMarker
                key={d.id}
                center={[d.latitude, d.longitude]}
                radius={9}
                pathOptions={{
                  color: STATUS_COLOR[d.status] || '#33c1d6',
                  fillColor: STATUS_COLOR[d.status] || '#33c1d6',
                  fillOpacity: 0.75,
                  weight: 2,
                }}
              >
                <Popup>
                  <div style={{ fontFamily: 'inherit', minWidth: 160 }}>
                    <p style={{ fontWeight: 600, marginBottom: 4 }}>{d.classification.toUpperCase()}</p>
                    <p style={{ fontSize: 12, margin: '2px 0' }}>Confidence: {(d.confidence * 100).toFixed(1)}%</p>
                    <p style={{ fontSize: 12, margin: '2px 0' }}>
                      {d.latitude}° N, {d.longitude}° E
                    </p>
                    <p style={{ fontSize: 12, margin: '2px 0' }}>
                      Size: {d.width} × {d.height} m
                    </p>
                    <p style={{ fontSize: 12, margin: '2px 0' }}>Mission: {d.survey}</p>
                    <p style={{ fontSize: 12, margin: '2px 0' }}>Status: {d.status}</p>
                    <p style={{ fontSize: 10, marginTop: 6, color: '#e8a33d' }}>DEMO COORDINATES</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="space-y-4">
          <div className="panel p-4">
            <h3 className="text-xs font-semibold tracking-wide text-slate-400 mb-3">LEGEND</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {Object.entries(STATUS_COLOR).map(([status, color]) => (
                <li key={status} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  {status}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-4 max-h-[380px] overflow-y-auto">
            <h3 className="text-xs font-semibold tracking-wide text-slate-400 mb-3">
              {filtered.length} DETECTION{filtered.length === 1 ? '' : 'S'}
            </h3>
            <ul className="space-y-2.5">
              {filtered.map((d) => (
                <li key={d.id} className="flex items-center justify-between text-xs">
                  <div>
                    <p className="text-slate-200 font-mono">{d.id}</p>
                    <p className="text-slate-500">{(d.confidence * 100).toFixed(1)}% confidence</p>
                  </div>
                  <StatusPill status={d.status} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
