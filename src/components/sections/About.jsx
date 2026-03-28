import SectionWrapper from '@/components/SectionWrapper'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MapPin, Mail, Briefcase } from 'lucide-react'

const DETAILS = [
  { icon: MapPin, label: 'Location', value: 'Yogyakarta, Indonesia' },
  {
    icon: Mail,
    label: 'Email',
    value: 'habibalfauzan1@gmail.com',
    href: 'mailto:habibalfauzan1@gmail.com',
  },
  { icon: Briefcase, label: 'Freelance', value: 'Available' },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-slate-50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">About Me</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            I'm a software developer specialising in backend systems and cloud infrastructure, with
            experience delivering production software in the smart manufacturing industry. I've worked
            across the stack — from Equipment Interface logic and HMI web interfaces at LG Sinar Mas,
            to REST APIs deployed on Google Cloud during Bangkit Academy.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            I care about writing clean, maintainable code and building systems that are reliable at
            scale. I'm actively seeking new challenges where I can continue growing as an engineer.
          </p>
          <div className="flex flex-col gap-3">
            {DETAILS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-slate-600">
                <Icon size={16} className="text-blue-600 shrink-0" />
                <span className="font-medium text-slate-900 w-20">{label}:</span>
                {href ? (
                  <a href={href} className="hover:text-blue-600 transition-colors">
                    {value}
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Avatar className="w-64 h-64 ring-4 ring-blue-100">
            <AvatarImage src="/assets/img/profile-img-2.jpg" alt="Habib Al Fauzan" />
            <AvatarFallback className="text-4xl font-bold text-blue-600 bg-blue-50">
              HAF
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </SectionWrapper>
  )
}
