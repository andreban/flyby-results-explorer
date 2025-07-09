# Tech Context

## Technologies Used

This project is built with:

- **Vite:** A modern frontend build tool that significantly improves the frontend development experience.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **React:** A JavaScript library for building user interfaces.
- **shadcn/ui:** A collection of re-usable components built using Radix UI and Tailwind CSS.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.
- **React Router:** For declarative routing in the React application.
- **TanStack Query:** For data fetching, caching, and state management.
- **Built-in AI (Gemini Nano):** For in-browser natural language processing, used in the Smart Filters feature.

## Built-in AI API

The project utilizes the **Prompt API**, which is part of the Built-in AI APIs in Chrome. This API is available under the `window.LanguageModel` namespace and provides direct access to the **Gemini Nano** model, allowing for on-device natural language processing without needing to send data to a server.

### Key Features:
- **On-device Processing:** All processing happens locally in the user's browser, which is great for privacy and speed.
- **Session-based:** The API works with sessions that can maintain the context of a conversation. The session is initialized with a system prompt, `temperature`, and `topK` parameters to control the model's behavior.
- **Availability:** The application must first check if the model is available (`"available"`) or if it needs to be downloaded (`"downloadable"`).
- **Structured Output:** The API supports forcing the model to return a JSON object that conforms to a specific **JSON Schema**. This is done by passing the schema in the `responseConstraint` option when calling the prompt methods. The schema can include default values for properties.

This API is used in the `getFilterConfigFromQuery` function to interpret natural language queries from the user and translate them into filter configurations.

## Development Setup

To set up the development environment, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_GIT_URL>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd <YOUR_PROJECT_NAME>
    ```
3.  **Install dependencies:**
    ```sh
    npm i
    ```
4.  **Start the development server:**
    ```sh
    npm run dev
    ```

## Dependencies

### Production Dependencies
- @hookform/resolvers: ^3.9.0
- @radix-ui/react-accordion: ^1.2.0
- @radix-ui/react-alert-dialog: ^1.1.1
- @radix-ui/react-aspect-ratio: ^1.1.0
- @radix-ui/react-avatar: ^1.1.0
- @radix-ui/react-checkbox: ^1.1.1
- @radix-ui/react-collapsible: ^1.1.0
- @radix-ui/react-context-menu: ^2.2.1
- @radix-ui/react-dialog: ^1.1.2
- @radix-ui/react-dropdown-menu: ^2.1.1
- @radix-ui/react-hover-card: ^1.1.1
- @radix-ui/react-label: ^2.1.0
- @radix-ui/react-menubar: ^1.1.1
- @radix-ui/react-navigation-menu: ^1.2.0
- @radix-ui/react-popover: ^1.1.1
- @radix-ui/react-progress: ^1.1.0
- @radix-ui/react-radio-group: ^1.2.0
- @radix-ui/react-scroll-area: ^1.1.0
- @radix-ui/react-select: ^2.1.1
- @radix-ui/react-separator: ^1.1.0
- @radix-ui/react-slider: ^1.2.0
- @radix-ui/react-slot: ^1.1.0
- @radix-ui/react-switch: ^1.1.0
- @radix-ui/react-tabs: ^1.1.0
- @radix-ui/react-toast: ^1.2.1
- @radix-ui/react-toggle: ^1.1.0
- @radix-ui/react-toggle-group: ^1.1.0
- @radix-ui/react-tooltip: ^1.1.4
- @tanstack/react-query: ^5.56.2
- class-variance-authority: ^0.7.1
- clsx: ^2.1.1
- cmdk: ^1.0.0
- date-fns: ^3.6.0
- embla-carousel-react: ^8.3.0
- input-otp: ^1.2.4
- lucide-react: ^0.462.0
- next-themes: ^0.3.0
- react: ^18.3.1
- react-day-picker: ^8.10.1
- react-dom: ^18.3.1
- react-hook-form: ^7.53.0
- react-resizable-panels: ^2.1.3
- react-router-dom: ^6.26.2
- recharts: ^2.12.7
- sonner: ^1.5.0
- tailwind-merge: ^2.5.2
- tailwindcss-animate: ^1.0.7
- vaul: ^0.9.3
- zod: ^3.23.8

### Development Dependencies
- @eslint/js: ^9.9.0
- @tailwindcss/typography: ^0.5.15
- @types/node: ^22.5.5
- @types/react: ^18.3.3
- @types/react-dom: ^18.3.0
- @vitejs/plugin-react-swc: ^3.5.0
- autoprefixer: ^10.4.20
- eslint: ^9.9.0
- eslint-plugin-react-hooks: ^5.1.0-rc.0
- eslint-plugin-react-refresh: ^0.4.9
- globals: ^15.9.0
- lovable-tagger: ^1.1.7
- postcss: ^8.4.47
- tailwindcss: ^3.4.11
- typescript: ^5.5.3
- typescript-eslint: ^8.0.1
- vite: ^5.4.1
