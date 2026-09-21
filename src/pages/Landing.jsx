import { Link } from 'react-router-dom'
import { ArrowRight, Waves, ScanLine, ShieldCheck } from 'lucide-react'

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-depth-900 text-slate-100">

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/sonar-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-depth-900/75" />

      {/* Content */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl w-full text-center">

          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-sonar-500/10 border border-sonar-500/25 shadow-glow backdrop-blur-sm">
              <Waves size={28} className="text-sonar-400" />
            </div>
          </div>

          <p className="text-sm font-mono tracking-[0.25em] text-sonar-400 uppercase mb-4">
            AI-assisted sonar analysis
          </p>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-5">
            Shipwreck Detection System
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-300 leading-relaxed mb-8">
            Detect wreck-like regions in sonar imagery using a U-Net
            segmentation model and explore the results through an
            interactive analysis dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">

            <Link
              to="/sonar-analysis"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-sonar-500 text-depth-900 font-semibold hover:bg-sonar-400 transition-colors shadow-glow"
            >
              Analyze Sonar
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/overview"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-sonar-500/25 bg-depth-900/40 backdrop-blur-sm text-slate-200 hover:bg-sonar-500/10 transition-colors"
            >
              Explore System
            </Link>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left">

            <div className="panel p-5 backdrop-blur-sm bg-depth-900/60">
              <ScanLine size={20} className="text-sonar-400 mb-3" />

              <h2 className="text-sm font-semibold mb-1">
                1. Sonar Image
              </h2>

              <p className="text-xs text-slate-500">
                Upload a grayscale sonar scan for analysis.
              </p>
            </div>

            <div className="panel p-5 backdrop-blur-sm bg-depth-900/60">
              <Waves size={20} className="text-sonar-400 mb-3" />

              <h2 className="text-sm font-semibold mb-1">
                2. U-Net Model
              </h2>

              <p className="text-xs text-slate-500">
                The trained segmentation model analyzes the sonar image.
              </p>
            </div>

            <div className="panel p-5 backdrop-blur-sm bg-depth-900/60">
              <ShieldCheck size={20} className="text-sonar-400 mb-3" />

              <h2 className="text-sm font-semibold mb-1">
                3. Predicted Mask
              </h2>

              <p className="text-xs text-slate-500">
                The system highlights predicted wreck-like regions.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}