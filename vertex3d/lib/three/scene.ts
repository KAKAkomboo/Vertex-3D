import * as THREE from 'three'

export function createScene() {
  const scene = new THREE.Scene()
  return scene
}

export function createCamera(width: number, height: number) {
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.05, 500)
  camera.position.set(4, 3, 6)
  camera.lookAt(0, 0, 0)
  return camera
}

export function createRenderer(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.localClippingEnabled = true
  return renderer
}

export function createLights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.5))

  const sun = new THREE.DirectionalLight(0xffffff, 0.9)
  sun.position.set(6, 10, 8)
  sun.castShadow = true
  scene.add(sun)

  const fill = new THREE.PointLight(0x4361ee, 0.4, 50)
  fill.position.set(-6, 4, -4)
  scene.add(fill)
}

export function createGrid(scene: THREE.Scene) {
  const grid = new THREE.GridHelper(20, 20, 0xdde3f5, 0xeef2ff)
  scene.add(grid)
  return grid
}