# Active Context

## Current Work Focus

The current focus is on the new voice input feature for Smart Filters.

## Recent Changes

- **Conditionally Show Microphone Button:**
  - The microphone input button for the smart filters is now only shown if the Multimodal Prompt API is available.
  - This was achieved by creating a new `isMultimodalModelAvailable` function in `src/lib/voice.ts` and using it in the `SmartFilters` component to conditionally render the button.

- **Automatic Filtering After Voice Input:**
  - The Smart Filters feature now automatically applies the filters as soon as the voice input has been transcribed.
  - This was achieved by modifying the `onstop` event handler for the `MediaRecorder` to call the `handleFilter` function directly after a successful transcription.

- **Voice Input for Smart Filters (User Fix):**
  - The user has corrected the implementation of the voice input feature.
  - The `prompt` method in `src/lib/voice.ts` now uses the correct payload structure for multimodal input, passing a single message object with a content array.
  - A `@ts-expect-error` directive is used in `src/lib/voice.ts` to suppress type errors, avoiding the need for conflicting global type definitions.
  - `src/lib/ai.ts` and `src/vite-env.d.ts` have been reverted to their original, working state.

- **Voice Input for Smart Filters:**
  - Implemented a new feature allowing users to input their flight filter queries using their voice.
  - Added a microphone button to the `SmartFilters` component to start and stop recording.
  - Created a new `src/lib/voice.ts` file to handle the speech-to-text transcription using the Prompt API's multimodal capabilities.
  - Updated the `SmartFilters` component to manage recording state and integrate the new voice transcription functionality.
  - Added TypeScript definitions for the multimodal Prompt API to `src/vite-env.d.ts`.

- **Price Filter Bug Fix:**
  - Fixed a bug where the `minPrice` label in the price range slider was changing when a smart filter was applied. The `handleSmartFilterChange` function was updated to correctly derive the slider's UI state from the newly updated filter state, ensuring that when a price filter is not active, the slider resets to its absolute minimum or maximum value.
- **Filter State Management:**
  - Documented the filter state management logic in `systemPatterns.md` to ensure the behavior is not accidentally modified in the future.
- **Prompt API Integration:**
    - The integration with the Prompt API has been updated to use a system prompt and to set the `temperature` and `topK` parameters.
    - The JSON schema has been updated to include default values and to disallow additional properties.
- **API Integration:** Replaced the mock implementation of `getFilterConfigFromQuery` with a real API call to the Built-in AI (Gemini Nano) service.
- **"Clear All Filters" Bug Fix:**
    - Fixed a bug where the "Clear all filters" button in the empty results view was not resetting the price range slider.
- **Price Range Slider Fix:**
    - Fixed an issue where the price range slider was not being updated when the filters were changed by the Smart Filters feature.
- **Smart Filters Logic:**
    - Created a new `getFilterConfigFromQuery` function that returns a mock filter configuration.
- **TypeScript and ESLint Fixes:**
    - Resolved a series of TypeScript errors and ESLint warnings.
- **Stops Filter Logic:**
    - Updated the `getFilterConfigFromQuery` function to correctly handle the `nonstop`, `onestop`, and `twostop` settings from the AI model and transform them into the `stops` array required by the application's filter state.
    - Corrected the JSON schema in `ai.ts` to use `onestop` and `twostop` to match the expected property names.
- **Price Filter Bug Fix:**
    - Fixed a bug where the `minPrice` filter would reset to its default value after being adjusted. This was resolved by separating the filter change handlers for manual and smart filter updates.
- **Smart Filter Price Update Bug Fix:**
    - Fixed a regression where the `minPrice` and `maxPrice` filters were not being updated when the Prompt API returned new values.

- **Deployment Configuration:** The application now uses `HashRouter` and relative paths in `index.html` to support deployments to relative paths and prevent 404 errors. The `NotFound` page has been updated to use the `Link` component for correct client-side navigation.
- **Display Airport Names:** The UI now displays airport names alongside their IATA codes in the flight results and filters. This was achieved by updating the `FlightCard` and `FilterSidebar` components to render both the `destinationCode` and `destination`, and `originCode` and `origin` properties from the flight data. The change is purely presentational, and the system continues to use IATA codes for all internal logic. The `availableAirports` data structure in `mockFlights.ts` was updated to support this change.

## Next Steps

- **UI/UX Refinements:** Continue to refine the UI and UX of the Smart Filters feature and the rest of the application.
- **Testing:** Add tests for the new Smart Filters functionality and the "Clear all filters" button.

## Airport Filter Compatibility

- **Standardized Airport Codes:** The application now exclusively uses 3-letter IATA codes for airport filtering to ensure compatibility between the Prompt API and the manual filter controls.
- **Updated Filtering Logic:** The filtering logic in `Index.tsx` has been updated to use strict equality checks for airport codes, improving reliability.
- **Mock Data Alignment:** The `availableAirports` in `mockFlights.ts` has been updated to provide a list of objects containing both the IATA code and the airport name, ensuring consistency with the filter state.
