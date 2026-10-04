import { motion, useReducedMotion } from 'framer-motion'

export default function SectionWrapper({ children, id, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`py-20 md:py-24 ${className}`}
    >
      <div className="max-w-content mx-auto px-6">
        {children}
      </div>
    </motion.section>
  )
}
