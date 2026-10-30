import * as THREE from 'three'
import { intersectPlane } from './math.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
100
)
camera.position.set(5, 6, 7)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//n.dot(p)
const n = new THREE.Vector3(0, 1, 0)
const p = new THREE.Vector3(0, 0, 0)
const d = n.dot(p)

const geometry = new THREE.PlaneGeometry(12, 12)
const material = new THREE.MeshBasicMaterial({ color: 0x9c6d6d })
const floor = new THREE.Mesh(geometry, material)
floor.rotation.x = -Math.PI / 2; // rotate for 90 degrees
floor.updateMatrixWorld(true);
const grid = new THREE.GridHelper(12, 12)
grid.position.y = 0.01;
scene.add(floor, grid)

//o+t(dot)d
const o = new THREE.Vector3(2, 5, -1)
const dir = new THREE.Vector3(-1, -1, 1).normalize()

const hit = intersectPlane(o, dir, n, d);
if (!hit) throw new Error("The configured ray does not intersect the plane ahead.");

const ray = new THREE.Line(
new THREE.BufferGeometry().setFromPoints([o, hit]),
new THREE.LineBasicMaterial({ color: 0xFF0000 })
)
scene.add(ray)

const dot = new THREE.Mesh(
new THREE.SphereGeometry(0.18),
new THREE.MeshBasicMaterial({ color: 0xF5F527 })
)
dot.position.copy(hit)
scene.add(dot)

//Compare with RayCaster
const rayCaster = new THREE.Raycaster(o,dir).intersectObject(floor)[0]
console.log('Our Formula:', hit)
console.log('RayCaster:', rayCaster?.point);
const status = document.createElement('div');
status.style.cssText = 'position:fixed;top:16px;left:16px;background:#fff;padding:12px;font:16px sans-serif;';
const format = v => `(${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)})`;
status.textContent = `Formula: ${format(hit)} | Raycaster: ${rayCaster ? format(rayCaster.point) : 'No mesh hit'} | ${rayCaster && hit.distanceTo(rayCaster.point) < 1e-8 ? 'MATCH' : 'NO MATCH'}`;
document.body.appendChild(status);

const control = new OrbitControls(camera, renderer.domElement);
function animate() {
requestAnimationFrame(animate)
control.update()
renderer.render(scene, camera)
}
animate()
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
