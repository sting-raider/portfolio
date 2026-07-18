/* Visual inspection: screenshots at 3 viewports, themes, console overlay,
   easter eggs, and console-error collection. Run: node scripts/inspect.mjs */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:5199'
const OUT = 'shots'
mkdirSync(OUT, { recursive: true })

const errors = []

async function newPage(browser, width, height, extra = {}) {
  const page = await browser.newPage({ viewport: { width, height }, ...extra })
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${width}x${height}] ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`[${width}x${height}] PAGEERROR: ${err.message}`))
  return page
}

const browser = await chromium.launch()

// step-scroll the whole page so IntersectionObserver reveals fire,
// then return to top — fullPage captures then show real content
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 150))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(900)
}

// --- desktop ---
let page = await newPage(browser, 1440, 900)
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({ path: `${OUT}/desktop-hero.png` })
await scrollThrough(page)
await page.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true })

// scroll through sections so reveal animations fire, then re-shoot key areas
await page.evaluate(() => document.querySelector('#systems').scrollIntoView())
await page.waitForTimeout(900)
await page.screenshot({ path: `${OUT}/desktop-systems.png` })
await page.evaluate(() => document.querySelector('#roleatlas').scrollIntoView())
await page.waitForTimeout(700)
await page.screenshot({ path: `${OUT}/desktop-roleatlas.png` })
await page.evaluate(() => document.querySelector('#operator').scrollIntoView())
await page.waitForTimeout(700)
await page.screenshot({ path: `${OUT}/desktop-operator.png` })
await page.evaluate(() => document.querySelector('#comms').scrollIntoView())
await page.waitForTimeout(700)
await page.screenshot({ path: `${OUT}/desktop-comms.png` })

// console overlay
await page.keyboard.press('`')
await page.waitForTimeout(500)
await page.keyboard.type('help')
await page.keyboard.press('Enter')
await page.keyboard.type('systems')
await page.keyboard.press('Enter')
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/desktop-console.png` })
await page.keyboard.press('Escape')
await page.waitForTimeout(300)

// themes via console commands
for (const theme of ['cyberpunk', 'phosphor', 'paper']) {
  await page.keyboard.press('`')
  await page.waitForTimeout(300)
  await page.keyboard.type(`theme ${theme}`)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(300)
  await page.keyboard.press('Escape')
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${OUT}/theme-${theme}.png` })
}
// back to default
await page.keyboard.press('`')
await page.waitForTimeout(300)
await page.keyboard.type('theme night-ops')
await page.keyboard.press('Enter')
await page.keyboard.press('Escape')
await page.waitForTimeout(300)

// crab easter egg via console
await page.keyboard.press('`')
await page.waitForTimeout(300)
await page.keyboard.type('crab')
await page.keyboard.press('Enter')
await page.keyboard.press('Escape')
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/egg-crab.png` })

// konami code
for (const key of [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]) {
  await page.keyboard.press(key)
  await page.waitForTimeout(80)
}
await page.waitForTimeout(1200)
await page.screenshot({ path: `${OUT}/egg-konami.png` })
await page.close()

// --- tablet ---
page = await newPage(browser, 768, 1024)
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)
await page.screenshot({ path: `${OUT}/tablet-hero.png` })
await scrollThrough(page)
await page.screenshot({ path: `${OUT}/tablet-full.png`, fullPage: true })
await page.close()

// --- mobile ---
page = await newPage(browser, 390, 844)
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)
await page.screenshot({ path: `${OUT}/mobile-hero.png` })
await scrollThrough(page)
await page.screenshot({ path: `${OUT}/mobile-full.png`, fullPage: true })
// mobile menu
await page.click('.nav-menu-btn')
await page.waitForTimeout(300)
await page.screenshot({ path: `${OUT}/mobile-menu.png` })
await page.close()

// --- reduced motion ---
page = await newPage(browser, 1440, 900, { reducedMotion: 'reduce' })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.screenshot({ path: `${OUT}/reduced-motion.png` })
await page.close()

await browser.close()

console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join('\n')}` : 'NO CONSOLE ERRORS')
