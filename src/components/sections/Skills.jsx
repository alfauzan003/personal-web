import SectionWrapper from '@/components/SectionWrapper'
import { Badge } from '@/components/ui/badge'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'PHP', 'C#', 'Java'],
  },
  {
    category: 'Backend',
    skills: ['Flask', 'ExpressJS', 'Node.js', 'REST APIs'],
  },
  {
    category: 'Cloud',
    skills: ['Google Cloud Platform', 'App Engine', 'Cloud Storage', 'Firestore'],
  },
  {
    category: 'Mobile',
    skills: ['Flutter', 'Dart'],
  },
  {
    category: 'Data & ML',
    skills: ['Machine Learning', 'Data Analysis', 'Scikit-learn', 'Pandas'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Docker', 'Postman', 'MySQL', 'SQLite'],
  },
]

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-slate-50">
      <h2 className="text-3xl font-bold text-slate-900 mb-12">Skills</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILL_GROUPS.map(({ category, skills }) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
