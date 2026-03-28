import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getProjectBySlug } from '@/data/projects'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FaGithub } from 'react-icons/fa'
import { ExternalLink, ArrowLeft } from 'lucide-react'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Project not found</h1>
            <p className="text-slate-500 mb-6">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">← Back to Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const {
    title,
    techStack,
    overview,
    problem,
    solution,
    architecture,
    results,
    media,
    github,
    demo,
  } = project

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero banner */}
      <div className="pt-24 pb-12 bg-slate-50">
        <div className="max-w-content mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="max-w-2xl space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Overview</h2>
            <p className="text-slate-600 leading-relaxed">{overview}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Problem & Solution</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Problem
                </h3>
                <p className="text-slate-600 leading-relaxed">{problem}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Solution
                </h3>
                <p className="text-slate-600 leading-relaxed">{solution}</p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Architecture</h2>
            <p className="text-slate-600 leading-relaxed">{architecture}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Results & Impact</h2>
            <p className="text-slate-600 leading-relaxed">{results}</p>
          </section>

          {/* Media — only shown when project has media entries */}
          {media && media.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Screenshots</h2>
                <div className="space-y-4">
                  {media.map((item, i) =>
                    item.type === 'image' ? (
                      <img
                        key={i}
                        src={item.url}
                        alt={`${title} screenshot ${i + 1}`}
                        className="rounded-lg border border-slate-200 w-full"
                      />
                    ) : item.type === 'video' ? (
                      <div
                        key={i}
                        className="aspect-video rounded-lg overflow-hidden border border-slate-200"
                      >
                        <iframe
                          src={item.url}
                          title={`${title} demo`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </section>
            </>
          )}

          {/* Links — only shown when github or demo URLs exist */}
          {(github || demo) && (
            <>
              <Separator />
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Links</h2>
                <div className="flex flex-wrap gap-3">
                  {github && (
                    <Button variant="outline" asChild>
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FaGithub size={16} /> GitHub Repository
                      </a>
                    </Button>
                  )}
                  {demo && (
                    <Button asChild>
                      <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
