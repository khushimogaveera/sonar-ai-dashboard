# Sonar AI — Man-Made Debris Detection (Frontend Prototype)

A React + Vite + Tailwind dashboard for a Side Scan Sonar (SSS) man-made
debris detection system. **This is a frontend-only prototype.** No real
AI model or backend is connected — detections, metadata, missions, and
analytics are all demo data, clearly labeled throughout the UI.

## Run it

```bash
npm install
npm run dev
```

## What's real vs. mock

- **Real:** the sonar image viewer only ever shows an image you actually
  upload. Nothing about the image itself is generated or faked.
- **Mock:** the detection result, confidence score, coordinates,
  dimensions, mission metadata, analytics, and review-queue seed data are
  all placeholders, labeled with `DEMO` badges everywhere they appear.

## Swapping in your real model later

Every page calls exactly two functions from `src/services/detectionService.js`:

```js
detectAnomaly(imageFile, onStage)   // → detection result
getMetadata(detectionId)            // → geotag / dimensions / survey info
```

To connect your real model:

1. Write a real implementation (e.g. a `fetch` to your inference
   endpoint) that returns the same shape as `mockDetectionService.js`'s
   `runMockDetection`.
2. In `detectionService.js`, swap the import/call from
   `mockDetectionService` to your real module. Do the same for
   `metadataService.js` if you have real GPS/header parsing.
3. No component or page needs to change — they only ever talk to
   `detectionService.js`.

## Structure

```
src/
  components/   shared UI (sidebar, top bar, cards, badges…)
  pages/        one file per route (Overview, Sonar Analysis, Hazard Map…)
  services/     detectionService.js (the abstraction) + the two mocks
  data/         demoData.js — all placeholder detections/missions/analytics
  state/        DetectionsContext.jsx — shared, localStorage-backed state
```

Delete `src/data/demoData.js` and the two mock services once your real
model and metadata sources are wired up.
