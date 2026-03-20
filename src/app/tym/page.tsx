import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingTrigger from "@/components/BookingTrigger";
import config from "../../../content/site-config.json";

export const metadata: Metadata = {
  title: "Náš tím",
  description:
    "Spoznajte tím Bella Studio — Jana Kováčová (balayage), Marek Novák (barber) a Lucia Tóthová (farbenie). Majstri svojho remesla v Bratislave.",
};

type TeamMember = (typeof config.team)[number] & {
  bio: string;
  specialties: string[];
};

export default function TymPage() {
  const team = config.team as TeamMember[];

  return (
    <>
      <Header />
      <main>
        {/* Page hero */}
        <section className="bg-surface-container-lowest pt-[72px] pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto pt-16">
            <span className="text-primary-container font-label tracking-[0.3em] text-xs block mb-4">
              Majstri svojho remesla
            </span>
            <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-on-surface">
              Náš tím
            </h1>
            <p className="font-body text-on-surface-variant mt-4 max-w-xl leading-relaxed">
              Tím Bella Studio tvorí trojica vášnivých odborníkov s celkovo
              viac ako 23 rokmi skúseností v oblasti vlasovej starostlivosti.
            </p>
          </div>
        </section>

        {/* Team members — alternating layout */}
        {team.map((member, i) => {
          const isEven = i % 2 === 0;
          return (
            <section
              key={member.id}
              className={`py-24 px-6 md:px-12 ${
                isEven ? "bg-surface" : "bg-surface-container-low"
              }`}
            >
              <div className="max-w-7xl mx-auto">
                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-12 md:gap-20 items-center`}
                >
                  {/* Photo */}
                  <div className="w-full md:w-auto shrink-0">
                    <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-2 border-primary-container/20 hover:border-primary-container transition-all duration-500 group">
                      <Image
                        src={`https://picsum.photos/seed/team-full-${member.id}/640/640`}
                        alt={`${member.name} — ${member.role}`}
                        fill
                        sizes="(max-width: 768px) 288px, 320px"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-primary-container block mb-3">
                      {member.experience}
                    </span>
                    <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface mb-2">
                      {member.name}
                    </h2>
                    <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant mb-6">
                      {member.role}
                    </p>

                    {/* Specialty tags */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                      {member.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="font-label text-[10px] uppercase tracking-widest text-on-primary bg-primary-container px-3 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <p className="font-body text-on-surface-variant leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
                      {member.bio}
                    </p>

                    <BookingTrigger
                      stylistName={member.name}
                      className="bg-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-xs px-8 flex items-center min-h-[48px] w-fit mx-auto md:mx-0 hover:brightness-110 transition-all rounded-xl"
                      aria-label={`Rezervovať termín u ${member.name}`}
                    >
                      Rezervovať u {member.name.split(" ")[0]}
                    </BookingTrigger>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Bottom CTA */}
        <section className="bg-surface-container-lowest py-20 px-6 md:px-12 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-headline text-3xl font-bold tracking-tighter mb-4 text-on-surface">
              Chcete sa pridať do nášho tímu?
            </h2>
            <p className="font-body text-on-surface-variant mb-6 leading-relaxed">
              Hľadáme vášnivých ľudí, ktorí milujú svoju prácu.
              Napíšte nám na{" "}
              <a
                href={`mailto:${config.business.contacts.email}`}
                className="text-primary-container hover:underline"
              >
                {config.business.contacts.email}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
