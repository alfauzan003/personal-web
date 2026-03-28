import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const SOCIAL_LINKS = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/alfauzan003/', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/alfauzan003', label: 'GitHub' },
  { icon: FaTwitter, href: 'https://twitter.com/alfauzan003', label: 'Twitter' },
]

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-white pt-16">
      <div className="max-w-content mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-blue-600 font-medium mb-3 text-sm tracking-wide uppercase">
            Available for opportunities
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-4">
            Habib Al Fauzan
          </h1>
          <p className="text-xl text-slate-500 mb-6 font-light">
            Software Engineer · Cloud · Data
          </p>
          <p className="text-slate-600 max-w-xl mb-8 leading-relaxed">
            Backend-focused engineer with hands-on experience building scalable systems for smart
            factory, cloud infrastructure, and data-driven applications. Currently at LG Sinar Mas,
            shipping production software across multiple countries.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Button asChild size="lg">
              <a href="#portfolio">View Portfolio</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
