// ---------------------------------------------------------------------------
// MOCK DETECTION SERVICE
//
// This simulates what a real shipwreck-detection model would return.
// It never inspects the uploaded image — it only returns a fixed demo
// payload after a short artificial delay, so the UI can be built and
// tested before the real model exists.
//
// Swap-out plan: replace the body of `runMockDetection` with a real
// call to your model/API. Keep the same return shape (or adapt
// `detectionService.js`, the one file the rest of the app talks to)
// and nothing else in the app needs to change.
// ---------------------------------------------------------------------------

const MOCK_RESULT = {
  detection_id: 'SW-001',
  classification: 'Shipwreck',
  confidence: 0.947,
  boundingBox: {
    x: 120,
    y: 80,
    width: 320,
    height: 180,
  },
  source: 'mock',
}

const PROCESSING_STAGES = [
  'Uploading Image',
  'Preprocessing',
  'Running AI Model',
  'Analyzing Anomaly',
  'Generating Report',
]

/**
 * Simulates AI processing of an uploaded sonar image.
 * @param {File|null} _imageFile - the uploaded image (unused by the mock)
 * @param {(stageIndex: number, stageLabel: string) => void} onStage - progress callback
 * @returns {Promise<object>} mock detection result
 */
export function runMockDetection(_imageFile, onStage) {
  return new Promise((resolve) => {
    let i = 0
    const tick = () => {
      if (i < PROCESSING_STAGES.length) {
        onStage?.(i, PROCESSING_STAGES[i])
        i += 1
        setTimeout(tick, 480)
      } else {
        resolve({ ...MOCK_RESULT })
      }
    }
    tick()
  })
}

export { PROCESSING_STAGES }
