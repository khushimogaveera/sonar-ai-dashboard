// ---------------------------------------------------------------------------
// MOCK METADATA SERVICE
//
// Real side-scan sonar files usually carry navigation metadata (GPS,
// heading, altitude, timestamp) in their headers. Until that parsing
// is wired up, this returns a fixed demo payload so the rest of the
// app (map, detail panel, reports) can be fully built against a
// realistic shape.
//
// Swap-out plan: replace `getMockMetadata` with real header/GPS
// parsing. Keep the return shape the same and downstream components
// won't need to change.
// ---------------------------------------------------------------------------

const MOCK_METADATA = {
  latitude: 18.9213,
  longitude: 72.8347,
  width: 5.2,
  height: 2.4,
  survey: 'Mission_001',
  timestamp: '10:42:18',
  status: 'Verified',
  source: 'mock',
}

/**
 * Returns metadata associated with a detection.
 * @param {string} _detectionId - unused by the mock
 * @returns {Promise<object>}
 */
export async function getMockMetadata(_detectionId) {
  return { ...MOCK_METADATA }
}
