'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useViewerStore } from '@/store/viewerStore'
import { useParamsStore } from '@/store/parasmStore'
import {
  createScene, createCamera, createRenderer, createLights, createGrid
} from '@/lib/three/scene'
import {
  cubeGeo, boxGeo, sphereGeo, coneGeo, cylinderGeo, pyramidGeo, tetraGeo
} from '@/lib/three/geometries'

export default function Viewer3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { shape, color, transparent, wireframe, sliceOn, sliceY, autoRotate } = useViewerStore()
  const { params } = useParamsStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene    = createScene()
    const renderer = createRenderer(canvas)
    const camera   = createCamera(canvas.clientWidth, canvas.clientHeight)
    createLights(scene)
    createGrid(scene)

    const meshGroup = new THREE.Group()
    scene.add(meshGroup)

    // Побудова геометрії
    function buildGeo() {
      switch (shape) {
        case 'cube':     return cubeGeo(params.cube.a)
        case 'box':      return boxGeo(params.box.a, params.box.b, params.box.h)
        case 'sphere':   return sphereGeo(params.sphere.R)
        case 'cone':     return coneGeo(params.cone.R, params.cone.h)
        case 'cylinder': return cylinderGeo(params.cylinder.R, params.cylinder.h)
        case 'pyramid':  return pyramidGeo(params.pyramid.n, params.pyramid.a, params.pyramid.h)
        case 'tetra':    return tetraGeo(params.tetra.a)
      }
    }

    // Mesh
    const geo = buildGeo()
    const mat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: transparent ? 0.4 : 0.95,
      side: THREE.DoubleSide,
      clippingPlanes: sliceOn ? [new THREE.Plane(new THREE.Vector3(0, 1, 0), -sliceY)] : [],
    })
    const mesh = new THREE.Mesh(geo, mat)
    meshGroup.add(mesh)

    // Wireframe
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: wireframe ? 0.6 : 0.12,
    })
    const wireMesh = new THREE.Mesh(buildGeo(), wireMat)
    meshGroup.add(wireMesh)

    // Orbit (ручне керування)
    let rotX = 0.35, rotY = 0.6, zoom = 8
    let isDragging = false, prevX = 0, prevY = 0
    let autoAngle = rotY

    const onMouseDown = (e: MouseEvent) => { isDragging = true; prevX = e.clientX; prevY = e.clientY }
    const onMouseUp   = () => isDragging = false
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      rotY += (e.clientX - prevX) * 0.008
      rotX += (e.clientY - prevY) * 0.008
      rotX = Math.max(-1.4, Math.min(1.4, rotX))
      prevX = e.clientX; prevY = e.clientY
    }
    const onWheel = (e: WheelEvent) => {
      zoom += e.deltaY * 0.012
      zoom = Math.max(2, Math.min(20, zoom))
    }

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('wheel', onWheel, { passive: true })

    // Resize
    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth, h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(canvas)

    // Animate
    let animId: number
    function animate() {
      animId = requestAnimationFrame(animate)
      if (autoRotate) { autoAngle += 0.011; rotY = autoAngle }
      const cx = Math.sin(rotY) * Math.cos(rotX) * zoom
      const cy = Math.sin(rotX) * zoom
      const cz = Math.cos(rotY) * Math.cos(rotX) * zoom
      camera.position.set(cx, cy, cz)
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('wheel', onWheel)
      ro.disconnect()
      renderer.dispose()
    }
  }, [shape, color, transparent, wireframe, sliceOn, sliceY, autoRotate, params])

  return (
    <div className="flex-1 relative cursor-grab active:cursor-grabbing bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200 pointer-events-none">
        🖱 Тягни — оберти · Колесо — масштаб
      </div>
    </div>
  )
}