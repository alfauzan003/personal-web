import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";

const SOCIAL_LINKS = [
    { icon: FaGithub, href: profile.github, label: "GitHub" },
    { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-900 py-8">
            <div className="max-w-content mx-auto px-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-400">
                    © {new Date().getFullYear()} {profile.name} · {profile.location}
                </p>
                <div className="flex items-center gap-1">
                    {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="h-11 w-11 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                            <Icon size={18} aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
