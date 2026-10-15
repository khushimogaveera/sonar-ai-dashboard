   # Sonar AI — Man-Made Debris Detection

A React + Vite + Tailwind dashboard for a Side Scan Sonar (SSS) man-made
debris detection system. The inference backend runs on Hugging Face Spaces
(ZeroGPU) and is called directly from the frontend.

## Live Demo

🔗 [App](https://YOUR-VERCEL-APP.vercel.app)
🤖 [Backend (HF Space)](https://huggingface.co/spaces/khushimogaveera/shipwreck-sonar-ai)

## Run it

```bash
npm install
npm run dev
```

The backend is hosted on Hugging Face Spaces
and runs on ZeroGPU. For local inference development, clone the space and run
the inference script directly.

How detection works
Every page calls exactly two functions from src/services/detectionService.js:
```
detectAnomaly(imageFile, onStage)   // → detection result
getMetadata(detectionId)            // → geotag / dimensions / survey info
```
detectAnomaly sends the uploaded image to the HF Spaces inference endpoint
via fetch and returns bounding boxes, confidence scores, and detection
metadata. getMetadata fetches survey/geotag info for a given detection ID.

To point at a different inference server, update the base URL in
detectionService.js — no component or page needs to change.

Structure
```
src/
  components/   shared UI (sidebar, top bar, cards, badges…)
  pages/        one file per route (Overview, Sonar Analysis, Hazard Map…)
  services/     detectionService.js — API layer for the inference backend
  state/        DetectionsContext.jsx — shared, localStorage-backed state
```
