import { useNavigate } from "react-router";
import { ArrowRight, Building2, Bell, Paperclip, Sparkles, UserPlus, Zap } from "lucide-react";
import PageNav from "./shared/PageNav";

export default function CollaborationPage() {
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
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles size={14} className="text-[#06B6D4]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#06B6D4]">Collaboration</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">Create spaces, invite people, and move work forward together.</h1>
              <p className="text-lg text-[#94A3B8] leading-relaxed">WorkSync keeps every conversation and decision aligned in a shared flow designed for distributed teams and fast-moving projects.</p>
            </div>

            <div className="rounded-[28px] border border-[#06B6D4]/20 bg-[#0F172A]/80 p-5 shadow-[0_25px_90px_rgba(6,182,212,0.16)]">
              <div className="rounded-[22px] border border-white/10 bg-[#111827] p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Product Launch</div>
                    <div className="text-[#475569] text-xs">3 active channels • 8 members</div>
                  </div>
                  <div className="rounded-full bg-[#10B981]/15 px-3 py-1 text-[#10B981] text-xs font-medium">Live</div>
                </div>

                <div className="rounded-2xl border border-[#6366F1]/15 bg-[#1E293B]/80 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
                    <Building2 size={15} className="text-[#6366F1]" />
                    Workspace overview
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 rounded-full bg-white/10"><div className="h-2.5 w-4/5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4]" /></div>
                    <div className="h-2.5 rounded-full bg-white/10"><div className="h-2.5 w-3/4 rounded-full bg-white/15" /></div>
                    <div className="h-2.5 rounded-full bg-white/10"><div className="h-2.5 w-2/3 rounded-full bg-white/10" /></div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#6366F1]/10 bg-[#1E293B]/70 p-4">
                    <div className="flex items-center gap-2 text-white text-sm font-medium mb-2"><UserPlus size={14} className="text-[#10B981]" /> Invites</div>
                    <div className="text-[#94A3B8] text-sm">2 pending invites waiting to join.</div>
                  </div>
                  <div className="rounded-2xl border border-[#6366F1]/10 bg-[#1E293B]/70 p-4">
                    <div className="flex items-center gap-2 text-white text-sm font-medium mb-2"><Bell size={14} className="text-[#F59E0B]" /> Alerts</div>
                    <div className="text-[#94A3B8] text-sm">Mentions and file updates are live.</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#6366F1]/10 bg-[#111827] p-4">
                  <div className="flex items-center gap-2 text-[#94A3B8] text-sm mb-3">
                    <Paperclip size={15} className="text-[#06B6D4]" />
                    Shared assets
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['Roadmap', 'Brief', 'Mockups'].map((item) => (
                      <span key={item} className="rounded-full bg-[#1E293B] border border-[#6366F1]/10 px-3 py-1 text-xs text-[#CBD5E1]">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mt-16 rounded-[28px] border border-[#8B5CF6]/15 bg-gradient-to-br from-[#111827] to-[#0F172A] p-8 md:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full px-4 py-1.5 mb-4">
                <Zap size={14} className="text-[#8B5CF6]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#8B5CF6]">Built for teams</span>
              </div>
              <h2 className="text-3xl font-semibold text-white mb-3">A collaborative workspace that keeps momentum intact.</h2>
              <p className="text-[#94A3B8] leading-relaxed">Whether you're planning launches, discussing designs, or reviewing updates, WorkSync keeps everything connected.</p>
            </div>
            <button onClick={() => navigate("/register")} className="group flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] text-white px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5">
              Start collaborating
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
