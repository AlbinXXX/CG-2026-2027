import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import GUI from 'three/addons/libs/lil-gui.module.min.js';
import { addBackground } from './background.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(4, 3, 6);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
addBackground(scene, renderer);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

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

const ambient = new THREE.AmbientLight(0xffffff, 0.7);
const directional = new THREE.DirectionalLight(0xffffff, 3);
directional.position.set(3, 4, 5);
scene.add(ambient, directional);

const settings = { points: 5, rotate: true, color: '#ffffff' };
const gui = new GUI({ title: 'Crystal controls' });
gui.add(settings, 'points', 5, 24, 1).name('Total points').onChange(value => {
    crystal.geometry.dispose();
    crystal.geometry = createCrystal(value);
});
gui.add(settings, 'rotate').name('Rotate');
gui.addColor(settings, 'color').onChange(value => material.color.set(value));
gui.add(material, 'roughness', 0, 1);
gui.add(material, 'wireframe');
const glass = gui.addFolder('Glass');
glass.add(material, 'transmission', 0, 1).name('Transparency');
glass.add(material, 'ior', 1, 2.4).name('Refraction (IOR)');
glass.add(material, 'thickness', 0, 3).name('Thickness');
glass.close();

const lights = gui.addFolder('Lights');
lights.add(ambient, 'intensity', 0, 3).name('Ambient intensity');
lights.add(directional, 'intensity', 0, 6).name('Directional intensity');
lights.add(directional.position, 'x', -8, 8).name('Light X');
lights.add(directional.position, 'y', 1, 8).name('Light Y');
lights.add(directional.position, 'z', -8, 8).name('Light Z');

let previousTime = 0;
renderer.setAnimationLoop(time => {
    const delta = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    if (settings.rotate) crystal.rotation.y += delta * 0.35;
    controls.update();
    renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});
