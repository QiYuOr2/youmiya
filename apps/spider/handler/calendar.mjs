import { createEvents } from 'ics'

/**
 * 将日本时区 (JST) 的日期和时间字符串转换为 UTC 时间数组。
 * @param {number} y - 年
 * @param {number} m - 月 (1-12)
 * @param {number} d - 日
 * @param {string} timeStr - 时间字符串，格式为 "HH:mm"
 * @returns {number[]} - UTC 时间数组 [year, month, day, hour, minute]
 */
function convertJstToUtcArray(y, m, d, timeStr) {
  // 1. 组合成带有时区偏移量的 ISO 8601 字符串 (JST is UTC+9)
  // padStart 用于确保月份、日期、小时和分钟是两位数，例如 "09" 而不是 "9"
  const isoString = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}T${timeStr}:00+09:00`

  // 2. 使用 Date 对象解析该字符串，它会自动处理时区转换
  const dateObj = new Date(isoString)

  // 3. 从 Date 对象中提取 UTC 时间组件
  return [
    dateObj.getUTCFullYear(),
    dateObj.getUTCMonth() + 1, // getUTCMonth 返回 0-11，所以需要 +1
    dateObj.getUTCDate(),
    dateObj.getUTCHours(),
    dateObj.getUTCMinutes(),
  ]
}

function buildEvent(item) {
  const [y, m, d] = item.date.split(' ')[0].split('-').map(Number)
  const ev = {
    title: item.title,
    location: item.place?.name || '',
    description: `演出详情: ${item.eventUrl}`,
    startOutputType: 'local',
    endOutputType: 'local',
    startInputType: 'utc',
    endInputType: 'utc',
  }

  if (item.time?.start && item.time?.end) {
    ev.start = convertJstToUtcArray(y, m, d, item.time.start)
    ev.end = convertJstToUtcArray(y, m, d, item.time.end)
  }
  else {
    ev.start = [y, m, d]
    const dt = new Date(y, m - 1, d + 1)
    ev.end = [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()]
  }
  return ev
}

export function generate(list) {
  const events = list.map(buildEvent)

  // 通过 headerParams 设置 calName 和 productId，避免重复写入
  const { error, value } = createEvents(events, { })
  if (error)
    throw error

  // 插入时区和描述字段，并去除默认头部
  const headerLines = `${[
    'BEGIN:VCALENDAR',
    'PRODID:-//qiyuor2.com//Youmiya Calendar//CN',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:羊宫事件薄',
    'X-WR-TIMEZONE:Asia/Shanghai',
    `X-WR-CALDESC:羊宫妃那活动日历 更新时间${new Date().toLocaleString()}`,

    'BEGIN:VTIMEZONE',
    'TZID:Asia/Shanghai',
    'TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Shanghai',
    'X-LIC-LOCATION:Asia/Shanghai',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0800',
    'TZOFFSETTO:+0800',
    'TZNAME:CST',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',

  ].join('\r\n')}\r\n`

  const footerLines = `${[
  ].join('\r\n')}\r\n`

  // 删除 value 中默认头部，保留从第一个 VEVENT 开始的内容
  const lines = value.split(/\r?\n/)
  const bodyLines = lines.slice(lines.findIndex(l => l.startsWith('BEGIN:VEVENT')))
  const finalIcs = headerLines + bodyLines.join('\r\n') + footerLines

  return finalIcs.trim()
}
