import { useMemo, useState } from 'react'
import { Search, ArrowUpDown, X } from 'lucide-react'
import Layout from '../components/Layout'
import StatusPill from '../components/StatusPill'
import { useDetections } from '../state/DetectionsContext'

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'classification', label: 'Classification' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'dimensions', label: 'Dimensions' },
  { key: 'timestamp', label: 'Timestamp' },
]

export default function Detections() {
  const { detections } = useDetections()

  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [minConfidence, setMinConfidence] = useState(0)
  const [sortKey, setSortKey] = useState('confidence')
  const [sortDir, setSortDir] = useState('desc')
  const [selected, setSelected] = useState(null)

  const statuses = [
    'All',
    'Verified',
    'Pending Review',
    'Rejected',
    'Needs Investigation',
  ]

  const rows = useMemo(() => {
    let out = detections.filter((d) => {
      const searchText = query.toLowerCase()

      const matchesQuery =
        !query ||
        d.id.toLowerCase().includes(searchText) ||
        d.classification.toLowerCase().includes(searchText)

      const matchesStatus =
        statusFilter === 'All' ||
        d.status === statusFilter

      const matchesConfidence =
        d.confidence * 100 >= minConfidence

      return (
        matchesQuery &&
        matchesStatus &&
        matchesConfidence
      )
    })

    out.sort((a, b) => {
      const av =
        sortKey === 'dimensions'
          ? a.width
          : a[sortKey]

      const bv =
        sortKey === 'dimensions'
          ? b.width
          : b[sortKey]

      const cmp =
        typeof av === 'string'
          ? av.localeCompare(bv)
          : (av ?? 0) - (bv ?? 0)

      return sortDir === 'asc'
        ? cmp
        : -cmp
    })

    return out
  }, [
    detections,
    query,
    statusFilter,
    minConfidence,
    sortKey,
    sortDir,
  ])

  function toggleSort(key) {
    const actualKey =
      key === 'dimensions'
        ? 'width'
        : key

    if (sortKey === actualKey) {
      setSortDir((d) =>
        d === 'asc' ? 'desc' : 'asc'
      )
    } else {
      setSortKey(actualKey)
      setSortDir('desc')
    }
  }

  return (
    <Layout
      title="Detections"
      subtitle="Detected regions from analyzed sonar imagery"
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">

        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search by ID or classification"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-depth-800/60 border border-sonar-500/15 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sonar-500/40"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="px-3 py-2 rounded-lg bg-depth-800/60 border border-sonar-500/15 text-sm text-slate-300 focus:outline-none focus:border-sonar-500/40"
        >
          {statuses.map((status) => (
            <option key={status}>
              {status}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-xs text-slate-400">
          Min confidence

          <input
            type="range"
            min="0"
            max="100"
            value={minConfidence}
            onChange={(e) =>
              setMinConfidence(
                Number(e.target.value)
              )
            }
            className="accent-sonar-400"
          />

          <span className="font-mono text-sonar-400 w-9">
            {minConfidence}%
          </span>
        </label>
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full text-sm">

          <thead>
            <tr className="border-b border-sonar-500/10 text-left">

              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 whitespace-nowrap"
                >
                  <button
                    onClick={() =>
                      toggleSort(column.key)
                    }
                    className="flex items-center gap-1 text-[11px] font-semibold tracking-wide text-slate-500 hover:text-slate-300"
                  >
                    {column.label}
                    <ArrowUpDown size={11} />
                  </button>
                </th>
              ))}

            </tr>
          </thead>

          <tbody className="divide-y divide-sonar-500/5">

            {rows.map((detection) => (
              <tr
                key={detection.id}
                onClick={() =>
                  setSelected(detection)
                }
                className="cursor-pointer hover:bg-depth-700/30 transition-colors"
              >

                <td className="px-4 py-3 font-mono text-xs text-sonar-400">
                  {detection.id}
                </td>

                <td className="px-4 py-3 text-slate-200">
                  {detection.classification}
                </td>

                <td className="px-4 py-3 tabular-nums text-slate-300">
                  {(detection.confidence * 100).toFixed(1)}%
                </td>

                <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                  {detection.width} × {detection.height} px
                </td>

                <td className="px-4 py-3 font-mono text-xs text-slate-400">
                  {detection.timestamp}
                </td>

              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-4 py-10 text-center text-slate-500 text-sm"
                >
                  No detections match the current filters.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {selected && (
        <DetailDrawer
          detection={selected}
          onClose={() =>
            setSelected(null)
          }
        />
      )}
    </Layout>
  )
}

function DetailDrawer({
  detection,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl h-full bg-depth-900 border-l border-sonar-500/15 p-6 overflow-y-auto">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              Detection {detection.id}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Sonar analysis result
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-depth-700/60"
          >
            <X size={16} />
          </button>

        </div>

        <div className="flex items-center justify-between mb-5">

          <div>
            <p className="text-sm text-slate-200">
              {detection.classification}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Confidence:{' '}
              {(
                detection.confidence * 100
              ).toFixed(1)}
              %
            </p>
          </div>

          <StatusPill
            status={detection.status}
          />

        </div>

        {(detection.imageUrl ||
          detection.maskUrl ||
          detection.overlayUrl ||
          detection.mask_base64 ||
          detection.overlay_base64) && (

          <div className="mb-6">

            <p className="text-xs font-semibold text-slate-400 mb-2">
              Sonar Analysis
            </p>

            <div className="grid grid-cols-1 gap-4">

              {detection.imageUrl && (
                <ImagePanel
                  title="Original"
                  src={detection.imageUrl}
                />
              )}

              {(detection.maskUrl ||
                detection.mask_base64) && (
                <ImagePanel
                  title="Predicted Mask"
                  src={
                    detection.maskUrl ||
                    `data:image/png;base64,${detection.mask_base64}`
                  }
                />
              )}

              {(detection.overlayUrl ||
                detection.overlay_base64) && (
                <ImagePanel
                  title="Prediction Overlay"
                  src={
                    detection.overlayUrl ||
                    `data:image/jpeg;base64,${detection.overlay_base64}`
                  }
                />
              )}

            </div>

          </div>
        )}

        <div className="grid grid-cols-2 gap-3">

          <InfoCard
            label="Classification"
            value={
              detection.classification
            }
          />

          <InfoCard
            label="Confidence"
            value={`${(
              detection.confidence * 100
            ).toFixed(1)}%`}
          />

          <InfoCard
            label="Dimensions"
            value={
              detection.width &&
              detection.height
                ? `${detection.width} × ${detection.height} px`
                : '—'
            }
          />

          <InfoCard
            label="Predicted Area"
            value={
              detection.predicted_area_percent != null
                ? `${detection.predicted_area_percent}%`
                : '—'
            }
          />

          <InfoCard
            label="Threshold"
            value={
              detection.threshold ?? '—'
            }
          />

          <InfoCard
            label="Device"
            value={
              detection.device ?? '—'
            }
          />

        </div>

      </div>
    </div>
  )
}

function ImagePanel({
  title,
  src,
}) {
  return (
    <div className="rounded-xl border border-sonar-500/10 bg-depth-800/40 overflow-hidden">

      <div className="px-3 py-2 border-b border-sonar-500/10">
        <span className="text-xs text-slate-400">
          {title}
        </span>
      </div>

      <div className="bg-black/20 flex items-center justify-center p-3 min-h-[180px] max-h-[360px]">

        <img
          src={src}
          alt={title}
          className="max-w-full max-h-[330px] object-contain"
        />

      </div>

    </div>
  )
}

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-sonar-500/10 bg-depth-800/30 p-3">

      <p className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="text-sm text-slate-200 mt-1 break-words">
        {value}
      </p>

    </div>
  )
}