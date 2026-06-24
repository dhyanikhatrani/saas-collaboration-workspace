import {
  BarChart3,
  FileText,
  Globe,
  MessageSquare,
  Puzzle,
  Shield,
} from "lucide-react";

export const NAV_LINKS = ["Features", "Pricing", "Enterprise", "Blog", "Changelog"];

export const FEATURES = [
  { icon: MessageSquare, title: "Real-time Messaging", desc: "Instant channels, threads, and DMs with 99.99% uptime SLA. Search across your entire history in milliseconds.", color: "text-[#6366F1]", bg: "bg-[#6366F1]/10" },
  { icon: FileText, title: "Document Collaboration", desc: "Notion-style docs embedded directly in your workspace. Co-edit with your team in real time, no tab switching.", color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
  { icon: BarChart3, title: "Analytics & Insights", desc: "Understand team engagement, channel activity, and productivity trends with beautiful dashboards.", color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10" },
  { icon: Puzzle, title: "500+ Integrations", desc: "Connect GitHub, Jira, Figma, Notion, Salesforce and every tool your team already loves.", color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 Type II, GDPR, SSO, SCIM provisioning, and audit logs. Security that enterprises trust.", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
  { icon: Globe, title: "Global Infrastructure", desc: "Deployed across 18 regions worldwide with end-to-end encryption and data residency controls.", color: "text-[#EF4444]", bg: "bg-[#EF4444]/10" },
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
