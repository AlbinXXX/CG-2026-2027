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
│       ├── index.html         # Interactive car model
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

## Week 4 — Car model

Open `labs/week-04/index.html`. Drag to rotate, scroll to zoom, and right-drag to pan using OrbitControls. The background is light grey, with fixed lighting and no GUI panel.

The car loads from `public/models/toy-car/ToyCar.glb` using GLTFLoader. After loading, the browser console logs mesh count, total vertex buffer entries and triangle faces, summed across mesh instances. Shared vertices at matching positions are not welded for this count. There is no on-screen statistics overlay.

Model: [Khronos Toy Car](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/ToyCar), CC0-1.0. See `public/models/toy-car/LICENSE.md` for license details.
