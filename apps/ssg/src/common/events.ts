import type { EventVO } from '@/types'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export function isSameMonth(dateStr: string, offset: number) {
  const now = dayjs()

  const parsed = dayjs(dateStr.split(' ')[0]) // 去除星期部分
  const target = now.add(offset, 'month')
  return parsed.year() === target.year() && parsed.month() === target.month()
}

export function monthString(offset: number) {
  return dayjs().add(offset, 'month').format('YYYY/MM')
}

export function groupEventsByMonth(events: EventVO[]): Record<string, EventVO[]> {
  const result: Record<string, EventVO[]> = {}

  for (const event of events) {
    const key = dayjs(event.date.split(' ')[0]).format('YYYY/MM')

    if (!result[key]) {
      result[key] = []
    }

    result[key].push(event)
  }

  return result
}

export function getEventByDate(events: EventVO[], date: number) {
  return events.slice().filter(event => dayjs(event.date.split(' ')[0]).date() === date)
}

export function jstToCst(date: string) {
  return dayjs.tz(date, 'Asia/Tokyo').tz('Asia/Shanghai')
}
