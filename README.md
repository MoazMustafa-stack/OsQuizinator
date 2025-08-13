# OsQuizinator

A clean, responsive React + TypeScript quiz app focused on Operating Systems concepts. It features immediate answer feedback, auto-advance, and a clear results review screen.

## Features

- Immediate feedback on selection:
  - Correct option highlights green right after you click.
  - If your selection is wrong, it shows a red “✗ Incorrect” badge while the correct option is shown in green.
- Auto-advance: automatically moves to the next question after 2 seconds.
- Simple controls: Previous, Submit, Next are shown on every question.
- Results page: shows your score, lists every question in bold, and highlights correct answers in green font with a light green background. Wrong selections are shown with a light red background.
- Centered, responsive layout using CSS variables; works well on desktop and mobile.

## Tech Stack

- React + TypeScript + Vite
- Minimal custom CSS (no Tailwind required) using CSS variables defined in `src/index.css`.

## Project Structure

```
OsQuizinator/
├─ src/
│  ├─ App.tsx        # Main quiz logic and UI
│  ├─ index.css      # Global CSS variables, base styles, utilities
│  ├─ App.css        # Card/host styles
│  └─ main.tsx       # Vite entry
└─ README.md
```

## Behavior Summary

- Selecting an option immediately reveals the correct one in green.
- After 2 seconds, the app automatically advances to the next question (unless you are on the last one).
- You can navigate manually with Previous/Next.
- A Submit button is available on every question. Submitting shows the results screen.
- On the results page:
  - Each question is bold.
  - The correct answer uses green font and a light green background.
  - Your wrong selection (if any) is shown with a light red background.

## Accessibility

- Clear color contrast and large click targets.
- Keyboard focus can be added by converting options to buttons and handling key events if needed.

## License

MIT
