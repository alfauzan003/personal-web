import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ProjectCard({ slug, title, thumbnail, techStack }) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden bg-slate-100">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {techStack.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{techStack.length - 3}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="p-0 h-auto text-blue-600 hover:text-blue-700"
        >
          <Link to={`/projects/${slug}`} className="flex items-center gap-1">
            View Project <ArrowRight size={14} />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
