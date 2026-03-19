import { create } from 'zustand'

interface ParamsState {
  params: {
    cube:     { a: number }
    box:      { a: number; b: number; h: number }
    sphere:   { R: number; D: number }
    cone:     { R: number; h: number; l: number; alpha: number }
    cylinder: { R: number; h: number }
    pyramid:  { n: number; a: number; h: number; f: number }
    tetra:    { a: number }
  }
  setParam: (shape: string, key: string, value: number) => void
}

export const useParamsStore = create<ParamsState>((set) => ({
  params: {
    cube:     { a: 3 },
    box:      { a: 4, b: 2, h: 3 },
    sphere:   { R: 2, D: 4 },
    cone:     { R: 2, h: 4, l: 4.47, alpha: 63.43 },
    cylinder: { R: 2, h: 4 },
    pyramid:  { n: 4, a: 3, h: 4, f: 4.27 },
    tetra:    { a: 3 },
  },
  setParam: (shape, key, value) =>
    set((state) => ({
      params: {
        ...state.params,
        [shape]: { ...state.params[shape as keyof typeof state.params], [key]: value },
      },
    })),
}))