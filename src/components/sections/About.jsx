import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
    return (
        <SectionWrapper id="about" className="bg-slate-50">
            <div className="max-w-3xl">
                <SectionHeading title="About" className="!mb-6" />
                <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                    <p>
                        I'm a software engineer working on smart factory
                        systems for EV battery manufacturing. Most of my work
                        sits where software meets machines: the equipment
                        interfaces that talk to production equipment, the MES
                        integrations behind them, and the support that keeps
                        those systems running on the factory floor.
                    </p>
                    <p>
                        I work with engineering teams overseas on development,
                        testing, migration and deployment for manufacturing
                        sites in multiple countries.
                    </p>
                    <p>
                        Outside work I build personal projects focused on
                        backend systems, real-time data processing, cloud
                        infrastructure, and AI applications. I enjoy solving
                        complex technical problems, learning new technologies,
                        and turning ideas into reliable software.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}
