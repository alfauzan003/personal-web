import SectionWrapper from '@/components/SectionWrapper'
import SectionHeading from '@/components/SectionHeading'
import ExperienceItem from '@/components/ExperienceItem'
import { experiences } from '@/data/experience'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Experience" />
      <ol className="max-w-3xl">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.company}
            {...exp}
            isLast={index === experiences.length - 1}
          />
        ))}
      </ol>
    </SectionWrapper>
  )
}
