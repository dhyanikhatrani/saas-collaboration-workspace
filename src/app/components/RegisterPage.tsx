import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router";
import { Zap, Eye, EyeOff, ArrowRight, Github, Chrome, Check } from "lucide-react";

const STEPS = ["Account", "Workspace", "Invite"];

const BENEFITS = [
  "Real-time messaging & threads",
  "Notion-style document editor",
  "500+ app integrations",
  "Advanced analytics dashboard",
  "SOC 2 compliant & GDPR ready",
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", workspace: "", size: "" });
  const [loading, setLoading] = useState(false);

  const handleNext = async (e: React.FormEvent) => {
  e.preventDefault();

  if (step < 2) {
    setStep((s) => s + 1);
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name: form.name,
        email: form.email,
        password: form.password,
      }
    );

    console.log(res.data);

    alert("Registration Successful ✅");

    navigate("/login");
  } catch (error: any) {
    alert(
      error.response?.data?.message ||
      "Registration Failed ❌"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0F172A] flex relative overflow-hidden">
      {/* Left panel */}
      <div className="hidden lg:flex w-2/5 bg-gradient-to-br from-[#0B1120] to-[#0F172A] border-r border-[#6366F1]/10 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.04]" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, #6366F1 0%, transparent 60%)'}} />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 cursor-pointer mb-16" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#6366F1]/30">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">WorkSync</span>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">Everything your team needs to move fast</h2>
            <p className="text-[#94A3B8] leading-relaxed">Join 12,000+ teams that replaced 5 tools with WorkSync and never looked back.</p>
          </div>

          <ul className="space-y-3">
            {BENEFITS.map(b => (
              <li key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-[#6366F1]" />
                </div>
                <span className="text-[#CBD5E1] text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10">
          <div className="bg-[#1E293B]/60 rounded-2xl border border-[#6366F1]/15 p-5 backdrop-blur-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full" style={{background: '#F59E0B'}} />)}
            </div>
            <p className="text-[#CBD5E1] text-sm leading-relaxed mb-4">"We cut our tool subscriptions from 8 down to 2. WorkSync is the only workspace platform that actually gets our workflow."</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                <span className="text-white text-xs font-bold">LK</span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">Lena Kovacs</div>
                <div className="text-[#475569] text-xs">COO, Apex Systems</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Background glows */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#6366F1]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#8B5CF6]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold text-white">WorkSync</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${i < step ? 'bg-[#6366F1] text-white' : i === step ? 'bg-[#6366F1] text-white ring-2 ring-[#6366F1]/30' : 'bg-[#263148] text-[#475569]'}`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-sm ${i === step ? 'text-white font-medium' : 'text-[#475569]'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px w-8 mx-1 ${i < step ? 'bg-[#6366F1]/50' : 'bg-[#263148]'}`} />}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#6366F1]/20 overflow-hidden"
            style={{background: 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%)', backdropFilter: 'blur(20px)'}}>
            <div className="h-px bg-gradient-to-r from-transparent via-[#6366F1]/60 to-transparent" />

            <div className="p-8">
              {step === 0 && (
                <>
                  <div className="mb-7">
                    <h1 className="text-white font-bold mb-1" style={{fontSize: '22px'}}>Create your account</h1>
                    <p className="text-[#94A3B8] text-sm">Free forever, no credit card required</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <button className="flex items-center justify-center gap-2 bg-[#263148] hover:bg-[#2E3A52] border border-[#6366F1]/15 rounded-xl py-2.5 text-sm text-[#94A3B8] hover:text-white transition-all">
                      <Chrome size={16} /> Google
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-[#263148] hover:bg-[#2E3A52] border border-[#6366F1]/15 rounded-xl py-2.5 text-sm text-[#94A3B8] hover:text-white transition-all">
                      <Github size={16} /> GitHub
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-[#263148]" />
                    <span className="text-[#475569] text-xs">or with email</span>
                    <div className="flex-1 h-px bg-[#263148]" />
                  </div>

                  <form onSubmit={handleNext} className="space-y-4">
                    <div>
                      <label className="block text-[#CBD5E1] text-sm mb-2">Full name</label>
                      <input type="text" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Alex Thompson" required
                        className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[#CBD5E1] text-sm mb-2">Work email</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="alex@company.com" required
                        className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[#CBD5E1] text-sm mb-2">Password</label>
                      <div className="relative">
                        <input type={showPass ? "text" : "password"} value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} placeholder="Min. 8 characters" required minLength={8}
                          className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all pr-11" />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors">
                          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-[#6366F1] hover:bg-[#5558E8] text-white py-3 rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-[#6366F1]/30 flex items-center justify-center gap-2 group mt-2">
                      Continue <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </form>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="mb-7">
                    <h1 className="text-white font-bold mb-1" style={{fontSize: '22px'}}>Set up your workspace</h1>
                    <p className="text-[#94A3B8] text-sm">This is where your team will collaborate</p>
                  </div>
                  <form onSubmit={handleNext} className="space-y-4">
                    <div>
                      <label className="block text-[#CBD5E1] text-sm mb-2">Workspace name</label>
                      <input type="text" value={form.workspace} onChange={e => setForm(f => ({...f, workspace: e.target.value}))} placeholder="e.g. Acme Marketing, Design Team" required
                        className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[#CBD5E1] text-sm mb-2">Team size</label>
                      <select value={form.size} onChange={e => setForm(f => ({...f, size: e.target.value}))} required
                        className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all">
                        <option value="" className="bg-[#1E293B]">Select size</option>
                        <option value="1-5" className="bg-[#1E293B]">1–5 people</option>
                        <option value="6-25" className="bg-[#1E293B]">6–25 people</option>
                        <option value="26-100" className="bg-[#1E293B]">26–100 people</option>
                        <option value="101-500" className="bg-[#1E293B]">101–500 people</option>
                        <option value="500+" className="bg-[#1E293B]">500+ people</option>
                      </select>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button type="button" onClick={() => setStep(0)} className="flex-1 border border-[#6366F1]/25 text-[#94A3B8] hover:text-white py-3 rounded-xl text-sm font-medium transition-all">Back</button>
                      <button type="submit" className="flex-1 bg-[#6366F1] hover:bg-[#5558E8] text-white py-3 rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-[#6366F1]/30 flex items-center justify-center gap-2 group">
                        Continue <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </form>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mb-7">
                    <h1 className="text-white font-bold mb-1" style={{fontSize: '22px'}}>Invite your team</h1>
                    <p className="text-[#94A3B8] text-sm">WorkSync is better with your whole team</p>
                  </div>
                  <form onSubmit={handleNext} className="space-y-4">
                    <div>
                      <label className="block text-[#CBD5E1] text-sm mb-2">Invite teammates by email</label>
                      <textarea placeholder="sarah@company.com, john@company.com, ..." rows={4}
                        className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all resize-none" />
                      <p className="text-[#475569] text-xs mt-1">Separate emails with commas. You can also invite people later.</p>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 border border-[#6366F1]/25 text-[#94A3B8] hover:text-white py-3 rounded-xl text-sm font-medium transition-all">Back</button>
                      <button type="submit" disabled={loading} className="flex-1 bg-[#6366F1] hover:bg-[#5558E8] disabled:opacity-70 text-white py-3 rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-[#6366F1]/30 flex items-center justify-center gap-2 group">
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Launch workspace <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" /></>}
                      </button>
                    </div>
                    <button type="button" onClick={() => navigate("/dashboard")} className="w-full text-[#475569] hover:text-[#94A3B8] text-sm transition-colors">Skip for now</button>
                  </form>
                </>
              )}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent" />
          </div>

          <p className="text-center text-sm text-[#94A3B8] mt-6">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-[#6366F1] hover:text-[#8B5CF6] font-medium transition-colors">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
