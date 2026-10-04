import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'

// The title link is stretched over the whole card (after:inset-0) so the card is
// clickable without nesting the GitHub link inside another link.
export default function ProjectCard({ slug, title, tagline, thumbnail, techStack, github, wide = false }) {
  const visibleTech = techStack.slice(0, wide ? 7 : 3)
  const hiddenCount = techStack.length - visibleTech.length

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 ${
        wide ? 'md:flex-row' : ''
      }`}
    >
      <div
        className={`overflow-hidden bg-slate-100 border-slate-200 ${
          wide ? 'aspect-video md:aspect-auto md:w-3/5 md:border-r border-b md:border-b-0' : 'aspect-video border-b'
        }`}
      >
        <img
          src={thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${wide ? 'p-6 md:p-8 md:w-2/5 md:justify-center' : 'p-5'}`}>
        <h3 className={`font-semibold text-slate-900 ${wide ? 'text-2xl' : 'text-lg'}`}>
          <Link
            to={`/projects/${slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {title}
          </Link>
        </h3>
        <p className={`mt-2 text-slate-600 leading-relaxed ${wide ? '' : 'text-sm'}`}>{tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleTech.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs font-medium">
              {tech}
            </Badge>
          ))}
          {hiddenCount > 0 && (
            <Badge variant="secondary" className="text-xs font-medium">
              +{hiddenCount}
            </Badge>
          )}
        </div>
        <div className={`flex items-center justify-between ${wide ? 'mt-8' : 'mt-auto pt-5'}`}>
          <span className="text-sm font-medium text-blue-700 group-hover:underline underline-offset-4">
            Read case study
          </span>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} source code on GitHub`}
              className="relative z-10 -m-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <FaGithub size={20} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
