import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

function dayInWeek(date: number) {
  return dayjs().date(date).format('dd')
}

function dateCard(date?: number) {
  const card = 'px-2.5 py-1.5 h-18 rounded-md'

  if (typeof date === 'undefined') {
    return <div className={`${card} bg-true-gray-50`}></div>
  }

  return (
    <div className={`${card} bg-true-gray-100`}>
      <div className="flex items justify-between">
        <div className="font-bold">{date}</div>
        <div className="op-40">{dayInWeek(date)}</div>
      </div>
    </div>
  )
}

export function Calendar() {
  const today = dayjs()
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
    <div className="rounded-md border shadow-sm  p-4">
      <div className="text-xl mb-3 font-bold">{ yearMonth }</div>
      <div className="grid grid-cols-7 gap-3">
        {
          [...leading, ...days, ...trailing].map((value: number | undefined) => (
            dateCard(value)
          ))
        }
      </div>
    </div>

  )
}
