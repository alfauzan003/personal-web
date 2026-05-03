import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Portfolio", href: "#portfolio" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
                scrolled
                    ? "bg-white/95 backdrop-blur-sm shadow-sm"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="font-semibold text-slate-900 text-lg tracking-tight"
                >
                    HAF<span className="text-blue-600">.</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    <nav className="flex items-center gap-6">
                        {isHome
                            ? NAV_LINKS.map((link) => (
                                  <a
                                      key={link.href}
                                      href={link.href}
                                      className="text-sm text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap"
                                  >
                                      {link.label}
                                  </a>
                              ))
                            : null}
                    </nav>
                    <Button asChild size="sm" className="shrink-0">
                        <a
                            href={`${import.meta.env.BASE_URL}assets/CV_Habib_Al_Fauzan.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Resume
                        </a>
                    </Button>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-5 h-0.5 bg-current mb-1.5" />
                    <div className="w-5 h-0.5 bg-current mb-1.5" />
                    <div className="w-5 h-0.5 bg-current" />
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
                    {isHome
                        ? NAV_LINKS.map((link) => (
                              <a
                                  key={link.href}
                                  href={link.href}
                                  className="text-sm text-slate-600 hover:text-blue-600"
                                  onClick={() => setMenuOpen(false)}
                              >
                                  {link.label}
                              </a>
                          ))
                        : null}
                    <a
                        href={`${import.meta.env.BASE_URL}assets/CV_Habib_Al_Fauzan.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600"
                    >
                        Resume ↗
                    </a>
                </div>
            )}
        </header>
    );
}
