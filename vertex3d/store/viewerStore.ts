import { create } from 'zustand'
import { ShapeType, UnitType } from '@/types/shapes'

interface ViewerState {
  shape: ShapeType
  color: string
  unit: UnitType
  transparent: boolean
  wireframe: boolean
  showLabels: boolean
  sliceOn: boolean
  sliceY: number
  autoRotate: boolean

  setShape: (s: ShapeType) => void
  setColor: (c: string) => void
  setUnit: (u: UnitType) => void
  setTransparent: (v: boolean) => void
  setWireframe: (v: boolean) => void
  setShowLabels: (v: boolean) => void
  setSliceOn: (v: boolean) => void
  setSliceY: (v: number) => void
  setAutoRotate: (v: boolean) => void
}

export const useViewerStore = create<ViewerState>((set) => ({
  shape: 'cube',
  color: '#4361ee',
  unit: 'од',
  transparent: true,
  wireframe: false,
  showLabels: true,
  sliceOn: false,
  sliceY: 0,
  autoRotate: false,

  setShape:      (shape)       => set({ shape }),
  setColor:      (color)       => set({ color }),
  setUnit:       (unit)        => set({ unit }),
  setTransparent:(transparent) => set({ transparent }),
  setWireframe:  (wireframe)   => set({ wireframe }),
  setShowLabels: (showLabels)  => set({ showLabels }),
  setSliceOn:    (sliceOn)     => set({ sliceOn }),
  setSliceY:     (sliceY)      => set({ sliceY }),
  setAutoRotate: (autoRotate)  => set({ autoRotate }),
}))