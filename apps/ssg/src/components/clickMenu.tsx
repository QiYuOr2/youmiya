import type { EventVO } from '@/types'
import { useMemo } from 'react'
import { jstToCst } from '@/common/events'

interface ClickMenuProps {
  open: boolean
  targetRect: { x: number, y: number, w: number, h: number }
  event?: EventVO
  onClose?: () => void
}

export function ClickMenu({ open, targetRect, event, ...rest }: ClickMenuProps) {
  const positionStyle = useMemo(() => {
    const style: React.CSSProperties = {}

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    if (window.innerWidth <= 768) {
      style.right = `20px`
      style.top = `80px`
      style.alignItems = 'end'
      style.width = innerWidth - 40
      return style
    }

    // 水平方向判断
    if (targetRect.x < centerX) {
      style.left = `${targetRect.x + targetRect.w}px`
      style.alignItems = 'start'
    }
    else {
      style.right = `${window.innerWidth - targetRect.x}px`
      style.alignItems = 'end'
    }

    // 垂直方向判断
    if (targetRect.y < centerY) {
      style.top = `${targetRect.y}px`
    }
    else {
      style.bottom = `${window.innerHeight - targetRect.y}px`
    }

    return style
  }, [targetRect])

  const floatBox = 'px-3 py-2 bg-white op-95 rounded-lg shadow'

  return (
    open && event && (
      <>
        <div className="fixed-full bg-black op-50 z-100" onClick={rest.onClose}></div>
        <div className="fixed z-101 op-85 flex flex-col gap-2" style={positionStyle} onClick={rest.onClose}>
          <div className={floatBox}>{ event.title }</div>
          <div className={`${floatBox} flex items-center`}>
            <div className="i-mdi:access-time mr-1"></div>
            <div>{event.date}</div>
            <div className="ml-2">
              {jstToCst(`${event.date.split(' ')[0]} ${event.time.start}`).format('h:mm A')}
            </div>
          </div>
          <div className={`${floatBox} flex items-center`}>
            <div className="i-mdi:location mr-1"></div>
            <div>{ event.place.name }</div>
          </div>
          <div className={floatBox}>
            <div className="flex flex-wrap gap-1 max-w-[65ch]">
              {event.actors.map((actor, i, originArr) => (
                <div key={i}>
                  <span>{actor.name}</span>
                  {i < originArr.length - 1 && <span>・</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  )
}
