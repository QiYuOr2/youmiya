import { copyFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createFileSync } from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const json = {
  source: resolve(__dirname, '../apps/spider/result/youmiya.json'),
  target: resolve(__dirname, '../apps/ssg/src/data/events.json'),
}

const ics = {
  source: resolve(__dirname, '../apps/spider/result/youmiya.ics'),
  target: resolve(__dirname, '../apps/ssg/public/events.ics'),
}

function checkAndCreateFile(filePath) {
  if (!existsSync(filePath)) {
    createFileSync(filePath)
  }
}

;(async function main() {
  checkAndCreateFile(json.target)
  checkAndCreateFile(ics.target)

  copyFileSync(json.source, json.target)
  console.log(`Copy ${json.source} -> ${json.target}\n`)
  copyFileSync(ics.source, ics.target)
  console.log(`Copy ${ics.source} -> ${ics.target}\n`)
})()
