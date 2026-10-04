import { describe, it, expect } from 'vitest'
import {
  projects,
  featuredProjects,
  otherProjects,
  getProjectBySlug,
  getAdjacentProject,
} from './projects'

const FEATURED_SLUGS = ['mini-mes', 'eqpt-monitor', 'throttle', 'predictive-maintenance']

describe('projects data', () => {
  it('has 7 projects with unique slugs', () => {
    expect(projects).toHaveLength(7)
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
  })

  it('every project has required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.tagline).toBeTruthy()
      expect(typeof p.year).toBe('number')
      expect(typeof p.featured).toBe('boolean')
      expect(p.category).toMatch(/^(web|backend|android|data)$/)
      expect(Array.isArray(p.techStack)).toBe(true)
      expect(p.techStack.length).toBeGreaterThan(0)
    }
  })

  it('splits featured and other projects, leading with Mini MES', () => {
    expect(featuredProjects.map((p) => p.slug)).toEqual(FEATURED_SLUGS)
    expect(otherProjects).toHaveLength(projects.length - FEATURED_SLUGS.length)
  })

  it('getProjectBySlug returns matching project', () => {
    const p = getProjectBySlug('eqpt-monitor')
    expect(p).not.toBeNull()
    expect(p.title).toBe('EQPT Monitor')
  })

  it('getProjectBySlug returns null for unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeNull()
  })

  it('getAdjacentProject wraps around and handles unknown slugs', () => {
    expect(getAdjacentProject('mini-mes').slug).toBe('eqpt-monitor')
    expect(getAdjacentProject(projects.at(-1).slug).slug).toBe(projects[0].slug)
    expect(getAdjacentProject('does-not-exist')).toBeNull()
  })

  it('featured projects have highlights, a diagram and key decisions', () => {
    for (const slug of FEATURED_SLUGS) {
      const p = getProjectBySlug(slug)
      expect(p, `project "${slug}" not found`).not.toBeNull()
      expect(p.highlights.length).toBeGreaterThan(0)
      expect(p.architectureDiagram.length).toBeGreaterThan(0)
      for (const kd of p.keyDecisions) {
        expect(kd.decision).toBeTruthy()
        expect(kd.rationale).toBeTruthy()
      }
    }
  })

  it('project copy contains no em dashes', () => {
    const text = JSON.stringify(
      projects.map(({ media, thumbnail, architectureDiagram, ...copy }) => copy),
    )
    expect(text).not.toContain('—')
  })
})
