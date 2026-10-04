import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { profile } from "@/data/profile";

export default function Contact() {
    return (
        <SectionWrapper id="contact" className="bg-slate-900">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                    Let's talk<span className="text-blue-400">.</span>
                </h2>
                <p className="mt-4 text-lg text-slate-300 leading-relaxed">
                    I'm available for opportunities in software engineering roles.
                    Email is the quickest way to reach me.
                </p>
                <a
                    href={`mailto:${profile.email}`}
                    className="mt-8 inline-block text-xl md:text-2xl font-medium text-white underline decoration-blue-400 decoration-2 underline-offset-8 hover:decoration-white break-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900"
                >
                    {profile.email}
                </a>
                <div className="mt-10 flex flex-wrap gap-3">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:text-white focus-visible:ring-offset-slate-900"
                    >
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin aria-hidden="true" /> LinkedIn
                        </a>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:text-white focus-visible:ring-offset-slate-900"
                    >
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub aria-hidden="true" /> GitHub
                        </a>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:text-white focus-visible:ring-offset-slate-900"
                    >
                        <a
                            href={profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Download aria-hidden="true" /> Resume
                        </a>
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    );
}
