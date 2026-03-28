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
    const p = getProjectBySlug('calory-in-api')
    expect(p).not.toBeNull()
    expect(p.title).toBe('CaloryIn API')
  })

  it('getProjectBySlug returns null for unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeNull()
  })
})
