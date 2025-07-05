import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import config from './config.mjs'
import { generate } from './handler/calendar.mjs'
import { parse } from './handler/eventernote.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

;(async () => {
  const response = await fetch(config.targetURL)
  const html = await response.text()

  const oldData = JSON.parse(readFileSync(resolve(__dirname, './result/youmiya.json'), 'utf-8'))
  const result = parse(html)

  const unique = new Set()
  const newData = [...result, ...oldData].filter((item) => {
    if (unique.has(item.eventUrl)) {
      return false
    }
    unique.add(item.eventUrl)
    return true
  })

  const icsResult = generate(newData)

  writeFileSync(resolve(__dirname, './result/youmiya.json'), JSON.stringify(newData), 'utf-8')
  writeFileSync(resolve(__dirname, './result/youmiya.ics'), icsResult, 'utf-8')
})()
