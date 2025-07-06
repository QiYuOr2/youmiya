import type { MouseEvent } from 'react'
import type { EventVO } from '@/types'
import { useEffect, useState } from 'react'
import { monthString } from '@/common/events'
import { DateClickContext } from '@/hooks/useDateClick'
import { Calendar } from './calendar'
import { ClickMenu } from './clickMenu'
import { Month } from './month'

interface InteractiveEventsCalendarProps {
  staticId: string
  eventsGrouped: Record<string, EventVO[]>
}

type Props = InteractiveEventsCalendarProps

export function InteractiveEventsCalendar({ staticId, eventsGrouped }: Props) {
  useEffect(() => {
    const el = document.getElementById(staticId)
    if (el)
      el.style.display = 'none'
  }, [])

  const [currentMonth, setCurrentMonth] = useState(monthString(0))

  const subscribeCalendar = () => {
    open('/events.ics', '__blank')
  }

  const toIssues = () => {
    open('https://github.com/QiYuOr2/youmiya/issues', '__blank')
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [eventMenu, setEventMenu] = useState<EventVO | undefined>(undefined)
  const [menuTargetRect, setMenuTargetRect] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const onDateClick = (elementEvent: MouseEvent<HTMLDivElement>, event: EventVO) => {
    const target = elementEvent.currentTarget.getBoundingClientRect()
    setMenuTargetRect({
      x: target.x,
      y: target.y,
      w: target.width,
      h: target.height,
    })
    setEventMenu(event)
    setIsMenuOpen(true)
  }

  return (
    <>
      <DateClickContext.Provider value={onDateClick}>
        <Calendar month={currentMonth} events={eventsGrouped[currentMonth]} className="op-85" />
      </DateClickContext.Provider>

      <div className="text-right">
        <div className="mt-2 py-2 px-4 rounded bg-white op-85 shadow inline-flex gap-4">
          <button onClick={subscribeCalendar}>订阅日历</button>
          <span>・</span>
          <button onClick={toIssues}>贡献日历</button>
        </div>
      </div>

      <div className="mt-8 pb-12">
        <h2 className="text-xl font-bold text-white">其他月份</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
          {Object.keys(eventsGrouped).map((month, i) => (
            <Month
              key={i}
              title={month}
              count={eventsGrouped[month].length}
              active={currentMonth !== month}
              onClick={() => setCurrentMonth(month)}
            />
          ),
          )}
        </div>
      </div>

      <ClickMenu
        open={isMenuOpen}
        targetRect={menuTargetRect}
        event={eventMenu}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}
