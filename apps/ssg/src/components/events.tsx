import type { EventVO } from '@/types'
import dayjs from 'dayjs'

interface EventsProps {
  title: string
  values: EventVO[]
  className?: string
}

// TODO 想办法抽出来
const activeColors = {
  'MyGO': { text: 'text-[#3388bb]', bg: 'bg-[#3388bb]' },
  'BanG Dream': { text: 'text-[#C01427]', bg: 'bg-[#C01427]' },
  'ブシロード': { text: 'text-[#C01427]', bg: 'bg-[#C01427]' },
  'BUSHIROAD': { text: 'text-[#C01427]', bg: 'bg-[#C01427]' },
  'SELECTION PROJECT': { text: 'text-[#705073]', bg: 'bg-[#705073]' },
  '小市民': { text: 'text-[#ffbc16]', bg: 'bg-[#ffbc16]' },
  '僕の心': { text: 'text-[#4C4D6A]', bg: 'bg-[#4C4D6A]' },
  'ウマ娘': { text: 'text-[#FF8899]', bg: 'bg-[#FF8899]' },
  'default': { text: 'text-[#68c068]', bg: 'bg-[#77DD77]' },
}

function EventCard(event: EventVO) {
  const date = dayjs(event.date).format('DD')
  const day = dayjs(event.date).format('dddd')

  let colors = activeColors.default
  const key = Object.keys(activeColors).find(keyword =>
    event!.title.includes(keyword),
  ) as keyof typeof activeColors

  if (key) {
    colors = activeColors[key]
  }

  const before = `absolute left-0 top-0 bottom-0 w-2 ${colors.bg}`

  return (
    <li className="flex items-center mt-2 py-2 pr-4 relative bg-cool-gray-50 rounded-xl overflow-hidden">
      <div className={before}></div>
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
