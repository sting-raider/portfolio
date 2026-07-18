import { describe, expect, it } from 'vitest'
import { projects, tickerItems, STATUS_LABEL } from './projects'
import { profile, skillGroups } from './profile'

const URL_RE = /^https:\/\/[\w.-]+(\/[\w./-]*)?$/

describe('projects data integrity', () => {
  it('has unique ids and indices', () => {
    const ids = projects.map((p) => p.id)
    const indices = projects.map((p) => p.index)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(indices).size).toBe(indices.length)
  })

  it('every project has a valid repo URL, status, points, metrics, and stack', () => {
    for (const p of projects) {
      expect(p.repo).toMatch(URL_RE)
      expect(STATUS_LABEL[p.status]).toBeTruthy()
      expect(p.points.length).toBeGreaterThan(0)
      expect(p.metrics.length).toBeGreaterThan(0)
      expect(p.stack.length).toBeGreaterThan(0)
      expect(p.tagline.length).toBeGreaterThan(10)
    }
  })

  it('exactly one project is featured', () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(1)
  })

  it('flow accent indices point at real nodes', () => {
    for (const p of projects) {
      if (!p.flow) continue
      for (const i of p.flow.accented ?? []) {
        expect(i).toBeLessThan(p.flow.nodes.length)
      }
    }
  })

  it('ticker only carries non-empty items', () => {
    expect(tickerItems.length).toBeGreaterThan(3)
    for (const item of tickerItems) {
      expect(item.trim().length).toBeGreaterThan(10)
    }
  })
})

describe('profile data integrity', () => {
  it('has working contact links', () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    expect(profile.github).toMatch(URL_RE)
    expect(profile.linkedin).toMatch(URL_RE)
    expect(profile.resumeRepo).toMatch(URL_RE)
  })

  it('declares skill groups with items', () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(3)
    for (const group of skillGroups) {
      expect(group.items.length).toBeGreaterThan(0)
    }
  })
})
