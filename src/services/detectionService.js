import { Client, handle_file } from '@gradio/client'

const SPACE = 'khushimogaveera/shipwreck-sonar-ai'

export async function detectAnomaly(imageFile, onStage) {
  if (!imageFile) {
    throw new Error('No sonar image selected.')
  }

  onStage?.(0, 'Uploading Image')

  const app = await Client.connect(SPACE)

  onStage?.(1, 'Preprocessing')
  onStage?.(2, 'Running AI Model')

  const result = await app.predict('/predict', [
    handle_file(imageFile),
    0.6,
  ])

  onStage?.(3, 'Analyzing Anomaly')
  onStage?.(4, 'Generating Report')

  const [
    original,
    mask,
    overlay,
    confidence,
    predictedArea,
    width,
    height,
  ] = result.data

  return {
    detection_id: `SONAR-${Date.now()}`,

    classification:
      predictedArea > 0
        ? 'Wreck-like Region'
        : 'No Region Detected',

    confidence: Number(confidence),
    predicted_area_percent: Number(predictedArea),
    width: Number(width),
    height: Number(height),
    threshold: 0.6,

    original_url: original?.url || original,
    mask_url: mask?.url || mask,
    overlay_url: overlay?.url || overlay,

    source: 'huggingface-unet',
  }
}

export async function getMetadata(detectionId, result = null) {
  return {
    detection_id: detectionId,

    // Prototype survey metadata.
    latitude: 19.0760,
    longitude: 72.8777,

    width: result?.width ?? null,
    height: result?.height ?? null,

    survey: 'Prototype Sonar Survey',
    timestamp: new Date().toISOString(),
    status: 'Pending Review',

    source: 'demo-metadata',
  }
}