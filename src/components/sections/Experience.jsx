import SectionWrapper from '@/components/SectionWrapper'
import ExperienceItem from '@/components/ExperienceItem'
import { experiences } from '@/data/experience'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <h2 className="text-3xl font-bold text-slate-900 mb-12">Experience</h2>
      <div className="max-w-2xl">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.company}
            {...exp}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
