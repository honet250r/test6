# Weather Application Test Plan

## 1. Introduction
This document outlines the test plan for the Weather Application. The purpose of this plan is to ensure the application functions as expected, provides a good user experience, and handles errors gracefully.

## 2. Prerequisites
*   **Valid OpenWeatherMap API Key:** A valid API key from OpenWeatherMap must be configured in `script.js` (replacing the placeholder `YOUR_API_KEY`). Without a valid key, API calls will fail.
*   **Modern Web Browser:** Testing should be performed on modern web browsers such as Chrome, Firefox, Safari, or Edge.
*   **Internet Connection:** Required for fetching weather data from the API.
*   **Local Server (Optional but Recommended):** Running `index.html` via a local HTTP server (e.g., Python's `http.server`, Live Server extension in VS Code) is recommended to avoid potential issues with `file:///` paths, especially concerning API requests or future features.

## 3. Visual Inspection
These tests focus on the user interface and overall look and feel.

| Test ID | Test Description                                   | Expected Result                                                                                                |
| :------ | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| VI-001  | **Layout and Styling - Desktop**                   | Open `index.html` in a desktop browser. Verify that the header, city input, weather display, and footer are rendered correctly as per `weather_app_ui_design.md`. Check for overall clean and modern aesthetic, readability of text, and appropriate spacing. |
| VI-002  | **Layout and Styling - Mobile**                    | Open `index.html` in a mobile browser or using browser developer tools to simulate a mobile viewport (e.g., 375px width). Verify that the layout is responsive. The city search form elements should stack vertically. Content should be legible and usable. |
| VI-003  | **Weather Icon Display**                           | Upon a successful city search, ensure the weather icon is displayed clearly and is appropriate for the weather description. |
| VI-004  | **Readability**                                    | Check that all text (headings, labels, weather data, footer) is easily readable with sufficient contrast against its background. |

## 4. Functionality Testing (Core Features)

### 4.1. City Search and Weather Display

| Test ID | Test Case Description                                  | Steps                                                                                                | Expected Result                                                                                                                                                              |
| :------ | :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FT-001  | **Successful City Search - Valid City**                | 1. Open `index.html`. <br> 2. Enter a known valid city name (e.g., "Tokyo", "London", "New York") into the city input field. <br> 3. Click the "Search" button. | - The `#current-weather` div updates to show: <br>   - City name and country code (e.g., "Tokyo, JP"). <br>   - A relevant weather icon. <br>   - Current temperature in °C. <br>   - Current weather description. <br> - No errors in the browser console related to data fetching. |
| FT-002  | **City Not Found - Invalid/Nonexistent City**        | 1. Open `index.html`. <br> 2. Enter a clearly invalid or nonexistent city name (e.g., "NonExistentCity123", "Asdfghjkl") into the city input field. <br> 3. Click the "Search" button. | - The `#current-weather` div displays an informative error message (e.g., "Failed to fetch weather data. City not found or API error: 404 city not found."). <br> - `console.error` should log the error. |
| FT-003  | **Empty City Input**                                   | 1. Open `index.html`. <br> 2. Leave the city input field empty. <br> 3. Click the "Search" button.     | - The `#current-weather` div displays a message prompting the user to enter a city (e.g., "Please enter a city name."). <br> - No API call should be made.                       |
| FT-004  | **City Search with ZIP Code (If supported by direct API call)** | 1. Open `index.html`. <br> 2. Enter a valid ZIP code (e.g., "90210,us" - ensure country code is included if necessary for API). <br> 3. Click the "Search" button. | - The `#current-weather` div updates with correct weather data for the location corresponding to the ZIP code. <br> - (Note: This depends on OpenWeatherMap's direct handling of ZIP codes in the current API endpoint. The documentation mentions it's deprecated but functional for some regions like the US). |

## 5. Error Handling
These tests focus on how the application handles API-related errors beyond "city not found."

| Test ID | Test Case Description                                | Steps                                                                                                                               | Expected Result                                                                                                                                                               |
| :------ | :--------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EH-001  | **Invalid API Key**                                  | 1. Modify `script.js` to use an invalid API key (e.g., "INVALID_KEY"). <br> 2. Open `index.html`. <br> 3. Enter a valid city name. <br> 4. Click "Search". | - The `#current-weather` div displays a user-friendly error message indicating data retrieval failure (e.g., "Failed to fetch weather data. API error: 401 Invalid API key."). <br> - `console.error` logs the detailed error. |
| EH-002  | **Network Error / API Unreachable**                  | 1. Disconnect the internet connection (or simulate offline mode using browser developer tools). <br> 2. Open `index.html`. <br> 3. Enter a valid city name. <br> 4. Click "Search". | - The `#current-weather` div displays a user-friendly error message (e.g., "Failed to fetch weather data. Network error or API unreachable."). <br> - `console.error` logs the network error. |
| EH-003  | **Unexpected API Response Structure (Conceptual)**   | (This might be hard to simulate without mocking) If the API returns valid JSON but with an unexpected structure.                       | The application should ideally not crash. It might display partial data or a generic error message. `console.error` should log the issue. (Graceful degradation).             |

## 6. Accessibility Check (Conceptual)
A full accessibility audit is extensive, but basic checks should be considered.

| Test ID | Test Description                                  | Steps                                                                                                                                                              | Expected Result                                                                                                                               |
| :------ | :------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-001  | **Keyboard Navigation**                           | 1. Open `index.html`. <br> 2. Use the `Tab` key to navigate through interactive elements (input field, search button, links in footer). <br> 3. Use `Enter` key to submit the form when the search button or input field has focus. | - All interactive elements should be focusable in a logical order. <br> - The search form can be submitted using the `Enter` key.             |
| AC-002  | **Screen Reader Compatibility (Basic Check)**       | (Using a screen reader like NVDA, JAWS, or VoiceOver) <br> 1. Navigate the page.                                                                                   | - The city input field should have an accessible label (even if visually hidden). <br> - Button text should be descriptive. <br> - Weather information should be announced in a comprehensible way. |
| AC-003  | **Semantic HTML**                                 | Review `index.html`.                                                                                                                                               | - Use of semantic HTML elements (`header`, `main`, `footer`, `section`, `form`, `label`, `button`) is appropriate.                               |

## 7. Future Testing Considerations (Out of Scope for Initial Implementation)
*   Forecast display functionality.
*   Geolocation button functionality.
*   Saving favorite cities.
*   Unit selection (Celsius/Fahrenheit).
*   More detailed responsive testing across various devices.
*   Performance testing (load times).
*   Comprehensive accessibility audit.

This test plan provides a foundational set of tests for the initial features of the Weather Application. It should be expanded as new features are added.
