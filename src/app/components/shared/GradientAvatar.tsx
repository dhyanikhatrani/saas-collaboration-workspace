type GradientAvatarProps = {
  initials: string;
  color?: string;
  className?: string;
  textClassName?: string;
};

export default function GradientAvatar({
  initials,
  color = "from-[#6366F1] to-[#8B5CF6]",
  className = "w-9 h-9",
  textClassName = "text-xs",
}: GradientAvatarProps) {
  return (
    <div className={`${className} rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
      <span className={`text-white font-bold ${textClassName}`}>{initials}</span>
    </div>
  );
}
