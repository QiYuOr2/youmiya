import { readFileSync, writeFileSync } from 'node:fs'
import { generate } from './handler/calendar.mjs'

const data = JSON.parse(readFileSync('./result/data.json'))

const result = generate(data)

writeFileSync('./result/youmiya.ics', result, 'utf-8')
