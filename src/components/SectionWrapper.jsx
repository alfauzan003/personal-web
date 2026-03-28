import { motion } from 'framer-motion'

export default function SectionWrapper({ children, id, className = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`py-20 ${className}`}
    >
      <div className="max-w-content mx-auto px-6">
        {children}
      </div>
    </motion.section>
  )
}
