import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Compass,
  Cpu,
  GitBranch,
  Layers,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import BrandLogo from "./shared/BrandLogo";

const pillars = [
  {
    title: "Built for momentum",
    description:
      "WorkSync gives product, design, and engineering teams a single place to align without losing context.",
    icon: Sparkles,
  },
  {
    title: "Secure by default",
    description:
      "From authentication to permission boundaries, every workspace is designed to protect important work.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible by design",
    description:
      "Channels, docs, and tasks remain adaptable enough for fast-moving startups and enterprise teams alike.",
    icon: Layers,
  },
];

const stack = [
  { name: "React + TypeScript", detail: "A resilient UI foundation for fast iteration and maintainable components." },
  { name: "Tailwind CSS", detail: "A polished, responsive design system that keeps the experience consistent across devices." },
  { name: "Node.js + Express", detail: "Reliable APIs and real-time collaboration flows for modern SaaS workloads." },
  { name: "MongoDB", detail: "Flexible document storage for messages, workspaces, and collaboration history." },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Features", target: "/", scrollTo: "features" },
    { label: "Collaboration", target: "/", scrollTo: "collaboration" },
    { label: "About", target: "/about" },
    { label: "Contact", target: "/contact" },
  ];

  const handleNav = (target: string, scrollTo?: string) => {
    if (target === "/") {
      navigate(target, { state: scrollTo ? { scrollTo } : undefined });
    } else {
      navigate(target);
    }
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#6366F1]/10 bg-[#0F172A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <BrandLogo compact />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.target, link.scrollTo)}
                className="text-sm text-[#94A3B8] hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="text-sm text-[#94A3B8] hover:text-white transition-colors px-4 py-2">
              Log In
            </button>
            <button onClick={() => navigate("/register")} className="text-sm bg-[#6366F1] hover:bg-[#5558E8] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 font-medium">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-[#94A3B8]" onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#0F172A] border-t border-[#6366F1]/10 px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.target, link.scrollTo)}
                className="text-[#94A3B8] hover:text-white transition-colors text-sm text-left"
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => navigate("/login")} className="flex-1 text-sm border border-[#6366F1]/30 text-[#94A3B8] px-4 py-2 rounded-lg">
                Log In
              </button>
              <button onClick={() => navigate("/register")} className="flex-1 text-sm bg-[#6366F1] text-white px-4 py-2 rounded-lg font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-28 pb-20 px-6">
        <section className="max-w-6xl mx-auto relative overflow-hidden rounded-[32px] border border-[#6366F1]/15 bg-[#111827]/80 p-8 md:p-12 shadow-[0_25px_90px_rgba(99,102,241,0.12)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#06B6D4]/10 pointer-events-none" />
          <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#6366F1]/12 border border-[#6366F1]/20 rounded-full px-4 py-1.5 mb-6">
                <Compass size={14} className="text-[#6366F1]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#6366F1]">About WorkSync</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
                Building calmer collaboration for ambitious teams.
              </h1>
              <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                WorkSync unifies conversations, documents, and action items into one elegant workspace so teams can move from idea to execution without friction.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={() => navigate("/contact")} className="group flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] text-white px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5">
                  Contact us
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => handleNav("/", "features")} className="border border-[#6366F1]/25 text-[#94A3B8] hover:text-white hover:border-[#6366F1]/50 px-6 py-3 rounded-xl font-medium transition-all">
                  Explore features
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0F172A]/80 p-6">
              <div className="grid gap-4">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="rounded-2xl border border-[#6366F1]/10 bg-[#1E293B]/70 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
                          <Icon size={18} className="text-[#6366F1]" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-1">{pillar.title}</h3>
                          <p className="text-sm text-[#94A3B8] leading-relaxed">{pillar.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mt-20 grid lg:grid-cols-2 gap-8">
          <div className="rounded-[28px] border border-[#6366F1]/15 bg-[#111827]/80 p-8">
            <div className="inline-flex items-center gap-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full px-4 py-1.5 mb-6">
              <Target size={14} className="text-[#06B6D4]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#06B6D4]">Mission</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4">Helping teams create clarity in every conversation.</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              Our mission is to replace scattered tools and context switching with a singular operating rhythm that keeps your team productive, informed, and connected.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#8B5CF6]/15 bg-[#111827]/80 p-8">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full px-4 py-1.5 mb-6">
              <GitBranch size={14} className="text-[#8B5CF6]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#8B5CF6]">Why choose WorkSync</span>
            </div>
            <ul className="space-y-3 text-[#94A3B8] leading-relaxed">
              <li>• A modern, distraction-light experience tailored for distributed teams.</li>
              <li>• Shared spaces that keep design, product, and delivery aligned in real time.</li>
              <li>• Powerful features that are approachable from day one and ready to scale.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full px-4 py-1.5 mb-4">
              <Cpu size={14} className="text-[#6366F1]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#6366F1]">Technology stack</span>
            </div>
            <h2 className="text-3xl font-semibold text-white">Crafted with modern tools and dependable foundations.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {stack.map((item) => (
              <div key={item.name} className="rounded-[24px] border border-[#6366F1]/10 bg-[#111827]/80 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto mt-20 rounded-[32px] border border-[#06B6D4]/15 bg-gradient-to-br from-[#111827] to-[#0F172A] p-8 md:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full px-4 py-1.5 mb-5">
              <Zap size={14} className="text-[#06B6D4]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#06B6D4]">Project vision</span>
            </div>
            <h2 className="text-3xl font-semibold text-white mb-4">A brighter way to work together.</h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              We envision a future where collaboration feels intuitive, transparent, and beautifully designed — so teams can focus on outcomes instead of process overhead.
            </p>
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
