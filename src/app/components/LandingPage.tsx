import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Zap, FileText,
  ChevronRight, Star, ArrowRight, Check, Menu, X,
  Layers, Sparkles
} from "lucide-react";
import { FeatureCard, PricingCard, TestimonialCard } from "./landing/LandingCards";
import {
  FEATURES as LANDING_FEATURES,
  LOGOS as LANDING_LOGOS,
  NAV_LINKS as LANDING_NAV_LINKS,
  PLANS as LANDING_PLANS,
  TESTIMONIALS as LANDING_TESTIMONIALS,
} from "./landing/data";

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#6366F1]/10 bg-[#0F172A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white">WorkSync</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {LANDING_NAV_LINKS.map(l => (
              <button key={l} className="text-[#94A3B8] hover:text-white transition-colors text-sm">{l}</button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="text-sm text-[#94A3B8] hover:text-white transition-colors px-4 py-2">Log in</button>
            <button onClick={() => navigate("/register")} className="text-sm bg-[#6366F1] hover:bg-[#5558E8] text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-[#6366F1]/25 font-medium">
              Get started
            </button>
          </div>

          <button className="md:hidden text-[#94A3B8]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#0F172A] border-t border-[#6366F1]/10 px-6 py-4 flex flex-col gap-4">
            {LANDING_NAV_LINKS.map(l => (
              <button key={l} className="text-[#94A3B8] hover:text-white transition-colors text-sm text-left">{l}</button>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => navigate("/login")} className="flex-1 text-sm border border-[#6366F1]/30 text-[#94A3B8] px-4 py-2 rounded-lg">Log in</button>
              <button onClick={() => navigate("/register")} className="flex-1 text-sm bg-[#6366F1] text-white px-4 py-2 rounded-lg font-medium">Get started</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-[#8B5CF6]/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-[#06B6D4]/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full px-4 py-1.5 mb-8">
            <Sparkles size={13} className="text-[#6366F1]" />
            <span className="text-xs text-[#6366F1] font-medium tracking-wide">Announcing WorkSync 2.0 — Now with AI co-pilot</span>
            <ChevronRight size={13} className="text-[#6366F1]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white mb-6">
            Where teams do their{" "}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              best work
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Channels, docs, and tasks — unified in one workspace. Stop context-switching.
            Start shipping. Trusted by 12,000+ teams from seed to Series D.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate("/register")}
              className="group flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] text-white px-8 py-3.5 rounded-xl font-medium transition-all hover:shadow-2xl hover:shadow-[#6366F1]/30 hover:-translate-y-0.5"
            >
              Start for free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 border border-[#6366F1]/25 text-[#94A3B8] hover:text-white hover:border-[#6366F1]/50 px-8 py-3.5 rounded-xl font-medium transition-all"
            >
              View live demo
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-[#94A3B8]">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />)}
              <span className="ml-1">4.9/5 on G2</span>
            </div>
            <div className="w-px h-4 bg-[#334155]" />
            <span>No credit card required</span>
            <div className="w-px h-4 bg-[#334155]" />
            <span>Free forever plan</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="max-w-6xl mx-auto mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10 pointer-events-none" style={{top: '60%'}} />
          <div className="rounded-2xl border border-[#6366F1]/15 overflow-hidden shadow-2xl shadow-[#6366F1]/10 bg-[#1E293B]">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0B1120] border-b border-[#6366F1]/10">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/60" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]/60" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]/60" />
              <div className="flex-1 mx-4">
                <div className="bg-[#1E293B] rounded-md px-3 py-1 text-xs text-[#94A3B8] w-48 mx-auto text-center">app.worksync.io</div>
              </div>
            </div>

            {/* Mock dashboard */}
            <div className="flex h-80 bg-[#0F172A]">
              {/* Workspace sidebar */}
              <div className="w-14 bg-[#0B1120] flex flex-col items-center py-3 gap-3 border-r border-[#6366F1]/10">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PD</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#1E293B] flex items-center justify-center">
                  <span className="text-[#94A3B8] text-xs font-bold">MK</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#1E293B] flex items-center justify-center">
                  <span className="text-[#94A3B8] text-xs font-bold">EN</span>
                </div>
              </div>

              {/* Channels sidebar */}
              <div className="w-44 bg-[#0D1829] border-r border-[#6366F1]/10 py-4 px-3 flex flex-col gap-1">
                <div className="text-xs text-[#6366F1] font-semibold px-2 mb-2 uppercase tracking-wider">Product Design</div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#6366F1]/15 text-white text-xs"># general</div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[#94A3B8] text-xs hover:bg-[#1E293B]"># announcements</div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[#94A3B8] text-xs"># hiring-queue</div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[#94A3B8] text-xs"># design-sprint</div>
                <div className="mt-3 text-xs text-[#94A3B8] px-2 font-medium">ONLINE — 3</div>
                {["Sarah Chen", "Marcus R.", "Elena V."].map(n => (
                  <div key={n} className="flex items-center gap-2 px-2 py-1">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-xs text-[#94A3B8]">{n}</span>
                  </div>
                ))}
              </div>

              {/* Chat area */}
              <div className="flex-1 flex flex-col">
                <div className="px-5 py-3 border-b border-[#6366F1]/10 flex items-center gap-2">
                  <span className="text-white text-sm font-medium"># general</span>
                  <span className="text-[#94A3B8] text-xs ml-2">12 members</span>
                </div>
                <div className="flex-1 px-5 py-4 flex flex-col gap-4 overflow-hidden">
                  {[
                    { user: "Sarah Chen", avatar: "SC", msg: "Just pushed the new design tokens to Figma — take a look!", time: "10:23 AM", color: "from-[#6366F1] to-[#8B5CF6]" },
                    { user: "Marcus R.", avatar: "MR", msg: "Looks great! The indigo palette works much better with the dark backgrounds.", time: "10:26 AM", color: "from-[#06B6D4] to-[#6366F1]" },
                    { user: "Elena V.", avatar: "EV", msg: "Should we schedule a design review for Thursday? @team", time: "10:31 AM", color: "from-[#8B5CF6] to-[#EC4899]" },
                  ].map(m => (
                    <div key={m.user} className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{m.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-white text-xs font-semibold">{m.user}</span>
                          <span className="text-[#475569] text-xs">{m.time}</span>
                        </div>
                        <p className="text-[#94A3B8] text-xs leading-relaxed">{m.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mx-5 mb-4 flex items-center gap-3 bg-[#1E293B] rounded-xl px-4 py-2.5 border border-[#6366F1]/15">
                  <span className="text-[#475569] text-xs flex-1">Message #general</span>
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded bg-[#263148] flex items-center justify-center"><span className="text-[#94A3B8] text-xs">@</span></div>
                    <div className="w-5 h-5 rounded bg-[#263148] flex items-center justify-center"><span className="text-[#94A3B8] text-xs">😊</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by logos */}
      <section className="py-16 px-6 border-y border-[#6366F1]/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-[#475569] uppercase tracking-widest mb-10">Trusted by teams at world-class companies</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {LANDING_LOGOS.map(logo => (
              <span key={logo} className="text-[#475569] hover:text-[#94A3B8] transition-colors font-semibold tracking-tight text-lg cursor-default">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full px-4 py-1.5 mb-6">
              <Layers size={13} className="text-[#6366F1]" />
              <span className="text-xs text-[#6366F1] font-medium">Built for modern teams</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">Everything your team needs,<br />finally in one place</h2>
            <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">No more context switching. WorkSync brings messages, docs, and tasks into a unified workspace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANDING_FEATURES.map(f => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Product showcase */}
      <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full px-4 py-1.5 mb-6">
                <FileText size={13} className="text-[#06B6D4]" />
                <span className="text-xs text-[#06B6D4] font-medium">Document Collaboration</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-5 leading-tight tracking-tight">Docs that live<br />where work happens</h2>
              <p className="text-[#94A3B8] leading-relaxed mb-8">Create, edit, and share rich documents without leaving your workspace. Real-time co-editing, inline comments, and version history — all woven into your channels.</p>
              <ul className="space-y-3">
                {["Block-based editor with 30+ content types", "Real-time multi-cursor collaboration", "AI writing assistant built-in", "Embed charts, tables, and code blocks"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                    <div className="w-5 h-5 rounded-full bg-[#06B6D4]/15 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#06B6D4]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate("/documents")} className="mt-8 flex items-center gap-2 text-[#06B6D4] text-sm font-medium hover:gap-3 transition-all">
                Explore docs <ArrowRight size={15} />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#06B6D4]/15 bg-[#1E293B] p-5 shadow-2xl shadow-[#06B6D4]/5">
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/15 flex items-center justify-center"><FileText size={15} className="text-[#06B6D4]" /></div>
                  <div>
                    <div className="text-white text-sm font-medium">Q3 Product Roadmap</div>
                    <div className="text-[#475569] text-xs">Last edited 2 minutes ago</div>
                  </div>
                  <div className="ml-auto flex -space-x-1">
                    {["SC", "MR", "EV"].map((a, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full border-2 border-[#1E293B] flex items-center justify-center bg-gradient-to-br ${i === 0 ? 'from-[#6366F1] to-[#8B5CF6]' : i === 1 ? 'from-[#06B6D4] to-[#6366F1]' : 'from-[#8B5CF6] to-[#EC4899]'}`}>
                        <span className="text-white text-xs font-bold" style={{fontSize: '8px'}}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Doc content preview */}
                <div className="bg-[#0F172A] rounded-xl p-4 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                  <div className="h-3 bg-white/5 rounded w-4/6" />
                  <div className="mt-4 h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-3/4" />
                </div>
                <div className="flex gap-2 mt-3">
                  <div className="bg-[#6366F1]/15 text-[#6366F1] text-xs rounded px-2 py-1">In Progress</div>
                  <div className="bg-[#10B981]/15 text-[#10B981] text-xs rounded px-2 py-1">Q3 2026</div>
                  <div className="bg-[#F59E0B]/15 text-[#F59E0B] text-xs rounded px-2 py-1">Engineering</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Loved by teams worldwide</h2>
            <p className="text-[#94A3B8]">Don't take our word for it — hear from the teams shipping with WorkSync.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {LANDING_TESTIMONIALS.map(t => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-[#94A3B8]">Start free, scale as you grow. No hidden fees, no surprises.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LANDING_PLANS.map(plan => (
              <PricingCard
                key={plan.name}
                plan={plan}
                onSelect={() => navigate(plan.name === "Enterprise" ? "/" : "/register")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366F1]/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">Ready to transform<br />how your team works?</h2>
          <p className="text-[#94A3B8] text-lg mb-10">Join 12,000+ teams already using WorkSync to move faster and communicate better.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="group flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] text-white px-8 py-4 rounded-xl font-medium text-lg transition-all hover:shadow-2xl hover:shadow-[#6366F1]/30 hover:-translate-y-0.5"
            >
              Get started for free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[#475569] text-sm">No credit card · Free forever plan</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#6366F1]/10 py-12 px-6 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <Zap size={13} className="text-white" />
                </div>
                <span className="font-semibold text-white">WorkSync</span>
              </div>
              <p className="text-[#475569] text-xs leading-relaxed">The modern workspace for high-performance teams.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
              { title: "Connect", links: ["Twitter", "GitHub", "Discord", "LinkedIn"] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-white text-sm font-medium mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l}><button className="text-[#475569] hover:text-[#94A3B8] text-sm transition-colors">{l}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#6366F1]/10 gap-4">
            <p className="text-[#475569] text-xs">© 2026 WorkSync, Inc. All rights reserved.</p>
            <div className="flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#10B981] text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
