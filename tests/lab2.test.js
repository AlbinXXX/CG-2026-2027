import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { vectorResults, intersectPlane } from '../Week 2/math.js';
const v = (x,y,z) => new THREE.Vector3(x,y,z);
test('required vector example and zero-vector boundary', () => {
 const r = vectorResults(v(3,4,0),v(1,0,0));
 assert.ok(Math.abs(r.angle - 53.13010235415598) < 1e-10);
 assert.equal(r.dot, 3);
 assert.deepEqual(r.cross.toArray(), [0,0,-4]);
 assert.equal(vectorResults(v(0,0,0),v(1,0,0)).angle, null);
 assert.equal(vectorResults(v(1,0,0),v(-1,0,0)).angle, 180);
});
test('formula agrees with actual mesh raycaster', () => {
 const o=v(2,5,-1), dir=v(-1,-1,1).normalize(), n=v(0,1,0);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(12,12),new THREE.MeshBasicMaterial());
 floor.rotation.x=-Math.PI/2; floor.updateMatrixWorld(true);
 const hit=intersectPlane(o,dir,n,0);
 assert.ok(hit.distanceTo(v(-3,0,4)) < 1e-10);
 assert.ok(hit.distanceTo(new THREE.Raycaster(o,dir).intersectObject(floor)[0].point) < 1e-10);
 assert.equal(intersectPlane(o,v(1,0,0),n,0),null);
 assert.equal(intersectPlane(o,v(0,1,0),n,0),null);
});
