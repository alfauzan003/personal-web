import { Badge } from "@/components/ui/badge";

export default function ExperienceItem({
    company,
    role,
    period,
    location,
    summary,
    bullets,
    skills,
    isLast,
}) {
    return (
        <li className="relative pl-8">
            {!isLast && (
                <div className="absolute left-[6px] top-6 bottom-0 w-px bg-slate-200" aria-hidden="true" />
            )}
            <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" aria-hidden="true" />

            <div className={isLast ? "" : "pb-12"}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">{role}</h3>
                        <p className="text-blue-700 font-medium">{company}</p>
                    </div>
                    <p className="text-sm text-slate-500 sm:text-right shrink-0">
                        {period}
                        <span className="block">{location}</span>
                    </p>
                </div>
                {summary && (
                    <p className="mt-3 text-slate-700">{summary}</p>
                )}
                <ul className="mt-3 space-y-2">
                    {bullets.map((bullet) => (
                        <li
                            key={bullet}
                            className="text-slate-600 leading-relaxed flex gap-3"
                        >
                            <span className="mt-[0.6rem] h-1 w-1 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                            {bullet}
                        </li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-4">
                    {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs font-medium">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </li>
    );
}
