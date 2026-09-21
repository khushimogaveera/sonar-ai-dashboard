import { useCallback, useRef, useState } from 'react'
import {
  UploadCloud,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Contrast,
  Maximize,
  Minimize,
  Loader2,
  CheckCircle2,
  Circle,
  Waves,
} from 'lucide-react'
import Layout from '../components/Layout'
import DemoBadge from '../components/DemoBadge'
import ConfidenceMeter from '../components/ConfidenceMeter'
import { detectAnomaly, getMetadata } from '../services/detectionService'
import { PROCESSING_STAGES } from '../services/mockDetectionService'
import { futureClasses } from '../data/demoData'
import { useDetections } from '../state/DetectionsContext'

export default function SonarAnalysis() {
  const fileInputRef = useRef(null)
  const viewerRef = useRef(null)
  const { addDetection } = useDetections()

  const [imageUrl, setImageUrl] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imageName, setImageName] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const [processing, setProcessing] = useState(false)
  const [stageIndex, setStageIndex] = useState(-1)
  const [result, setResult] = useState(null)
  const [metadata, setMetadata] = useState(null)

  const [zoom, setZoom] = useState(1)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [fullscreen, setFullscreen] = useState(false)
  const [threshold, setThreshold] = useState(70)

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return

    const url = URL.createObjectURL(file)

    setImageUrl(url)
    setImageFile(file)
    setImageName(file.name)
    setResult(null)
    setMetadata(null)
    setZoom(1)
    setBrightness(100)
    setContrast(100)
  }, [])

  function onDrop(e) {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    handleFile(file)
  }

  async function handleProcess() {
    if (!imageFile || processing) return

    setProcessing(true)
    setResult(null)
    setStageIndex(-1)

    try {
      const res = await detectAnomaly(
        imageFile,
        (idx) => setStageIndex(idx)
      )

      const meta = await getMetadata(res.detection_id, res)

      setResult(res)
      setMetadata(meta)

      addDetection({
        id: res.detection_id,
        classification: res.classification,
        confidence: res.confidence,
        latitude: meta.latitude,
        longitude: meta.longitude,
        width: res.width,
        height: res.height,
        survey: meta.survey,
        timestamp: meta.timestamp,
        date: new Date().toISOString().slice(0, 10),
        status: meta.status,
        source: 'real-model',

        imageUrl,
        maskUrl: res.mask_url,
        overlayUrl: res.overlay_url,
        predicted_area_percent: res.predicted_area_percent,
        threshold: res.threshold,
        device: 'ZeroGPU',
      })
    } catch (error) {
      console.error('Sonar analysis failed:', error)
      window.alert(error.message || 'Sonar analysis failed.')
    } finally {
      setProcessing(false)
    }
  }

  const belowThreshold =
    result && result.confidence * 100 < threshold

  return (
    <Layout
      title="Sonar Analysis"
      subtitle="Upload and inspect side scan sonar imagery"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">

        {/* =========================
            LEFT: IMAGE ANALYSIS
        ========================== */}
        <div className="panel overflow-hidden">

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-sonar-500/10">

            <div className="flex items-center gap-2">

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-depth-700/60 border border-sonar-500/15 text-sm text-slate-200 hover:border-sonar-500/35 transition-colors"
              >
                <UploadCloud size={15} />
                Choose Image
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFile(e.target.files?.[0])
                }
              />

              <button
                onClick={handleProcess}
                disabled={!imageFile || processing}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sonar-500 text-depth-900 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sonar-400 transition-colors"
              >
                {processing ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Waves size={15} />
                )}

                Process Image
              </button>

            </div>

            {imageUrl && (
              <div className="flex items-center gap-1.5">

                <IconBtn
                  onClick={() =>
                    setZoom((z) => Math.min(z + 0.25, 3))
                  }
                  title="Zoom in"
                >
                  <ZoomIn size={15} />
                </IconBtn>

                <IconBtn
                  onClick={() =>
                    setZoom((z) => Math.max(z - 0.25, 0.5))
                  }
                  title="Zoom out"
                >
                  <ZoomOut size={15} />
                </IconBtn>

                <IconBtn
                  onClick={() => {
                    setZoom(1)
                    setBrightness(100)
                    setContrast(100)
                  }}
                  title="Reset"
                >
                  <RotateCcw size={15} />
                </IconBtn>

                <IconBtn
                  onClick={() =>
                    setFullscreen((f) => !f)
                  }
                  title="Fullscreen"
                >
                  {fullscreen ? (
                    <Minimize size={15} />
                  ) : (
                    <Maximize size={15} />
                  )}
                </IconBtn>

              </div>
            )}

          </div>

          {/* Brightness / Contrast */}
          {imageUrl && (
            <div className="flex items-center gap-6 px-5 py-3 border-b border-sonar-500/10 text-xs text-slate-400">

              <label className="flex items-center gap-2 flex-1">
                <Sun size={13} />

                Brightness

                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={(e) =>
                    setBrightness(Number(e.target.value))
                  }
                  className="flex-1 accent-sonar-400"
                />
              </label>

              <label className="flex items-center gap-2 flex-1">
                <Contrast size={13} />

                Contrast

                <input
                  type="range"
                  min="50"
                  max="150"
                  value={contrast}
                  onChange={(e) =>
                    setContrast(Number(e.target.value))
                  }
                  className="flex-1 accent-sonar-400"
                />
              </label>

            </div>
          )}

          {/* =========================
              ORIGINAL IMAGE VIEWER
          ========================== */}
          <div
            ref={viewerRef}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`relative flex items-center justify-center overflow-hidden bg-abyss-950 ${
              fullscreen ? 'fixed inset-0 z-50' : 'h-[520px]'
            }`}
          >

            {!imageUrl && (
              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className={`flex flex-col items-center gap-3 text-center px-8 py-10 rounded-xl border-2 border-dashed transition-colors ${
                  isDragging
                    ? 'border-sonar-400 bg-sonar-500/5'
                    : 'border-sonar-500/20'
                }`}
              >

                <div className="w-14 h-14 rounded-full border border-sonar-500/25 flex items-center justify-center">
                  <Circle
                    size={22}
                    className="text-sonar-500/60"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-300">
                    NO SONAR IMAGE LOADED
                  </p>

                  <p className="text-xs text-slate-500 mt-1 max-w-[220px]">
                    Upload a Side Scan Sonar image to begin analysis
                  </p>
                </div>

                <span className="mt-2 px-3.5 py-1.5 rounded-lg bg-sonar-500/10 border border-sonar-500/25 text-xs text-sonar-400">
                  Upload SSS Image
                </span>

              </button>
            )}

            {imageUrl && (
              <div className="relative w-full h-full flex items-center justify-center">

                {/* ORIGINAL IMAGE ONLY */}
                <img
                  src={imageUrl}
                  alt="Uploaded side scan sonar"
                  draggable={false}
                  style={{
                    transform: `scale(${zoom})`,
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  }}
                  className="max-w-full max-h-full object-contain select-none transition-transform duration-150"
                />

                {fullscreen && (
                  <button
                    onClick={() => setFullscreen(false)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-depth-800/80 border border-sonar-500/20 text-slate-300"
                  >
                    <Minimize size={16} />
                  </button>
                )}

              </div>
            )}

            {/* Processing */}
            {processing && (
              <div className="absolute inset-0 bg-depth-950/85 backdrop-blur-sm flex items-center justify-center">

                <div className="w-72">

                  <div className="flex items-center gap-2 mb-4 text-sonar-400 justify-center">
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    <span className="text-sm font-medium">
                      Running AI pipeline
                    </span>
                  </div>

                  <ul className="space-y-2.5">

                    {PROCESSING_STAGES.map((stage, i) => (
                      <li
                        key={stage}
                        className="flex items-center gap-2.5 text-sm"
                      >

                        {i <= stageIndex ? (
                          <CheckCircle2
                            size={15}
                            className="text-signal-green shrink-0"
                          />
                        ) : (
                          <Circle
                            size={15}
                            className="text-slate-600 shrink-0"
                          />
                        )}

                        <span
                          className={
                            i <= stageIndex
                              ? 'text-slate-200'
                              : 'text-slate-500'
                          }
                        >
                          {stage}
                        </span>

                      </li>
                    ))}

                  </ul>

                </div>

              </div>
            )}

          </div>

          {/* =========================
              PREDICTED MASK
          ========================== */}
          {result?.mask_url && (
            <div className="border-t border-sonar-500/10 p-5">

              <h3 className="text-xs font-semibold tracking-wide text-slate-400 mb-3">
                PREDICTED MASK
              </h3>

              <div className="rounded-lg bg-black overflow-hidden flex items-center justify-center">

                <img
                  src={result.mask_url}
                  alt="U-Net predicted mask"
                  className="w-full max-h-[520px] object-contain"
                />

              </div>

            </div>
          )}

          {/* =========================
              PREDICTION OVERLAY
          ========================== */}
          {result?.overlay_url && (
            <div className="border-t border-sonar-500/10 p-5">

              <h3 className="text-xs font-semibold tracking-wide text-slate-400 mb-3">
                PREDICTION OVERLAY
              </h3>

              <div className="rounded-lg bg-black overflow-hidden flex items-center justify-center">

                <img
                  src={result.overlay_url}
                  alt="U-Net prediction overlay"
                  className="w-full max-h-[520px] object-contain"
                />

              </div>

            </div>
          )}

          {/* Filename */}
          {imageName && (
            <div className="flex items-center justify-between px-5 py-2.5 text-xs text-slate-500 border-t border-sonar-500/10">

              <span>
                {imageName}
              </span>

              {result && (
                <DemoBadge label="REAL U-NET RESULT" />
              )}

            </div>
          )}

        </div>

        {/* =========================
            RIGHT SIDE PANEL
        ========================== */}
        <div className="space-y-5">

          {/* AI Confidence */}
          <div className="panel p-5">

            <div className="flex items-center justify-between mb-3">

              <h3 className="text-xs font-semibold tracking-wide text-slate-400">
                AI CONFIDENCE
              </h3>

              {result && (
                <DemoBadge label="REAL U-NET RESULT" />
              )}

            </div>

            {result ? (
              <>

                <ConfidenceMeter
                  value={result.confidence}
                />

                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-sonar-500/10">

                  <div>
                    <p className="text-[11px] text-slate-500">
                      Classification
                    </p>

                    <p className="text-sm text-slate-200 mt-0.5">
                      {result.classification}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-slate-500">
                      Source
                    </p>

                    <p className="text-sm text-slate-200 mt-0.5">
                      Real U-Net
                    </p>
                  </div>

                </div>

                {belowThreshold && (
                  <p className="mt-3 text-[11px] text-signal-amber">
                    Below current confidence threshold — hidden from Detections by default.
                  </p>
                )}

              </>
            ) : (
              <p className="text-sm text-slate-500">
                Process an image to see the U-Net prediction.
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-sonar-500/10">

              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">

                <span>
                  Minimum Confidence
                </span>

                <span className="font-mono text-sonar-400">
                  {threshold}%
                </span>

              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={threshold}
                onChange={(e) =>
                  setThreshold(
                    Number(e.target.value)
                  )
                }
                className="w-full accent-sonar-400"
              />

            </div>

          </div>

          {/* Detection Details */}
          {metadata && (
            <div className="panel p-5">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-xs font-semibold tracking-wide text-slate-400">
                  DETECTION DETAILS
                </h3>

              </div>

              <dl className="space-y-2.5 text-sm">

                <Row
                  label="Detection ID"
                  value={result?.detection_id}
                />

                <Row
                  label="Latitude"
                  value={metadata.latitude}
                />

                <Row
                  label="Longitude"
                  value={metadata.longitude}
                />

                <Row
                  label="Dimensions"
                  value={`${metadata.width ?? result?.width ?? 'N/A'} × ${metadata.height ?? result?.height ?? 'N/A'}`}
                />

                <Row
                  label="Survey"
                  value={metadata.survey}
                />

                <Row
                  label="Timestamp"
                  value={metadata.timestamp}
                />

                <Row
                  label="Status"
                  value={metadata.status}
                />

              </dl>

            </div>
          )}

          {/* Classification */}
          <div className="panel p-5">

            <h3 className="text-xs font-semibold tracking-wide text-slate-400 mb-3">
              ANOMALY CLASSIFICATION
            </h3>

            <div className="flex items-center justify-center gap-3 text-center mb-4">

              <span className="text-xs text-slate-500">
                Natural Seafloor
              </span>

              <span className="text-[10px] text-slate-600">
                VS
              </span>

              <span className="text-xs text-slate-500">
                Man-Made Anomaly
              </span>

            </div>

            {result ? (
              <div className="rounded-lg bg-signal-red/5 border border-signal-red/20 px-4 py-3 text-center">

                <p className="text-[11px] text-signal-red font-medium tracking-wide">
                  PREDICTED ANOMALY
                </p>

                <p className="text-sm text-slate-100 mt-1">
                  {result.classification}
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  {(result.confidence * 100).toFixed(1)}%
                </p>

              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center">
                No classification yet.
              </p>
            )}

            <p className="text-[11px] text-slate-500 mt-4 mb-2">
              Future Classes
            </p>

            <div className="flex flex-wrap gap-1.5">

              {futureClasses.map((c) => (
                <span
                  key={c}
                  className="text-[10px] px-2 py-1 rounded-md border border-slate-600/40 text-slate-500"
                >
                  {c} · Coming Soon
                </span>
              ))}

            </div>

          </div>

        </div>

      </div>
    </Layout>
  )
}

function IconBtn({
  children,
  onClick,
  title,
  active,
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg border text-slate-300 transition-colors ${
        active
          ? 'border-sonar-500/40 bg-sonar-500/10 text-sonar-400'
          : 'border-sonar-500/15 bg-depth-700/40 hover:border-sonar-500/30'
      }`}
    >
      {children}
    </button>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">

      <dt className="text-slate-500">
        {label}
      </dt>

      <dd className="text-slate-200 font-mono text-xs">
        {value}
      </dd>

    </div>
  )
}