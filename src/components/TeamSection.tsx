import Image from "next/image";
import FadeIn from "./ui/FadeIn";
import config from "../../content/site-config.json";

export default function TeamSection() {
  return (
    <section id="tym" className="bg-surface-container-low py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-primary-container font-label tracking-[0.3em] text-xs block mb-4">
              Majstri svojho remesla
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">
              Náš tím
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.team.map((member, i) => (
            <FadeIn key={member.id} delay={i * 120}>
              <div className="group text-center">
                <div className="relative w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden border-2 border-primary-container/20 group-hover:border-primary-container transition-all duration-500">
                  <Image
                    src={`https://picsum.photos/seed/team-${member.id}/400/400`}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="224px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-2 text-on-surface">
                  {member.name}
                </h3>
                <p className="font-label text-primary-container uppercase tracking-widest text-xs font-bold mb-2">
                  {member.role}
                </p>
                <p className="font-body text-on-surface-variant text-sm">
                  {member.experience}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
