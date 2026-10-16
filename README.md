# Lab 3 — Hierarchical solar system

Based on the course TE_Group_EN examples. Sun is a scene child with central PointLight and AmbientLight. Earth sits at x=6 under earthOrbit; Moon sits under moonOrbit under Earth. Mars and Phobos form a second branch. The supplied Saturn and rings remain as an additional example. The camera frames the full system and the Sun has an emissive material so it is visible around the central light.

Per-frame rotations: Earth orbit 0.01, Moon orbit 0.04, Earth spin 0.05, Sun spin 0.006, Mars orbit 0.007, Phobos orbit 0.06, Mars spin 0.05, Saturn orbit 0.004 and spin 0.03 radians. Child bodies inherit their parent transforms, so the Moon follows Earth.

Run `npm ci` then `npm run dev` and select Lab 3. Drag to orbit; scroll to zoom. Run `npm run build` for a production build.

Author date: October 16, 2026, matching the Classroom material date by request, not evidence of completion or submission then. The committer date records actual creation.
