# Computer Graphics — Weekly dashboard

Four Three.js labs based on the TE_Group_EN course examples, with a Vite dashboard.

## Run locally

```sh
npm ci
npm run dev
```

Open the address printed by Vite and choose a week. Each scene includes a **Back to weeks** link.

## Project structure

```text
CG-2026-2027/
├── index.html                 # Dashboard entry page
├── labs/
│   ├── week-01/
│   │   ├── index.html         # Rotating cube scene
│   │   └── main.js
│   ├── week-02/
│   │   ├── index.html         # Interactive vector laboratory
│   │   ├── main.js
│   │   ├── math.js            # Testable vector and intersection calculations
│   │   ├── ray-plane.html     # Challenge entry page
│   │   └── ray-plane-intersection.js
│   ├── week-03/
│   │   ├── index.html         # Hierarchical solar system
│   │   └── main.js
│   └── week-04/
│       ├── index.html         # Crystal scene and exercise instructions
│       ├── main.js
│       └── style.css
├── styles/
│   ├── dashboard.css
│   └── lab.css                # Shared scene layout and navigation
├── tests/
│   └── lab2.test.js
├── package.json
├── package-lock.json
└── vite.config.js             # Multi-page production entry points
```

`node_modules/` and `dist/` are generated and excluded from Git.

## Labs

- Week 1: camera, orange cube, lighting, rotation and OrbitControls.
- Week 2: editable vectors, arithmetic, angle and zero-vector handling; separate ray–plane challenge with an on-screen Raycaster comparison.
- Week 3: Sun, Earth/Moon, Mars/Phobos and Saturn with hierarchical animation.

## Validation

```sh
npm test
npm run build
npm run preview
```

To add a week, create `labs/week-05/index.html` and `main.js`, link the shared `styles/lab.css`, then add the page to the dashboard and the input map in `vite.config.js`.

The original submission branches remain available separately. Their author dates match Classroom material dates by request; their committer dates record actual creation.

## Week 4 — Crystal & light

Open `labs/week-04/index.html` from the dashboard. This practice exercise is based on your brief and includes its Minimum / Standard / Challenge instructions on screen. It covers a faceted crystal, ambient and directional lighting controls, material properties, shadows, a light helper, and time-based rotation. Implementation lives in `labs/week-04/main.js` with its page styles in `style.css`.
