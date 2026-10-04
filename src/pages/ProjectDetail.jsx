import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getProjectBySlug, getAdjacentProject } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";

function Section({ title, children }) {
    return (
        <section className="border-t border-slate-200 pt-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
                {title}
                <span className="text-blue-600">.</span>
            </h2>
            {children}
        </section>
    );
}

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);
    const next = getAdjacentProject(slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.title = project
            ? `${project.title} · Habib Al Fauzan`
            : "Project not found · Habib Al Fauzan";
        return () => {
            document.title = "Habib Al Fauzan · Software Engineer";
        };
    }, [slug, project]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center px-6 pt-16">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Project not found
                        </h1>
                        <p className="text-slate-600 mb-6">
                            This project does not exist or has been renamed.
                        </p>
                        <Button asChild>
                            <Link to="/#projects">
                                <ArrowLeft aria-hidden="true" /> Back to projects
                            </Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const {
        title,
        tagline,
        year,
        techStack,
        overview,
        problem,
        solution,
        architecture,
        architectureDiagram,
        highlights,
        keyDecisions,
        results,
        media,
        github,
        demo,
    } = project;

    return (
        <div className="min-h-screen">
            <Navbar />

            <main>
                <header className="pt-28 pb-12 bg-slate-50 border-b border-slate-200">
                    <div className="max-w-content mx-auto px-6">
                        <Link
                            to="/#projects"
                            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-700 transition-colors mb-8 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                        >
                            <ArrowLeft size={14} aria-hidden="true" /> All projects
                        </Link>
                        <p className="text-sm text-slate-500 mb-2">{year}</p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            {title}
                        </h1>
                        {tagline && (
                            <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
                                {tagline}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {techStack.map((tech) => (
                                <Badge key={tech} variant="secondary" className="font-medium">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        {(github || demo) && (
                            <div className="flex flex-wrap gap-3 mt-8">
                                {github && (
                                    <Button asChild>
                                        <a href={github} target="_blank" rel="noopener noreferrer">
                                            <FaGithub aria-hidden="true" /> View source on GitHub
                                        </a>
                                    </Button>
                                )}
                                {demo && (
                                    <Button variant="outline" asChild>
                                        <a href={demo} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink aria-hidden="true" /> Live demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                <div className="max-w-content mx-auto px-6 py-12">
                    <div className="max-w-3xl space-y-10">
                        <section>
                            <h2 className="sr-only">Overview</h2>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                {overview}
                            </p>
                        </section>

                        {highlights && highlights.length > 0 && (
                            <section className="rounded-lg border border-blue-100 bg-blue-50 p-6">
                                <h2 className="text-sm font-semibold text-blue-800 mb-3">
                                    Highlights
                                </h2>
                                <ul className="space-y-2.5">
                                    {highlights.map((point) => (
                                        <li key={point} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                                            <span className="mt-[0.6rem] h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        <Section title="Problem and solution">
                            <dl className="space-y-6">
                                <div>
                                    <dt className="text-sm font-semibold text-slate-900 mb-1.5">Problem</dt>
                                    <dd className="text-slate-600 leading-relaxed">{problem}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-semibold text-slate-900 mb-1.5">Solution</dt>
                                    <dd className="text-slate-600 leading-relaxed">{solution}</dd>
                                </div>
                            </dl>
                        </Section>

                        <Section title="Architecture">
                            <p className="text-slate-600 leading-relaxed mb-5">{architecture}</p>
                            {architectureDiagram && (
                                <pre
                                    className="bg-slate-900 text-slate-100 rounded-lg p-5 text-xs overflow-x-auto leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                    style={{ fontFamily: "\"Cascadia Mono\", Consolas, SFMono-Regular, Menlo, monospace" }}
                                    role="img"
                                    aria-label={`${title} architecture diagram`}
                                    tabIndex={0}
                                >
                                    {architectureDiagram}
                                </pre>
                            )}
                        </Section>

                        {keyDecisions && keyDecisions.length > 0 && (
                            <Section title="Key design decisions">
                                <dl className="divide-y divide-slate-200 border-y border-slate-200">
                                    {keyDecisions.map((kd) => (
                                        <div key={kd.decision} className="grid gap-1 py-4 sm:grid-cols-[2fr_3fr] sm:gap-6">
                                            <dt className="font-medium text-slate-900">{kd.decision}</dt>
                                            <dd className="text-slate-600 leading-relaxed">{kd.rationale}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </Section>
                        )}

                        <Section title="Results">
                            <p className="text-slate-600 leading-relaxed">{results}</p>
                        </Section>

                        {media && media.length > 0 && (
                            <Section title="Screenshots">
                                <div className="space-y-8">
                                    {media.map((item, i) => (
                                        <figure key={item.url}>
                                            <img
                                                src={item.url}
                                                alt={item.caption ?? `${title} screenshot ${i + 1}`}
                                                loading="lazy"
                                                className="rounded-lg border border-slate-200 w-full"
                                            />
                                            {item.caption && (
                                                <figcaption className="mt-2 text-sm text-slate-500">
                                                    {item.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    ))}
                                </div>
                            </Section>
                        )}
                    </div>

                    {next && next.slug !== slug && (
                        <nav aria-label="Next project" className="mt-16 border-t border-slate-200 pt-8">
                            <Link
                                to={`/projects/${next.slug}`}
                                className="group inline-flex flex-col rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
                            >
                                <span className="text-sm text-slate-500">Next project</span>
                                <span className="mt-1 inline-flex items-center gap-2 text-xl font-semibold text-slate-900 group-hover:text-blue-700">
                                    {next.title}
                                    <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </nav>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
