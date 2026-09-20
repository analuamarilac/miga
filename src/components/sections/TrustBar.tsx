import { Flask, Heart, Sparkle } from "@/components/art/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { trustItems } from "@/data/site";

const icons = { sparkle: Sparkle, flask: Flask, heart: Heart };

export function TrustBar() {
  return (
    <section className="border-b border-espresso/8 bg-cream" aria-label="Nossos princípios">
      <ul className="mx-auto grid max-w-[1600px] gap-px px-5 py-8 md:grid-cols-3 md:px-10">
        {trustItems.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 0.08}
              y={16}
              className={`flex items-center gap-4 px-2 py-4 md:justify-center md:px-8 ${
                index > 0 ? "md:border-l md:border-espresso/12" : ""
              }`}
            >
              <Icon className="h-7 w-7 shrink-0 text-espresso" />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-0.5 text-xs text-espresso/60">{item.description}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
