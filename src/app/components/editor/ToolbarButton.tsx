import type { LucideIcon } from "lucide-react";

type ToolbarButtonProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
};

export default function ToolbarButton({ icon: Icon, label, active }: ToolbarButtonProps) {
  return (
    <button
      title={label}
      className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${active ? "bg-[#6366F1]/20 text-[#6366F1]" : "hover:bg-[#263148] text-[#94A3B8] hover:text-white"}`}
    >
      <Icon size={14} />
    </button>
  );
}
