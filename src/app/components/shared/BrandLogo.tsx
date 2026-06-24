import { Zap } from "lucide-react";

type BrandLogoProps = {
  compact?: boolean;
  onClick?: () => void;
};

export default function BrandLogo({ compact = false, onClick }: BrandLogoProps) {
  const iconSize = compact ? "w-7 h-7" : "w-10 h-10";

  return (
    <div className="flex items-center gap-2.5 cursor-pointer" onClick={onClick}>
      <div className={`${iconSize} rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#6366F1]/30`}>
        <Zap size={compact ? 13 : 18} className="text-white" />
      </div>
      <span className={`${compact ? "font-semibold" : "text-xl font-bold"} text-white tracking-tight`}>
        WorkSync
      </span>
    </div>
  );
}
