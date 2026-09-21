// ---------------------------------------------------------------------------
// DEMO DATA
// ---------------------------------------------------------------------------

export const demoDetections = [
  // REAL MODEL RESULTS
  {
    id: 'SW-REAL-001',
    classification: 'Wreck-like Region',
    confidence: 0.9997,
    width: 1728,
    height: 5763,
    timestamp: 'EB_Allen_16',
    status: 'Verified',
    imageUrl: '/prototype_assets/EB_Allen_16.png',
    maskUrl: '/prototype_assets/EB_Allen_16_mask.png',
    overlayUrl: '/prototype_assets/EB_Allen_16_overlay.png',
    predicted_area_percent: 4.91,
    threshold: 0.6,
    device: 'cuda',
  },

  {
    id: 'SW-REAL-002',
    classification: 'Wreck-like Region',
    confidence: 1.0,
    width: 1728,
    height: 4800,
    timestamp: 'DM_Wilson_13',
    status: 'Verified',
    imageUrl: '/prototype_assets/DM_Wilson_13.png',
    maskUrl: '/prototype_assets/DM_Wilson_13_mask.png',
    overlayUrl: '/prototype_assets/DM_Wilson_13_overlay.png',
    predicted_area_percent: 4.35,
    threshold: 0.6,
    device: 'cuda',
  },

  {
    id: 'SW-REAL-003',
    classification: 'Wreck-like Region',
    confidence: 0.9987,
    width: 1728,
    height: 5667,
    timestamp: 'DM_Wilson_05',
    status: 'Verified',
    imageUrl: '/prototype_assets/DM_Wilson_05.png',
    maskUrl: '/prototype_assets/DM_Wilson_05_mask.png',
    overlayUrl: '/prototype_assets/DM_Wilson_05_overlay.png',
    predicted_area_percent: 0.35,
    threshold: 0.6,
    device: 'cpu',
  },

  // EXISTING DATA — KEPT UNCHANGED
  {
    id: 'SW-001',
    classification: 'Shipwreck',
    confidence: 0.947,
    latitude: 18.9213,
    longitude: 72.8347,
    width: 5.2,
    height: 2.4,
    survey: 'Mission_001',
    timestamp: '10:42:18',
    date: '2026-08-03',
    status: 'Verified',
    source: 'mock',
  },

  {
    id: 'SW-002',
    classification: 'Shipwreck',
    confidence: 0.913,
    latitude: 18.9301,
    longitude: 72.8420,
    width: 3.8,
    height: 1.9,
    survey: 'Mission_001',
    timestamp: '11:07:52',
    date: '2026-08-03',
    status: 'Pending Review',
    source: 'mock',
  },

  {
    id: 'SW-003',
    classification: 'Shipwreck',
    confidence: 0.878,
    latitude: 18.8977,
    longitude: 72.8195,
    width: 6.1,
    height: 2.8,
    survey: 'Mission_002',
    timestamp: '09:15:33',
    date: '2026-08-11',
    status: 'Verified',
    source: 'mock',
  },

  {
    id: 'SW-004',
    classification: 'Shipwreck',
    confidence: 0.812,
    latitude: 18.9440,
    longitude: 72.8501,
    width: 4.4,
    height: 2.1,
    survey: 'Mission_002',
    timestamp: '09:48:02',
    date: '2026-08-11',
    status: 'Pending Review',
    source: 'mock',
  },

  {
    id: 'SW-005',
    classification: 'Shipwreck',
    confidence: 0.734,
    latitude: 18.9085,
    longitude: 72.8288,
    width: 2.9,
    height: 1.4,
    survey: 'Mission_003',
    timestamp: '14:22:11',
    date: '2026-08-19',
    status: 'Rejected',
    source: 'mock',
  },

  {
    id: 'SW-006',
    classification: 'Shipwreck',
    confidence: 0.689,
    latitude: 18.9155,
    longitude: 72.8462,
    width: 3.3,
    height: 1.6,
    survey: 'Mission_003',
    timestamp: '15:01:47',
    date: '2026-08-19',
    status: 'Needs Investigation',
    source: 'mock',
  },
]

export const demoMissions = [
  {
    id: 'Mission_001',
    location: 'Arabian Sea',
    status: 'Complete',
    images: 1250,
    detections: 87,
    startDate: '2026-08-01',
    endDate: '2026-08-04',
  },

  {
    id: 'Mission_002',
    location: 'Mumbai Coast',
    status: 'Processing',
    images: 840,
    detections: 31,
    startDate: '2026-08-10',
    endDate: '2026-08-12',
  },

  {
    id: 'Mission_003',
    location: 'Gulf of Khambhat',
    status: 'Scheduled',
    images: 0,
    detections: 0,
    startDate: '2026-09-25',
    endDate: null,
  },
]

export const demoKpis = {
  areaScannedKm2: 42.6,
  totalAnomalies: 127,
  shipwreckDetections: 83,
  highConfidence: 71,
}

export const confidenceDistribution = [
  { bucket: '90–100%', count: 41 },
  { bucket: '80–90%', count: 29 },
  { bucket: '70–80%', count: 18 },
  { bucket: '<70%', count: 15 },
]

export const statusDistribution = [
  { name: 'Verified', value: 62, color: '#3ddc97' },
  { name: 'Pending', value: 39, color: '#e8a33d' },
  { name: 'Rejected', value: 26, color: '#e85d4f' },
]

export const missionDistribution = [
  { mission: 'Mission_001', detections: 87 },
  { mission: 'Mission_002', detections: 31 },
  { mission: 'Mission_003', detections: 9 },
]

export const detectionTimeline = [
  { day: 'Aug 01', detections: 12 },
  { day: 'Aug 03', detections: 22 },
  { day: 'Aug 05', detections: 15 },
  { day: 'Aug 10', detections: 18 },
  { day: 'Aug 12', detections: 9 },
  { day: 'Aug 19', detections: 27 },
  { day: 'Aug 21', detections: 24 },
]

export const futureClasses = [
  'Ghost Net',
  'Pipe',
  'Cylinder',
  'Tire',
  'Bottle',
  'Can',
  'Other Debris',
]

export const duplicateCandidate = {
  detectionId: 'SW-023',
  matchId: 'SW-018',
  similarity: 0.91,
  distanceMeters: 3.2,
}