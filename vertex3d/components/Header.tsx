'use client'

import { useViewerStore } from '@/store/viewerStore'
import { ShapeType, UnitType } from '@/types/shapes'

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: 'cube',     label: 'Куб' },
  { id: 'box',      label: 'Паралелепіпед' },
  { id: 'sphere',   label: 'Куля' },
  { id: 'cone',     label: 'Конус' },
  { id: 'cylinder', label: 'Циліндр' },
  { id: 'pyramid',  label: 'Піраміда' },
  { id: 'tetra',    label: 'Тетраедр' },
]

const UNITS: UnitType[] = ['од', 'см', 'м', 'мм']

export default function Header() {
  const { shape, setShape, unit, setUnit } = useViewerStore()

  return (
    <header className="flex items-center gap-3 px-4 h-14 bg-white border-b border-gray-200 shadow-sm z-20 flex-shrink-0">
      <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
        Vertex3D
      </div>

      <div className="flex gap-2 flex-1 overflow-x-auto">
        {SHAPES.map((s) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all
              ${shape === s.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-500 border-gray-200 hover:border-blue-400'
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 flex-shrink-0">
        Одиниці:
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as UnitType)}
          className="px-2 py-1 rounded-lg border-2 border-gray-200 text-sm font-bold text-gray-700 outline-none"
        >
          {UNITS.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
    </header>
  )
}