import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function addBackground(scene, renderer) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, '#243761');
    gradient.addColorStop(0.5, '#8c7ca9');
    gradient.addColorStop(1, '#9fe0d4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
    // Soft light bands make the glass's refracted distortion easier to see.
    ctx.fillStyle = '#ffffff25';
    for (const x of [160, 480, 800]) ctx.fillRect(x, 0, 36, 1024);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.background = texture;

    // Studio lighting gives glass bright reflections at grazing angles.
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
}
