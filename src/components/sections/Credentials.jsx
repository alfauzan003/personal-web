import { ExternalLink } from 'lucide-react'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import { education, certifications } from '@/data/profile'

export default function Credentials() {
  return (
    <SectionWrapper id="credentials" className="bg-slate-50">
      <SectionHeading title="Education & certifications" />
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">{education.degree}</h3>
          <p className="text-blue-700 font-medium">{education.school}</p>
          <p className="mt-1 text-sm text-slate-500">
            {education.period} · GPA {education.gpa}
          </p>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Relevant coursework: {education.coursework.join(', ')}.
          </p>
        </div>

        <ul className="md:col-span-3 divide-y divide-slate-200 border-y border-slate-200">
          {certifications.map(({ name, issuer, year, url }) => (
            <li key={name} className="flex items-center justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{name}</p>
                <p className="text-sm text-slate-500">
                  {issuer} · {year}
                </p>
              </div>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${name} credential`}
                  className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Verify <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
