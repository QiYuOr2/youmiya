import type { MouseEvent } from 'react'
import type { EventVO } from '@/types'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useMemo } from 'react'
import { getEventByDate, jstToCst } from '@/common/events'
import { useDateClick } from '@/hooks/useDateClick'
import 'dayjs/locale/ja'

dayjs.locale('ja')
dayjs.extend(utc)
dayjs.extend(timezone)

function dayInWeek(date: string) {
  return dayjs(date).format('dd')
}

// TODO 想办法抽出来
const activeColors = {
  'MyGO': { text: 'text-[#3388bb]', bg: 'bg-[#3388bb] bg-op-20' },
  'BanG Dream': { text: 'text-[#C01427]', bg: 'bg-[#C01427] bg-op-20' },
  'SELECTION PROJECT': { text: 'text-[#705073]', bg: 'bg-[#705073] bg-op-20' },
  'default': { text: 'text-[#68c068]', bg: 'bg-[#77DD77] bg-op-20' },
}

interface DateCardProps {
  month: string
  date?: number
  events?: EventVO[]
}
function DateCard({ month, date, events }: DateCardProps) {
  const card = 'px-2.5 py-1.5 h-18 rounded-md'

  if (typeof date === 'undefined') {
    return <div className={`${card} bg-true-gray-50 hidden sm:block`}></div>
  }

  const event = useMemo(() => events?.[0], [events])

  let colors = activeColors.default
  if (events?.length) {
    const key = Object.keys(activeColors).find(keyword =>
      event!.title.includes(keyword),
    ) as keyof typeof activeColors

    if (key) {
      colors = activeColors[key]
    }
  }

  const classesWithEvent = event
    ? `${colors.text} ${colors.bg} cursor-pointer`
    : 'bg-true-gray-100'

  const onDateClick = useDateClick()

  const restAttrs = {
    ...(events?.length
      ? { title: events[0].title, onClick: (elementEvent: MouseEvent<HTMLDivElement>) => onDateClick?.(elementEvent, events) }
      : {}
    ),
  }

  return (
    <div
      className={`${card} flex flex-col  overflow-hidden ${classesWithEvent}`}
      {...restAttrs}
    >
      <div className="flex items justify-between">
        <div className="">{date}</div>
        <div className="op-40">{dayInWeek(`${month}/${date}`)}</div>
      </div>
      {events?.length
        ? (
            <div className="mt-auto pb-.5">
              {event!.time?.start && event!.time?.end
                && (
                  <div className="text-xs">{jstToCst(`${event!.date.split(' ')[0]} ${event?.time.start || ''}`).format('h:mm A')}</div>
                )}
              <div className="text-xs font-bold line-clamp-1">{ event!.title }</div>
            </div>
          )
        : ''}
    </div>
  )
}

interface CalendarProps {
  events: EventVO[]
  month: string
  className?: string
  id?: string
}

export function Calendar({ id, month, events, className }: CalendarProps) {
  const today = dayjs(month)
  const totalDays = today.daysInMonth()
  const yearMonth = today.format('YYYY 年 MM 月')

  const startOfMonth = today.startOf('month')
  const startOfWeek = startOfMonth.day()

  // 填充日历开头空白，保证周日是第一天
  const leading: undefined[] = Array.from({ length: startOfWeek })
  const days = Array.from({ length: totalDays }, (_, i) => i + 1)
  const leadingAndDaysLength = leading.length + days.length
  // 填充日历结尾空白
  const trailing: undefined[] = Array.from({
    length: 7 - (leadingAndDaysLength % 7 || 7),
  })

  return (
    <div id={id} className={`rounded-md shadow bg-white p-4 ${className}`}>
      <div className="text-xl mb-3 font-bold">{ yearMonth }</div>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
        {
          [...leading, ...days, ...trailing]
            .map((value: number | undefined, i) => (
              <DateCard
                key={i + (id || '')}
                month={month}
                date={value}
                events={value ? getEventByDate(events, value) : undefined}
              />
            ),
            )
        }
      </div>
    </div>

  )
}
