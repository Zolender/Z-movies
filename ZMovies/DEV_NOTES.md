# Developer Notes: Logic & Patterns

*Reflections on the architecture and patterns used in Z-Movies.*

## 1. State Management & "Source of Truth"
The core philosophy here is **Lifting State Up**.
- `App.jsx` acts as the container controller. It holds the essential state:
    - `movieObject`: The raw data from the API.
    - `searchItem`: The current input value.
    - `loading`: The UI state.
- **Why?** By keeping the state high up, we can easily pass it down to presentational components like `Movies.jsx`. `Movies.jsx` is "dumb"—it doesn't know how to fetch data, it only knows how to *render* what it's given. This Separation of Concerns makes the app easier to debug.

## 2. The `useEffect` Initial Fetch
We use the `useEffect` hook with an empty dependency array `[]` to simulate "Component Did Mount".
```javascript
useEffect(() => {
  // ... fetch logic ...
}, []) // <--- Empty array means "run once on load"
```
**Pattern Note**: We defined the async function *inside* the effect. This is a common React pattern to avoid declaring a dependency on an external function, keeping the effect self-contained.

## 3. Async/Await & API Handling
Instead of `.then()` chains, I used `async/await` for readability.
- **Error Handling (Implicit)**: Currently, we just await the response. A robust future improvement would be a `try/catch` block to handle network failures gracefully.
- **Guard Clauses**: In `Movies.jsx`, inside the map loop, there's a check: `if (!movie) return null;`. This defensive coding prevents the app from crashing if the API returns a malformed array item.

## 4. Controlled Components
The search input is a "Controlled Component".
- The input's `value` is tied directly to React state (`searchItem`).
- The `onChange` handler updates that state immediately.
- **Benefit**: The UI and the Data are always in sync. We never have to "ask" the DOM what's in the box; React already knows.

## 5. Theme Persistence (LocalStorage side-effect)
In `ThemeToggle.jsx`, the logic does two things when state changes:
1.  **Visual**: Updates the DOM (`document.documentElement.classList`).
2.  **Persistence**: Writes to `localStorage`.

The `useState` initialization hook is also interesting:
```javascript
useState(localStorage.getItem("theme") || "light")
```
This "Lazy Initialization" ensures we read from storage *before* the first render, preventing a flash of the wrong theme.

## 6. Derived State / Conditional Rendering
In `App.jsx`, we use logical AND `&&` widely:
```jsx
{loading && <div>Loading...</div>}
```
This is cleaner than `if/else` logic inside the return statement for simple toggles.

## Future Improvements to Consider
- **Debouncing**: Currently, we search on click/enter. If we wanted "search as you type", we'd need a Debounce pattern to avoid hammering the API with every keystroke.
- **Custom Hook**: The fetching logic could be extracted into a `useOMDB` custom hook to further clean up `App.jsx`.
