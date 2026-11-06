import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  className,
}: {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  function onMove(e: MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const relX = e.clientX - r.left - r.width / 2
    const relY = e.clientY - r.top - r.height / 2
    const inZone = Math.abs(relX) < r.width / 2 + padding && Math.abs(relY) < r.height / 2 + padding
    if (inZone) {
      setTransform(`translate3d(${relX / strength}px, ${relY / strength}px, 0)`)
    } else {
      setTransform('translate3d(0,0,0)')
    }
  }

  function onLeave() {
    setTransform('translate3d(0,0,0)')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transform,
        transition: transform ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  )
}
