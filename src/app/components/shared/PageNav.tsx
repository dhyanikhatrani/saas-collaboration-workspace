import { useState } from "react";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";

type NavLink = {
  label: string;
  href: string;
};

type PageNavProps = {
  links: NavLink[];
};

export default function PageNav({ links }: PageNavProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#6366F1]/10 bg-[#0F172A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <BrandLogo compact />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button key={link.label} onClick={() => navigate(link.href)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => navigate("/login")} className="text-sm text-[#94A3B8] hover:text-white transition-colors px-4 py-2">Log In</button>
          <button onClick={() => navigate("/register")} className="text-sm bg-[#6366F1] hover:bg-[#5558E8] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 font-medium">Get Started</button>
        </div>

        <button className="md:hidden text-[#94A3B8]" onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-[#6366F1]/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button key={link.label} onClick={() => navigate(link.href)} className="text-[#94A3B8] hover:text-white transition-colors text-sm text-left">
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={() => navigate("/login")} className="flex-1 text-sm border border-[#6366F1]/30 text-[#94A3B8] px-4 py-2 rounded-lg">Log In</button>
            <button onClick={() => navigate("/register")} className="flex-1 text-sm bg-[#6366F1] text-white px-4 py-2 rounded-lg font-medium">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
}
