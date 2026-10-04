// The blue period echoes the "HAF." wordmark in the navbar.
export default function SectionHeading({ title, intro, className = '' }) {
  return (
    <div className={`mb-10 md:mb-12 ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
        <span className="text-blue-600">.</span>
      </h2>
      {intro && (
        <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">{intro}</p>
      )}
    </div>
  )
}
