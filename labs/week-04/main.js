import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(4, 3, 6);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

// Two tips + a ring: 5 total points means 2 tips and 3 ring points.
function createCrystal(totalPoints) {
    const points = [new THREE.Vector3(0, 2, 0), new THREE.Vector3(0, -2, 0)];
    const ringPoints = totalPoints - 2;
    for (let i = 0; i < ringPoints; i++) {
        const angle = i * Math.PI * 2 / ringPoints;
        points.push(new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)));
    }
    return new ConvexGeometry(points);
}

const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, roughness: 0.06, metalness: 0, flatShading: true,
    transmission: 1, thickness: 1.5, ior: 1.5,
    attenuationColor: new THREE.Color(0xb5eee5), attenuationDistance: 4,
});
const crystal = new THREE.Mesh(createCrystal(5), material);
scene.add(crystal);

const directional = new THREE.DirectionalLight(0xffffff, 3);
directional.position.set(3, 4, 5);
scene.add(directional);

let previousTime = 0;
renderer.setAnimationLoop(time => {
    const delta = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    crystal.rotation.y += delta * 0.35;
    renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});
