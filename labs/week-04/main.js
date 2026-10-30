import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'three/addons/libs/lil-gui.module.min.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10151f);
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(5, 3.3, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);
renderer.domElement.setAttribute('aria-label', 'Interactive faceted crystal with adjustable lighting');

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.1, 0);
controls.minDistance = 3;
controls.maxDistance = 18;
controls.maxPolarAngle = Math.PI / 2 + 0.1;
controls.update();
controls.saveState();

// Six-sided body, with a pointed crown and base. The convex hull triangulates it.
const points = [new THREE.Vector3(0, 2, 0), new THREE.Vector3(0, -1.8, 0)];
for (const y of [-0.8, 0.8]) {
    for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI / 3;
        points.push(new THREE.Vector3(Math.cos(angle), y, Math.sin(angle)));
    }
}
const material = new THREE.MeshPhysicalMaterial({
    color: '#7ddbd2', roughness: 0.18, metalness: 0.15,
    clearcoat: 1, clearcoatRoughness: 0.1, flatShading: true,
});
const crystal = new THREE.Mesh(new ConvexGeometry(points), material);
crystal.castShadow = true;
crystal.receiveShadow = true;
scene.add(crystal);

const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(1.65, 1.85, 0.35, 64),
    new THREE.MeshStandardMaterial({ color: 0x354254, roughness: 0.65 }),
);
pedestal.position.y = -2;
pedestal.castShadow = true;
pedestal.receiveShadow = true;
scene.add(pedestal);
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0x172130, roughness: 0.9 }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.18;
floor.receiveShadow = true;
scene.add(floor);

const ambient = new THREE.AmbientLight('#b6ccff', 0.7);
const directional = new THREE.DirectionalLight('#fff0dd', 4);
directional.position.set(4, 6, 3);
directional.castShadow = true;
directional.shadow.mapSize.set(2048, 2048);
Object.assign(directional.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 0.1, far: 35 });
directional.shadow.camera.updateProjectionMatrix();
directional.shadow.normalBias = 0.03;
scene.add(ambient, directional, directional.target);
const helper = new THREE.DirectionalLightHelper(directional, 0.8);
helper.visible = false;
scene.add(helper);

const settings = {
    ambientColor: '#b6ccff', directionalColor: '#fff0dd', crystalColor: '#7ddbd2',
    rotate: true, speed: 0.35,
    reset() {
        gui.reset();
        crystal.rotation.set(0, 0, 0);
        controls.reset();
    },
};
const gui = new GUI({ title: 'Crystal studio', width: 270 });
const ambientFolder = gui.addFolder('Ambient light');
ambientFolder.add(ambient, 'visible').name('Enabled');
ambientFolder.addColor(settings, 'ambientColor').name('Color').onChange(value => ambient.color.set(value));
ambientFolder.add(ambient, 'intensity', 0, 3, 0.05).name('Intensity');
const directionalFolder = gui.addFolder('Directional light');
directionalFolder.add(directional, 'visible').name('Enabled');
directionalFolder.addColor(settings, 'directionalColor').name('Color').onChange(value => directional.color.set(value));
directionalFolder.add(directional, 'intensity', 0, 8, 0.05).name('Intensity');
directionalFolder.add(directional.position, 'x', -8, 8, 0.1).name('Position X');
directionalFolder.add(directional.position, 'y', 1, 10, 0.1).name('Position Y');
directionalFolder.add(directional.position, 'z', -8, 8, 0.1).name('Position Z');
directionalFolder.add(directional, 'castShadow').name('Cast shadows');
directionalFolder.add(helper, 'visible').name('Show light helper');
const crystalFolder = gui.addFolder('Crystal material');
crystalFolder.addColor(settings, 'crystalColor').name('Color').onChange(value => material.color.set(value));
crystalFolder.add(material, 'roughness', 0.05, 1, 0.01).name('Roughness');
crystalFolder.add(material, 'metalness', 0, 1, 0.01).name('Metalness');
crystalFolder.add(material, 'clearcoat', 0, 1, 0.01).name('Clearcoat');
crystalFolder.add(material, 'wireframe').name('Wireframe');
crystalFolder.close();
const motionFolder = gui.addFolder('Motion');
motionFolder.add(settings, 'rotate').name('Auto rotate');
motionFolder.add(settings, 'speed', -1.5, 1.5, 0.05).name('Speed (rad/s)');
gui.add(settings, 'reset').name('Reset scene');
if (innerWidth < 650) gui.close();

let previousTime;
renderer.setAnimationLoop(time => {
    // Clamp the interval after returning from a background tab.
    const delta = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    if (settings.rotate) crystal.rotation.y += settings.speed * delta;
    controls.update();
    helper.update();
    renderer.render(scene, camera);
});
window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});
