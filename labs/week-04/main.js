import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(5, 3, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 3;
controls.maxDistance = 15;

const studio = new RoomEnvironment();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(studio, 0.04).texture;
studio.dispose();
pmrem.dispose();
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(3, 4, 5);
scene.add(light);

new GLTFLoader().load('/models/toy-car/ToyCar.glb', ({ scene: car }) => {
    // Center the model and make its longest dimension four scene units.
    const box = new THREE.Box3().setFromObject(car);
    const size = box.getSize(new THREE.Vector3());
    const scale = 4 / Math.max(size.x, size.y, size.z);
    car.scale.setScalar(scale);
    car.position.copy(box.getCenter(new THREE.Vector3())).multiplyScalar(-scale);
    scene.add(car);

    let meshes = 0, vertices = 0, faces = 0;
    car.traverse(object => {
        if (!object.isMesh) return;
        const geometry = object.geometry;
        meshes++;
        vertices += geometry.attributes.position.count;
        faces += (geometry.index ? geometry.index.count : geometry.attributes.position.count) / 3;
    });
    // Counts include each mesh instance. Faces are triangles; vertices are buffer entries.
    console.log('Car meshes:', meshes);
    console.log('Total vertices:', vertices);
    console.log('Total faces (triangles):', faces);
}, undefined, error => {
    console.error('Could not load the car model:', error);
    const message = document.createElement('p');
    message.textContent = 'Could not load the car. Please refresh the page.';
    message.style.cssText = 'position:fixed;top:20px;left:20px;color:#222;font:16px sans-serif';
    document.body.appendChild(message);
});

renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
});
window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});
