import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectBySlug } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, ArrowLeft } from "lucide-react";

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);

    const [showBackButton, setShowBackButton] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        const onScroll = () => setShowBackButton(window.scrollY > 300);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Project not found
                        </h1>
                        <p className="text-slate-500 mb-6">
                            The project you're looking for doesn't exist.
                        </p>
                        <Button asChild>
                            <Link to="/#portfolio">← Back to Portfolio</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const {
        title,
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

            {/* Hero banner */}
            <div className="pt-24 pb-12 bg-slate-50">
                <div className="max-w-content mx-auto px-6">
                    <Link
                        to="/#portfolio"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8"
                    >
                        <ArrowLeft size={14} /> Back to Portfolio
                    </Link>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <h1 className="text-4xl font-bold text-slate-900">
                            {title}
                        </h1>
                        {github && (
                            <Button variant="outline" asChild className="shrink-0">
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <FaGithub size={16} /> View on GitHub
                                </a>
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {techStack.map((tech) => (
                            <Badge key={tech} variant="secondary">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-content mx-auto px-6 py-12">
                <div className="max-w-2xl space-y-10">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            Overview
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            {overview}
                        </p>
                    </section>

                    {highlights && highlights.length > 0 && (
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-3">
                                Highlights
                            </p>
                            <ul className="space-y-2">
                                {highlights.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
                                        <span className="text-blue-400 mt-0.5 shrink-0">✦</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">
                            Problem & Solution
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                    Problem
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {problem}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                    Solution
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {solution}
                                </p>
                            </div>
                        </div>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            Architecture
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            {architecture}
                        </p>
                        {architectureDiagram && (
                            <pre
                                className="bg-slate-900 text-green-400 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
                                role="img"
                                aria-label={`${title} architecture diagram`}
                            >
                                {architectureDiagram}
                            </pre>
                        )}
                    </section>

                    {keyDecisions && keyDecisions.length > 0 && (
                        <>
                            <Separator />
                            <section>
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                    Key Design Decisions
                                </h2>
                                <table className="w-full text-sm border-collapse" aria-label="Key design decisions">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="text-left text-slate-500 font-semibold uppercase tracking-wider text-xs pb-2 w-2/5">
                                                Decision
                                            </th>
                                            <th className="text-left text-slate-500 font-semibold uppercase tracking-wider text-xs pb-2 pl-4">
                                                Rationale
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {keyDecisions.map((kd, i) => (
                                            <tr key={i} className="border-b border-slate-100">
                                                <td className="py-3 pr-4 font-medium text-slate-800 align-top">
                                                    {kd.decision}
                                                </td>
                                                <td className="py-3 pl-4 text-slate-600 leading-relaxed align-top">
                                                    {kd.rationale}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        </>
                    )}

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            Results & Impact
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            {results}
                        </p>
                    </section>

                    {/* Media — only shown when project has media entries */}
                    {media && media.length > 0 && (
                        <>
                            <Separator />
                            <section>
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                    Screenshots
                                </h2>
                                <div className="space-y-4">
                                    {media.map((item, i) =>
                                        item.type === "image" ? (
                                            <img
                                                key={item.url}
                                                src={item.url}
                                                alt={`${title} screenshot ${i + 1}`}
                                                className="rounded-lg border border-slate-200 w-full"
                                            />
                                        ) : item.type === "video" ? (
                                            <div
                                                key={item.url}
                                                className="aspect-video rounded-lg overflow-hidden border border-slate-200"
                                            >
                                                <iframe
                                                    src={item.url}
                                                    title={`${title} demo`}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                />
                                            </div>
                                        ) : null,
                                    )}
                                </div>
                            </section>
                        </>
                    )}

                    {/* Links — only shown when demo URL exists (github already in hero) */}
                    {demo && (
                        <>
                            <Separator />
                            <section>
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                    Links
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    <Button asChild>
                                        <a
                                            href={demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <ExternalLink size={16} /> Live Demo
                                        </a>
                                    </Button>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </div>

            <Footer />

            {showBackButton && (
                <Link
                    to="/#portfolio"
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-opacity hover:bg-slate-700"
                >
                    <ArrowLeft size={14} /> Back to Portfolio
                </Link>
            )}
        </div>
    );
}
