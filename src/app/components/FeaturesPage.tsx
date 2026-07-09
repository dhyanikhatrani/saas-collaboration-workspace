import { useNavigate } from "react-router";
import { ArrowRight, Layers, Sparkles, Zap } from "lucide-react";
import { FeatureCard } from "./landing/LandingCards";
import { FEATURES as LANDING_FEATURES } from "./landing/data";
import PageNav from "./shared/PageNav";

export default function FeaturesPage() {
  const navigate = useNavigate();

  const links = [
    { label: "About", href: "/about" },
    { label: "Collaboration", href: "/collaboration" },
    { label: "Features", href: "/features" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] overflow-x-hidden">
      <PageNav links={links} />

      <main className="pt-28 pb-20 px-6">
        <section className="max-w-6xl mx-auto rounded-[32px] border border-[#6366F1]/15 bg-[#111827]/80 p-8 md:p-12 shadow-[0_25px_90px_rgba(99,102,241,0.12)]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={14} className="text-[#6366F1]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#6366F1]">Features</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">Everything your team needs to work with clarity.</h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed">From secure access to real-time collaboration, WorkSync brings every essential workflow into one focused workspace.</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
            {LANDING_FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto mt-16 rounded-[28px] border border-[#06B6D4]/15 bg-gradient-to-br from-[#111827] to-[#0F172A] p-8 md:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full px-4 py-1.5 mb-4">
                <Layers size={14} className="text-[#06B6D4]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#06B6D4]">Designed for momentum</span>
              </div>
              <h2 className="text-3xl font-semibold text-white mb-3">A polished experience that scales with your team.</h2>
              <p className="text-[#94A3B8] leading-relaxed">WorkSync brings structure to fast-moving teams without making everyday collaboration feel heavy or rigid.</p>
            </div>
            <button onClick={() => navigate("/register")} className="group flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] text-white px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5">
              Get started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#6366F1]/10 py-8 px-6 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#475569]">
          <p>© 2026 WorkSync. Designed for modern teams.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate("/about")} className="hover:text-white transition-colors">About</button>
            <button onClick={() => navigate("/contact")} className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
