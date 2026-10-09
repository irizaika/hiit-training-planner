# HIIT Training Planner

A small React + TypeScript workout app for building and running short, high-intensity training sessions without needing a bloated fitness app.

This project is built around the idea of a fast workout flow:

- create a training block
- define work and rest intervals
- run the timer with minimal friction
- save your plans locally in the browser
- export or import workout data when needed

It is not a starter template. It is a practical training tool for moving from planning to execution quickly.

## What it does

### HIIT mode
- build custom HIIT workouts with exercises, intervals, and rounds
- configure work time, rest time, and round-level breaks
- create, edit, duplicate, or delete workouts from a local library

### Rounds and sets
- support different workout structures beyond a single interval flow
- define multi-round training blocks and repeated set-based sessions

### Timer experience
- simple countdown-style timing interface
- focused layout for workout execution
- designed for a laptop or phone screen during training

### Data handling
- workouts are stored in the browser
- workout collections can be imported/exported as JSON

## Project structure

- `src/app` — app shell and routing
- `src/features` — workout flows and timer pages
- `src/components` — shared layout and UI building blocks
- `src/context` — workout state management
- `src/models` — workout and exercise types
- `src/services` — import/export functionality
- `src/utils` — helpers for IDs, timing, and local utilities

## Getting started

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Typical workflow

1. Open the app and choose a workout mode.
2. Create a workout or select an existing one.
3. Add exercises and set timings.
4. Start the timer and follow the interval flow.
5. Save or export the plan for reuse later.

## Notes

This app intentionally keeps the UI lean and action-focused. The goal is not a giant fitness dashboard; it is a fast, clear tool for executing a workout without getting in the way.

## Tech stack

- React
- TypeScript
- Vite
- CSS for layout and components

## License

This project is for personal or local use. If you are using it in a production or team environment, check the repository owner for any explicit licensing details before redistribution.

