import { Check, Star, type LucideIcon } from "lucide-react";
import GradientAvatar from "../shared/GradientAvatar";

type FeatureCardProps = {
  feature: {
    icon: LucideIcon;
    title: string;
    desc: string;
    color: string;
    bg: string;
  };
};

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div className="group p-6 rounded-2xl bg-[#1E293B] border border-[#6366F1]/10 hover:border-[#6366F1]/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6366F1]/5 cursor-default">
      <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-5`}>
        <Icon size={20} className={feature.color} />
      </div>
      <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
      <p className="text-[#94A3B8] text-sm leading-relaxed">{feature.desc}</p>
    </div>
  );
}

type TestimonialCardProps = {
  testimonial: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    stars: number;
  };
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-[#1E293B] border border-[#6366F1]/10 hover:border-[#6366F1]/25 transition-all flex flex-col">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.stars }, (_, index) => (
          <Star key={index} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
        ))}
      </div>
      <p className="text-[#CBD5E1] text-sm leading-relaxed flex-1 mb-4">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3">
        <GradientAvatar initials={testimonial.avatar} />
        <div>
          <div className="text-white text-sm font-medium">{testimonial.name}</div>
          <div className="text-[#475569] text-xs">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

type PricingCardProps = {
  plan: {
    name: string;
    price: string;
    period: string;
    desc: string;
    features: string[];
    cta: string;
    primary: boolean;
  };
  onSelect: () => void;
};

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  return (
    <div className={`rounded-2xl p-7 border flex flex-col relative ${plan.primary ? "bg-gradient-to-b from-[#6366F1]/20 to-[#6366F1]/5 border-[#6366F1]/50 shadow-2xl shadow-[#6366F1]/10" : "bg-[#1E293B] border-[#6366F1]/10"}`}>
      {plan.primary && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6366F1] text-white text-xs font-semibold px-4 py-1 rounded-full">Most popular</div>
      )}
      <div className="mb-5">
        <div className="text-white font-semibold mb-1">{plan.name}</div>
        <div className="text-[#94A3B8] text-xs mb-3">{plan.desc}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-white text-4xl font-bold">{plan.price}</span>
          <span className="text-[#94A3B8] text-sm">{plan.period}</span>
        </div>
      </div>
      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-[#94A3B8]">
            <Check size={14} className={plan.primary ? "text-[#6366F1]" : "text-[#475569]"} />
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${plan.primary ? "bg-[#6366F1] hover:bg-[#5558E8] text-white hover:shadow-lg hover:shadow-[#6366F1]/30" : "border border-[#6366F1]/25 text-[#94A3B8] hover:text-white hover:border-[#6366F1]/50"}`}
      >
        {plan.cta}
      </button>
    </div>
  );
}
