import {
  Bell,
  Building2,
  Eye,
  MessageSquare,
  Paperclip,
  ShieldCheck,
  Type,
  UserPlus,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Features", target: "features" },
  { label: "Collaboration", target: "collaboration" },
  { label: "Testimonials", target: "testimonials" },
  { label: "Pricing", target: "pricing" },
];

export const FEATURES = [
  { icon: ShieldCheck, title: "Secure JWT Authentication", desc: "Protect every workspace with reliable sign-in, token-based sessions, and secure access controls.", color: "text-[#6366F1]", bg: "bg-[#6366F1]/10" },
  { icon: Building2, title: "Workspace Management", desc: "Create, organize, and switch between spaces effortlessly for every product or team initiative.", color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
  { icon: MessageSquare, title: "Channel Collaboration", desc: "Keep conversations grouped by project, function, or launch stage so context stays in one place.", color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10" },
  { icon: UserPlus, title: "Member Invitations", desc: "Invite teammates quickly and keep new collaborators aligned from day one with shared workspace access.", color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
  { icon: MessageSquare, title: "Real-time Messaging", desc: "Send instant messages and stay close to the pulse of work across channels, direct conversations, and threads.", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
  { icon: Type, title: "Typing Indicator", desc: "Show active collaboration with live typing cues so conversations feel natural and responsive.", color: "text-[#EC4899]", bg: "bg-[#EC4899]/10" },
  { icon: Eye, title: "Read Receipts", desc: "Understand when updates are seen and keep momentum moving with clear delivery signals.", color: "text-[#14B8A6]", bg: "bg-[#14B8A6]/10" },
  { icon: Bell, title: "Smart Notifications", desc: "Stay informed with adaptive alerts for mentions, mentions, and important team activity.", color: "text-[#F97316]", bg: "bg-[#F97316]/10" },
  { icon: Paperclip, title: "File Sharing", desc: "Upload and exchange documents or assets without leaving the workspace, keeping work moving.", color: "text-[#EF4444]", bg: "bg-[#EF4444]/10" },
];

export const TESTIMONIALS = [
  { name: "Sarah Chen", role: "CTO at Veritas Labs", avatar: "SC", quote: "WorkSync replaced Slack, Notion, and three other tools for us. Our team velocity increased 40% in the first month.", stars: 5 },
  { name: "Marcus Rodriguez", role: "Head of Engineering, Meridian", avatar: "MR", quote: "The search is instant. The docs are beautiful. The integrations actually work. I've been waiting for this product for years.", stars: 5 },
  { name: "Priya Nair", role: "VP Product, Helion AI", avatar: "PN", quote: "We onboarded 200 engineers in a week. The workspace setup took 10 minutes. Migration from Slack was painless.", stars: 5 },
  { name: "James Okafor", role: "Founder, Lattice Grid", avatar: "JO", quote: "Enterprise SSO, audit logs, data residency - WorkSync had everything our security team required out of the box.", stars: 5 },
];

export const PLANS = [
  {
    name: "Starter", price: "Free", period: "", desc: "For small teams getting started",
    features: ["Up to 10 members", "10GB storage", "90-day message history", "10 integrations", "Standard support"],
    cta: "Get started free", primary: false,
  },
  {
    name: "Pro", price: "$12", period: "/user/mo", desc: "For growing teams that need more",
    features: ["Unlimited members", "1TB storage", "Unlimited history", "100+ integrations", "Priority support", "Advanced analytics", "Custom workflows"],
    cta: "Start 14-day trial", primary: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "", desc: "For large organizations",
    features: ["Everything in Pro", "SSO & SCIM", "Data residency", "SLA guarantee", "Dedicated CSM", "Custom security review", "Audit logs & compliance"],
    cta: "Talk to sales", primary: false,
  },
];

export const LOGOS = ["Stripe", "Vercel", "Linear", "Notion", "Figma", "Loom", "Retool", "Clerk"];
