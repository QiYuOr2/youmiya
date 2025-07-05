import * as cheerio from 'cheerio'
import config from '../config.mjs'

/**
 * @param {import('cheerio').CheerioAPI} $
 * @param {Element} item
 */
function parseItem($, item) {
  const $item = $(item)
  const result = {}

  // 日期
  const dateText = $item.find('.date').text().trim()
  result.date = dateText || ''

  // 图片
  const $img = $item.find('.date img')
  result.image = $img.attr('src') || ''
  result.imageAlt = $img.attr('alt') || ''

  // 活动标题
  const $titleLink = $item.find('.event h4 a')
  result.title = $titleLink.text().trim() || ''
  result.eventUrl = $titleLink.attr('href') || ''
  if (!result.eventUrl.startsWith('https://')) {
    result.eventUrl = config.targetRootPath + result.eventUrl
  }

  // 会场
  const $placeLink = $item.find('.event .place a').eq(0)
  result.place = {
    name: $placeLink.text().trim() || '',
    url: $placeLink.attr('href') || '',
  }

  // 时间
  const timeText = $item.find('.event .place').eq(1).text().trim()
  const match = timeText.match(/開場\s*(\d{1,2}:\d{2})\s*開演\s*(\d{1,2}:\d{2})\s*終演\s*(\d{1,2}:\d{2})/)
  result.time = match
    ? {
        open: match[1],
        start: match[2],
        end: match[3],
      }
    : {}

  // 出演者
  const actors = $item.find('.actor ul li a').map((_, el) => ({
    name: $(el).text().trim(),
    url: $(el).attr('href'),
  })).get()
  result.actors = actors

  // 参加者数
  const participants = $item.find('.note_count p').text().trim()
  result.participants = Number(participants) || 0

  // 输出结果
  return result
}

export function parse(html) {
  const $ = cheerio.load(html)

  return $('.gb_event_list ul li.clearfix')
    .map((_, el) => parseItem($, el))
    .get()
}
