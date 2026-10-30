import * as THREE from 'three';
export function vectorResults(a, b) {
    const dot = a.dot(b);
    const cross = new THREE.Vector3().crossVectors(a, b);
    const product = a.length() * b.length();
    return { dot, cross, crossLength: cross.length(), angle: product === 0 ? null : THREE.MathUtils.radToDeg(Math.acos(THREE.MathUtils.clamp(dot / product, -1, 1))) };
}
// Infinite plane n·p = d; only forward ray intersections are accepted.
export function intersectPlane(origin, direction, normal, d) {
    const denominator = normal.dot(direction);
    if (Math.abs(denominator) < 1e-10) return null;
    const t = (d - normal.dot(origin)) / denominator;
    return t < 0 ? null : origin.clone().addScaledVector(direction, t);
}
