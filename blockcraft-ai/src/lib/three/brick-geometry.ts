import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const STUD_RADIUS = 0.24;
const STUD_HEIGHT = 0.18;
const UNIT_SIZE = 0.8;
const BRICK_HEIGHT = 0.96;
const PLATE_HEIGHT = 0.32;

export function createLegoBrickGeometry(
  width: number,
  depth: number,
  height: "brick" | "plate" = "brick"
): THREE.BufferGeometry {
  const h = height === "brick" ? BRICK_HEIGHT : PLATE_HEIGHT;
  const totalWidth = width * UNIT_SIZE;
  const totalDepth = depth * UNIT_SIZE;

  const bodyGeometry = new THREE.BoxGeometry(totalWidth, h, totalDepth);
  const geometries: THREE.BufferGeometry[] = [];

  const bodyBufferGeometry = bodyGeometry.clone();
  const bodyMatrix = new THREE.Matrix4().makeTranslation(0, 0, 0);
  bodyBufferGeometry.applyMatrix4(bodyMatrix);
  geometries.push(bodyBufferGeometry);

  const studGeometry = new THREE.CylinderGeometry(STUD_RADIUS, STUD_RADIUS, STUD_HEIGHT, 16);
  
  for (let col = 0; col < width; col++) {
    for (let row = 0; row < depth; row++) {
      const x = (col - (width - 1) / 2) * UNIT_SIZE;
      const z = (row - (depth - 1) / 2) * UNIT_SIZE;
      const y = h / 2 + STUD_HEIGHT / 2;
      
      const studBufferGeometry = studGeometry.clone();
      const studMatrix = new THREE.Matrix4().makeTranslation(x, y, z);
      studBufferGeometry.applyMatrix4(studMatrix);
      geometries.push(studBufferGeometry);
    }
  }

  const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
  if (!mergedGeometry) {
    throw new Error('Failed to merge geometries');
  }

  return mergedGeometry;
}