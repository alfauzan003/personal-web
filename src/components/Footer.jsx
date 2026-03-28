import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const SOCIAL_LINKS = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/alfauzan003/', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/alfauzan003', label: 'GitHub' },
  { icon: FaTwitter, href: 'https://twitter.com/alfauzan003', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 py-10 mt-20">
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          <a
            href="mailto:habibalfauzan1@gmail.com"
            className="hover:text-blue-600 transition-colors"
          >
            habibalfauzan1@gmail.com
          </a>
        </p>
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
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Habib Al Fauzan
        </p>
      </div>
    </footer>
  )
}
