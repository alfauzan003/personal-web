import { useState } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Backend', value: 'backend' },
  { label: 'Android', value: 'android' },
  { label: 'Data Science', value: 'data' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <SectionWrapper id="portfolio">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Portfolio</h2>
      <p className="text-slate-500 mb-8 max-w-xl">
        A collection of projects across backend, cloud, mobile, and data science.
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm">No projects in this category yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
