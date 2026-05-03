import { describe, it, expect } from 'vitest'
import { projects, getProjectBySlug } from './projects'

describe('projects data', () => {
  it('has 6 projects', () => {
    expect(projects).toHaveLength(6)
  })

  it('every project has required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.category).toMatch(/^(web|backend|android|data)$/)
      expect(Array.isArray(p.techStack)).toBe(true)
      expect(p.techStack.length).toBeGreaterThan(0)
    }
  })

  it('getProjectBySlug returns matching project', () => {
    const p = getProjectBySlug('eqpt-monitor')
    expect(p).not.toBeNull()
    expect(p.title).toBe('EQPT Monitor')
  })

  it('getProjectBySlug returns null for unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeNull()
  })

  it('new projects have highlights array', () => {
    const newSlugs = ['eqpt-monitor', 'throttle', 'predictive-maintenance']
    for (const slug of newSlugs) {
      const p = getProjectBySlug(slug)
      expect(p, `project "${slug}" not found`).not.toBeNull()
      expect(Array.isArray(p.highlights)).toBe(true)
      expect(p.highlights.length).toBeGreaterThan(0)
      for (const h of p.highlights) {
        expect(typeof h).toBe('string')
        expect(h.length).toBeGreaterThan(0)
      }
    }
  })

  it('new projects have architectureDiagram string', () => {
    const newSlugs = ['eqpt-monitor', 'throttle', 'predictive-maintenance']
    for (const slug of newSlugs) {
      const p = getProjectBySlug(slug)
      expect(p, `project "${slug}" not found`).not.toBeNull()
      expect(typeof p.architectureDiagram).toBe('string')
      expect(p.architectureDiagram.length).toBeGreaterThan(0)
    }
  })

  it('new projects have keyDecisions array with decision and rationale', () => {
    const newSlugs = ['eqpt-monitor', 'throttle', 'predictive-maintenance']
    for (const slug of newSlugs) {
      const p = getProjectBySlug(slug)
      expect(p, `project "${slug}" not found`).not.toBeNull()
      expect(Array.isArray(p.keyDecisions)).toBe(true)
      for (const kd of p.keyDecisions) {
        expect(kd.decision).toBeTruthy()
        expect(kd.rationale).toBeTruthy()
      }
    }
  })

  it('kept projects have no highlights or keyDecisions', () => {
    const keptSlugs = ['calory-in-api', 'flutter-movies-app', 'house-price-prediction']
    for (const slug of keptSlugs) {
      const p = getProjectBySlug(slug)
      expect(p.highlights).toBeUndefined()
      expect(p.keyDecisions).toBeUndefined()
      expect(p.architectureDiagram).toBeUndefined()
    }
  })
})
