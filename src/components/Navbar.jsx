import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const NAV_LINKS = [
    { label: "About", hash: "#about" },
    { label: "Experience", hash: "#experience" },
    { label: "Projects", hash: "#projects" },
    { label: "Skills", hash: "#skills" },
    { label: "Contact", hash: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    useEffect(() => setMenuOpen(false), [location.pathname]);

    const solid = scrolled || menuOpen || !isHome;

    const renderLink = ({ label, hash }, className) =>
        isHome ? (
            <a key={hash} href={hash} className={className} onClick={() => setMenuOpen(false)}>
                {label}
            </a>
        ) : (
            <Link key={hash} to={`/${hash}`} className={className}>
                {label}
            </Link>
        );

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
                solid ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
            }`}
        >
            <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="font-semibold text-slate-900 text-lg tracking-tight rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    aria-label="Habib Al Fauzan, home"
                >
                    HAF<span className="text-blue-600">.</span>
                </Link>

                <div className="hidden md:flex items-center gap-7">
                    <nav aria-label="Main" className="flex items-center gap-7">
                        {NAV_LINKS.map((link) =>
                            renderLink(
                                link,
                                "text-sm text-slate-600 hover:text-blue-600 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                            ),
                        )}
                    </nav>
                    <Button asChild size="sm">
                        <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                            Resume (PDF)
                        </a>
                    </Button>
                </div>

                <button
                    type="button"
                    className="md:hidden -mr-2 h-11 w-11 inline-flex items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {menuOpen && (
                <nav
                    id="mobile-menu"
                    aria-label="Main"
                    className="md:hidden bg-white border-t border-slate-100 px-6 py-3 flex flex-col"
                >
                    {NAV_LINKS.map((link) =>
                        renderLink(
                            link,
                            "py-3 text-base text-slate-700 hover:text-blue-600 border-b border-slate-100",
                        ),
                    )}
                    <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 text-base font-medium text-blue-600"
                    >
                        Resume (PDF)
                    </a>
                </nav>
            )}
        </header>
    );
}
