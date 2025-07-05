interface MonthProps {
  title: string
  count: number
  active?: boolean
  className?: string
  onClick?: () => void
}

export function Month({ active, title, count, className, onClick }: MonthProps) {
  const hover = active ? 'hover:(transform scale-120 bg-op-100)' : ''
  const cursor = active ? 'cursor-pointer' : ''
  const status = active ? ' bg-op-85' : 'op-40 text-true-gray-800 shadow-inner'

  return (
    <div
      className={`rounded-lg p-2 px-3 flex items-center justify-between shadow bg-white ${cursor} ${status} ${className} ${hover} transition-all duration-150`}
      title={`活动数量：${count}`}
      onClick={onClick}
    >
      <div>{ title }</div>
      <div className="font-bold text-white bg-red w-5 h-5 text-xs leading-5 rounded-full text-center">{ count }</div>
    </div>
  )
}
