import type { EventVO } from '@/types'
import dayjs from 'dayjs'

interface EventsProps {
  title: string
  values: EventVO[]
  className?: string
}

function EventCard(event: EventVO) {
  const date = dayjs(event.date).format('DD')
  const day = dayjs(event.date).format('dddd')

  return (
    <li className="flex items-center mt-2 py-2 pr-4 relative bg-cool-gray-50 rounded-xl overflow-hidden before:(content-['_'] block bg-[#3388bb] absolute left-0 top-0 bottom-0 w-2)">
      <div className="flex flex-col items-center pl-5 rounded-md">
        <div className="text-3xl font-bold">{date}</div>
        <div className="text-xs text-true-gray-800">{day}</div>
      </div>
      <div className="flex flex-col justify-between ml-4">
        <div className="line-clamp-2">{event.title}</div>
        <div className="flex items-center mt-2">
          <div className="i-mdi:location mr-1"></div>
          <div className="text-xs line-clamp-1">{event.place.name}</div>
        </div>
      </div>
    </li>
  )
}

export function Events({ title, values, className }: EventsProps) {
  return (
    <div className={`p-4 pt-3 border shadow rounded-lg bg-white ${className}`}>
      <div className="text-lg font-bold">{title}</div>
      <ul className="">
        {values.map(event => EventCard(event))}
      </ul>
    </div>
  )
}
