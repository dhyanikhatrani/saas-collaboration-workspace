import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight, Github, Chrome } from "lucide-react";
import BrandLogo from "./shared/BrandLogo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    alert("Login Successful ✅");

    navigate("/dashboard");
  } catch (error: any) {
    alert(
      error.response?.data?.message ||
      "Login Failed ❌"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B5CF6]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#06B6D4]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <BrandLogo onClick={() => navigate("/")} />
        </div>

        {/* Glass card */}
        <div className="relative rounded-2xl border border-[#6366F1]/20 overflow-hidden"
          style={{background: 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%)', backdropFilter: 'blur(20px)'}}>
          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6366F1]/60 to-transparent" />

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-white font-bold mb-2" style={{fontSize: '24px'}}>Welcome back</h1>
              <p className="text-[#94A3B8] text-sm">Sign in to your workspace</p>
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 bg-[#263148] hover:bg-[#2E3A52] border border-[#6366F1]/15 rounded-xl py-2.5 text-sm text-[#94A3B8] hover:text-white transition-all group">
                <Chrome size={16} className="group-hover:text-[#6366F1] transition-colors" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#263148] hover:bg-[#2E3A52] border border-[#6366F1]/15 rounded-xl py-2.5 text-sm text-[#94A3B8] hover:text-white transition-all group">
                <Github size={16} className="group-hover:text-white transition-colors" />
                GitHub
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#263148]" />
              <span className="text-[#475569] text-xs">or continue with email</span>
              <div className="flex-1 h-px bg-[#263148]" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[#CBD5E1] text-sm mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#CBD5E1] text-sm">Password</label>
                  <button type="button" className="text-[#6366F1] text-xs hover:text-[#8B5CF6] transition-colors">Forgot password?</button>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all pr-11"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border border-[#6366F1]/30 bg-[#263148] accent-[#6366F1]" />
                <label htmlFor="remember" className="text-[#94A3B8] text-sm">Remember me for 30 days</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6366F1] hover:bg-[#5558E8] disabled:opacity-70 text-white py-3 rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-[#6366F1]/30 flex items-center justify-center gap-2 group mt-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[#94A3B8] mt-6">
              Don't have an account?{" "}
              <button onClick={() => navigate("/register")} className="text-[#6366F1] hover:text-[#8B5CF6] font-medium transition-colors">
                Create one free
              </button>
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent" />
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {["SOC 2 Type II", "GDPR Compliant", "256-bit SSL"].map(badge => (
            <div key={badge} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[#475569] text-xs">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
