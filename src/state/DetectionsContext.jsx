import { createContext, useContext, useState } from 'react'

import { demoDetections } from '../data/demoData'

const DetectionsContext = createContext(null)

export function DetectionsProvider({ children }) {
  const [detections, setDetections] = useState(demoDetections)

  function addDetection(detection) {
    setDetections((prev) => [
      detection,
      ...prev.filter((d) => d.id !== detection.id),
    ])
  }

  function updateDetection(id, updates) {
    setDetections((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      )
    )
  }

  function resetToDemoData() {
    setDetections(demoDetections)
  }

  return (
    <DetectionsContext.Provider
      value={{
        detections,
        addDetection,
        updateDetection,
        resetToDemoData,
      }}
    >
      {children}
    </DetectionsContext.Provider>
  )
}

export function useDetections() {
  const ctx = useContext(DetectionsContext)

  if (!ctx) {
    throw new Error(
      'useDetections must be used within DetectionsProvider'
    )
  }

  return ctx
}