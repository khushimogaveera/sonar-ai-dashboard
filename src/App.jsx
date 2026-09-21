import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Overview from './pages/Overview'
import SonarAnalysis from './pages/SonarAnalysis'
import HazardMap from './pages/HazardMap'
import Detections from './pages/Detections'
import Analytics from './pages/Analytics'
import ReviewQueue from './pages/ReviewQueue'
import Missions from './pages/Missions'
import Reports from './pages/Reports'
import { DetectionsProvider } from './state/DetectionsContext'

export default function App() {
  return (
    <DetectionsProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/sonar-analysis" element={<SonarAnalysis />} />
        <Route path="/hazard-map" element={<HazardMap />} />
        <Route path="/detections" element={<Detections />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/review-queue" element={<ReviewQueue />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </DetectionsProvider>
  )
}