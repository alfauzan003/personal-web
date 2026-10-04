import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Download } from "lucide-react";
import { profile } from "@/data/profile";

const SOCIAL_LINKS = [
    { icon: FaGithub, href: profile.github, label: "GitHub" },
    { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Hero() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            className="min-h-[100svh] flex flex-col justify-center pt-16 relative overflow-hidden"
            style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}assets/img/hero-bg.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
            }}
        >
            <div className="absolute inset-0 pointer-events-none bg-white/75" />
            <div className="relative z-10 max-w-content mx-auto px-6 w-full py-16">
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <p className="text-blue-700 font-medium mb-4 text-sm tracking-wide uppercase">
                        Open to software engineering roles
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.05] mb-4">
                        {profile.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 mb-6 font-light">
                        Software Engineer · Manufacturing systems & backend
                    </p>
                    <p className="text-slate-700 text-lg max-w-2xl mb-9 leading-relaxed">
                        I design and build backend systems, APIs, and
                        data-driven applications with a focus on performance,
                        integration, and real-world business needs.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mb-10">
                        <Button asChild size="lg">
                            <a href="#projects">View projects</a>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            asChild
                            className="bg-white/80"
                        >
                            <a
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download aria-hidden="true" /> Download resume
                            </a>
                        </Button>
                        <div className="flex items-center gap-1 sm:ml-3">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={
                                        href.startsWith("mailto:")
                                            ? undefined
                                            : "_blank"
                                    }
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="h-11 w-11 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-blue-600 hover:bg-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                >
                                    <Icon size={22} aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
