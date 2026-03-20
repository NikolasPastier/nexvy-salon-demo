import { Bot, CalendarCheck, MessageCircle, type LucideIcon } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import config from "../../content/site-config.json";

const ICONS: Record<string, LucideIcon> = {
  Bot,
  CalendarCheck,
  MessageCircle,
};

export default function WhyUs() {
  return (
    <section className="bg-surface py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-headline text-center text-4xl md:text-5xl font-bold mb-12 tracking-tighter text-on-surface">
            Prečo si vybrať nás?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.whyUs.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <FadeIn key={item.title} delay={i * 120}>
                <div className="group text-center bg-white/[0.03] rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.20)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-6 inline-flex items-center justify-center bg-primary-container/10 rounded-2xl p-4">
                    {Icon && (
                      <Icon
                        size={52}
                        strokeWidth={1}
                        className="text-primary-container group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                    {item.title}
                  </h3>
                  <p className="font-body text-on-surface-variant leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
