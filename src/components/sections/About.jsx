import SectionWrapper from "@/components/SectionWrapper";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Mail, Briefcase } from "lucide-react";

const DETAILS = [
    { icon: MapPin, label: "Location", value: "Jakarta, Indonesia" },
    {
        icon: Mail,
        label: "Email",
        value: "habibalfauzan1@gmail.com",
        href: "mailto:habibalfauzan1@gmail.com",
    },
    { icon: Briefcase, label: "Freelance", value: "Available" },
];

export default function About() {
    return (
        <SectionWrapper id="about" className="bg-slate-50">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                        About Me
                    </h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        Software Engineer with experience in backend development
                        and smart factory systems for manufacturing
                        environments. Skilled in optimizing system performance,
                        troubleshooting complex issues, and maintaining reliable
                        applications factories in multiple countries.
                        Experienced in collaborating with global teams to
                        integrate, support, and improve business-critical
                        systems. Passionate about building scalable, efficient,
                        and reliable software solutions.
                    </p>
                    <div className="flex flex-col gap-3">
                        {DETAILS.map(({ icon: Icon, label, value, href }) => (
                            <div
                                key={label}
                                className="flex items-center gap-3 text-sm text-slate-600"
                            >
                                <Icon
                                    size={16}
                                    className="text-blue-600 shrink-0"
                                />
                                <span className="font-medium text-slate-900 w-20">
                                    {label}:
                                </span>
                                {href ? (
                                    <a
                                        href={href}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {value}
                                    </a>
                                ) : (
                                    <span>{value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <Avatar className="w-64 h-64 ring-4 ring-blue-100">
                        <AvatarImage
                            src={`${import.meta.env.BASE_URL}assets/img/profile-img-2.jpg`}
                            alt="Habib Al Fauzan"
                            className="object-cover object-top object-[center_50%]"
                        />
                        <AvatarFallback className="text-4xl font-bold text-blue-600 bg-blue-50">
                            HAF
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </SectionWrapper>
    );
}
