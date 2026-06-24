type ToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export default function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-[#6366F1]" : "bg-[#334155]"}`}
      style={{ height: "22px", width: "40px" }}
    >
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}
