# System Patterns

## System Architecture

The project follows a standard **component-based architecture**, which is common for React applications. The UI is broken down into a hierarchy of reusable components.

- **`src/`**: The main application source code.
- **`src/components/`**: Contains reusable UI components.
  - **`src/components/ui/`**: Likely contains base UI components from the shadcn/ui library.
- **`src/pages/`**: Represents the different pages of the application, likely corresponding to different routes.
- **`src/hooks/`**: Custom React hooks for reusable logic.
- **`src/data/`**: For mock or static data.
- **`src/lib/`**: Utility functions and libraries.

## Design Patterns

- **Component-Based Architecture:** The UI is built as a tree of components, promoting reusability and separation of concerns.
- **Hooks:** React Hooks (`useState`, `useEffect`, custom hooks) are used for managing state and side effects within functional components.
- **Utility-First CSS (Tailwind CSS):** Styles are applied directly in the markup using utility classes, which allows for rapid UI development without writing custom CSS.

## Component Relationships

- **`main.tsx`**: The entry point of the application, responsible for rendering the root `App` component.
- **`App.tsx`**: The root component, which likely sets up the main layout and routing.
- **Pages (`src/pages/`)**: High-level components that are rendered based on the current route. They compose smaller, reusable components from `src/components/`.
- **UI Components (`src/components/ui/`)**: Low-level, presentational components that are used to build more complex UI elements.

## Prompt API Interaction

The application interacts with the **Prompt API** to power the Smart Filters feature. This interaction follows a specific pattern to ensure that the feature works correctly and efficiently.

1.  **Check for Availability:** Before attempting to use the API, the application first checks if the `LanguageModel` is available by calling `LanguageModel.availability()`. This ensures that the user's browser supports the API and that the model is ready to be used.

2.  **Create a Session:** If the model is available, the application creates a new session using `LanguageModel.create()`. The session is initialized with a system prompt that instructs the model on its role as a helpful assistant for extracting flight filter information. The `temperature` and `topK` parameters are also set to control the creativity and predictability of the model's responses.

3.  **Send the Prompt:** The `getFilterConfigFromQuery` function sends only the user's natural language query as a prompt to the model using the `session.prompt()` method. To ensure that the model returns a predictable JSON object, a **JSON Schema** is passed as a `responseConstraint`. The schema defines the expected structure of the response, including default values for `minPrice` and `maxPrice`.

4.  **Process the Response:** The response from the model, which is guaranteed to be a JSON object that conforms to the provided schema, is then parsed and used to update the application's filter state.

5.  **Error Handling:** The implementation includes error handling to gracefully manage situations where the API is not available or if there is an issue with the model's response.

## Filter State Management

The application's filtering logic is designed to be robust and flexible, particularly in how it handles price filters.

- **Price Filter Logic:** The `minPrice` and `maxPrice` filters use a default value of `-1` to indicate that the filter is not active. When either of these filters is set to `-1`, the filtering logic ignores it, allowing users to filter by only a minimum or maximum price.

- **Price Range Slider:** The price range slider's UI state is managed by the `tempPriceRange` state variable. When a smart filter is applied, the `handleSmartFilterChange` function updates this state to reflect the new filter values. If the `minPrice` or `maxPrice` is `-1`, the slider resets to the absolute minimum or maximum value, ensuring the UI remains consistent.
