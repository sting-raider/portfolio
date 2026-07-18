import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(e.message))

await page.goto('http://localhost:5199', { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)
await page.evaluate(() => document.querySelector('#systems').scrollIntoView())
await page.waitForTimeout(1500)
await page.screenshot({ path: 'shots/recheck-systems.png' })
await page.evaluate(() => window.scrollBy(0, 700))
await page.waitForTimeout(1200)
await page.screenshot({ path: 'shots/recheck-modules.png' })
await page.evaluate(() => document.querySelector('#manifest').scrollIntoView())
await page.waitForTimeout(1500)
await page.screenshot({ path: 'shots/recheck-manifest.png' })
await page.evaluate(() => document.querySelector('#operator').scrollIntoView())
await page.waitForTimeout(1600)
await page.screenshot({ path: 'shots/recheck-operator.png' })
console.log(errors.length ? `ERRORS: ${errors.join(' | ')}` : 'NO CONSOLE ERRORS')
await browser.close()
