import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import { skillGroups } from '@/data/profile'

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading title="Skills" />
      <dl className="divide-y divide-slate-200 border-y border-slate-200">
        {skillGroups.map(({ category, skills }) => (
          <div key={category} className="grid gap-2 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
            <dt className="text-sm font-semibold text-slate-900 sm:pt-1">{category}</dt>
            <dd className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-sm text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  )
}
