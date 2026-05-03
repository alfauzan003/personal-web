import { Badge } from "@/components/ui/badge";

export default function ExperienceItem({
    company,
    role,
    period,
    location,
    bullets,
    skills,
    isLast,
}) {
    return (
        <div className="relative pl-8">
            {/* Vertical line */}
            {!isLast && (
                <div className="absolute left-[7px] top-6 bottom-0 w-px bg-slate-200" />
            )}
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white ring-offset-1" />

            <div className="pb-10">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                        <h3 className="font-semibold text-slate-900">{role}</h3>
                        <p className="text-blue-600 text-sm font-medium">
                            {company}
                        </p>
                    </div>
                    <div className="text-right text-sm text-slate-500">
                        <p>{period}</p>
                        <p>{location}</p>
                    </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                    {bullets.map((bullet) => (
                        <li
                            key={bullet}
                            className="text-slate-600 text-sm leading-relaxed flex gap-2"
                        >
                            <span className="text-blue-400 shrink-0">▸</span>
                            {bullet}
                        </li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {skills.map((skill) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
