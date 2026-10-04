import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Portfolio from '@/components/sections/Portfolio'
import Skills from '@/components/sections/Skills'
import Credentials from '@/components/sections/Credentials'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Portfolio />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
