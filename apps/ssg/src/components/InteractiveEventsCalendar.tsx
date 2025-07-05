import type { EventVO } from '@/types'
import { useEffect, useState } from 'react'
import { monthString } from '@/common/events'
import { Calendar } from './calendar'
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

  return (
    <>
      <Calendar month={currentMonth} events={eventsGrouped[currentMonth]} className="op-85" />

      <div className="text-right">
        <div className="mt-2 py-2 px-4 rounded bg-white op-85 shadow inline-flex gap-4">
          <button onClick={subscribeCalendar}>订阅日历</button>
          <span>・</span>
          <button onClick={toIssues}>贡献日历</button>
        </div>
      </div>

      <div className="mt-8 pb-12">
        <h2 className="text-xl font-bold text-white">其他月份</h2>

        <div className="grid grid-cols-5 gap-2 mt-4">
          {Object.keys(eventsGrouped).map(month => (
            <Month
              title={month}
              count={eventsGrouped[month].length}
              active={currentMonth !== month}
              onClick={() => setCurrentMonth(month)}
            />
          ),
          )}
        </div>
      </div>

    </>
  )
}
