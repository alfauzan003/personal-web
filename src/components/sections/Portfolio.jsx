import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import { featuredProjects, otherProjects } from '@/data/projects'

export default function Portfolio() {
  const [lead, ...rest] = featuredProjects

  return (
    <SectionWrapper id="projects" className="bg-slate-50">
      <SectionHeading
        title="Selected projects"
        intro="Personal projects, mostly around manufacturing software: production tracking, machine data and the backend services behind them. Each one runs with Docker and comes with a write-up of its architecture and design decisions."
      />

      {lead && <ProjectCard {...lead} wide />}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="mt-16">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Earlier work</h3>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {otherProjects.map(({ slug, title, tagline, year, techStack, github }) => (
              <li key={slug} className="group relative flex items-start gap-4 py-4 sm:items-center">
                <span className="w-12 shrink-0 pt-0.5 text-sm tabular-nums text-slate-500 sm:pt-0">{year}</span>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/projects/${slug}`}
                    className="font-medium text-slate-900 group-hover:text-blue-700 after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {title}
                  </Link>
                  <p className="text-sm text-slate-600">{tagline}</p>
                  <p className="mt-1 text-xs text-slate-500 md:hidden">{techStack.slice(0, 3).join(' · ')}</p>
                </div>
                <p className="hidden md:block w-64 shrink-0 text-right text-xs text-slate-500">
                  {techStack.slice(0, 3).join(' · ')}
                </p>
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} source code on GitHub`}
                    className="relative z-10 -my-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <FaGithub size={18} aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionWrapper>
  )
}
