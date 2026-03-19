export type ShapeType =
  | 'cube'
  | 'box'
  | 'sphere'
  | 'cone'
  | 'cylinder'
  | 'pyramid'
  | 'tetra'

export interface CubeParams     { a: number }
export interface BoxParams      { a: number; b: number; h: number }
export interface SphereParams   { R: number; D: number }
export interface ConeParams     { R: number; h: number; l: number; alpha: number }
export interface CylinderParams { R: number; h: number }
export interface PyramidParams  { n: number; a: number; h: number; f: number }
export interface TetraParams    { a: number }

export type ShapeParams =
  | CubeParams
  | BoxParams
  | SphereParams
  | ConeParams
  | CylinderParams
  | PyramidParams
  | TetraParams

export type UnitType = 'од' | 'см' | 'м' | 'мм'