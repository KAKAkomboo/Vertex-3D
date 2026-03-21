import * as THREE from 'three'

export function cubeGeo(a: number) {
  return new THREE.BoxGeometry(a, a, a)
}

export function boxGeo(a: number, b: number, h: number) {
  return new THREE.BoxGeometry(a, h, b)
}

export function sphereGeo(R: number) {
  return new THREE.SphereGeometry(R, 56, 36)
}

export function coneGeo(R: number, h: number) {
  return new THREE.ConeGeometry(R, h, 64)
}

export function cylinderGeo(R: number, h: number) {
  return new THREE.CylinderGeometry(R, R, h, 64)
}

export function pyramidGeo(n: number, a: number, h: number) {
  const sides = Math.round(n)
  const r = a / (2 * Math.sin(Math.PI / sides))
  const verts: number[] = []
  const apex = [0, h / 2, 0]

  for (let i = 0; i < sides; i++) {
    const a1 = (2 * Math.PI * i) / sides - Math.PI / 2
    const a2 = (2 * Math.PI * (i + 1)) / sides - Math.PI / 2
    const p1 = [r * Math.cos(a1), -h / 2, r * Math.sin(a1)]
    const p2 = [r * Math.cos(a2), -h / 2, r * Math.sin(a2)]
    verts.push(...apex, ...p1, ...p2)
  }

  const base0 = [r * Math.cos(-Math.PI / 2), -h / 2, r * Math.sin(-Math.PI / 2)]
  for (let i = 1; i < sides - 1; i++) {
    const a1 = (2 * Math.PI * i) / sides - Math.PI / 2
    const a2 = (2 * Math.PI * (i + 1)) / sides - Math.PI / 2
    verts.push(...base0, r * Math.cos(a1), -h / 2, r * Math.sin(a1), r * Math.cos(a2), -h / 2, r * Math.sin(a2))
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3))
  geo.computeVertexNormals()
  return geo
}

export function tetraGeo(a: number) {
  const h = a * Math.sqrt(2 / 3)
  const r = a / Math.sqrt(3)
  const v0 = [0, (h * 2) / 3, 0]
  const v1 = [r, -h / 3, 0]
  const v2 = [-r / 2, -h / 3, (r * Math.sqrt(3)) / 2]
  const v3 = [-r / 2, -h / 3, -(r * Math.sqrt(3)) / 2]

  const verts = new Float32Array([
    ...v0, ...v1, ...v2,
    ...v0, ...v2, ...v3,
    ...v0, ...v3, ...v1,
    ...v1, ...v3, ...v2,
  ])

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
  geo.computeVertexNormals()
  return geo
}