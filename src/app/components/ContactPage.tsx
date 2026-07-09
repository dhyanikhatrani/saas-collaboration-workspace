import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import PageNav from "./shared/PageNav";

const contactCards = [
  { icon: Mail, title: "Email", value: "hello@worksync.io", detail: "For product questions and partnerships" },
  { icon: MapPin, title: "Location", value: "Remote-first, worldwide", detail: "We support distributed teams across time zones" },
  { icon: Phone, title: "Phone", value: "+1 (800) 555-0199", detail: "Mon–Fri • 9:00 to 18:00 UTC" },
];

const faqs = [
  {
    question: "Do you offer a free trial?",
    answer: "Yes. Teams can get started with a free plan and explore the core workspace experience before upgrading.",
  },
  {
    question: "Can WorkSync support enterprise security needs?",
    answer: "Absolutely. We support secure workflows, permissions, and collaboration practices suited to larger organizations.",
  },
  {
    question: "How quickly can we onboard?",
    answer: "Most teams are up and running in a single session, with guided setup and a polished first-run experience.",
  },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const links = [
    { label: "About", href: "/about" },
    { label: "Collaboration", href: "/collaboration" },
    { label: "Features", href: "/features" },
    { label: "Contact", href: "/contact" },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        nextErrors[key] = "This field is required.";
      }
    });

    if (!formData.email.trim()) {
      nextErrors.email = "This field is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit contact form.");
      }

      toast.success("Thank you! Your message has been submitted successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] overflow-x-hidden">
      <PageNav links={links} />

      <main className="pt-28 pb-20 px-6">
        <section className="max-w-6xl mx-auto relative overflow-hidden rounded-[32px] border border-[#6366F1]/15 bg-[#111827]/80 p-8 md:p-12 shadow-[0_25px_90px_rgba(99,102,241,0.12)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#06B6D4]/10 pointer-events-none" />
          <div className="relative z-10 grid lg:grid-cols-[1fr_0.95fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#6366F1]/12 border border-[#6366F1]/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles size={14} className="text-[#6366F1]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#6366F1]">Contact WorkSync</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
                Let’s build a more connected way to work.
              </h1>
              <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                Share your goals, explore the product, or ask a question. We’re happy to help teams shape a workspace that fits their workflow.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0F172A]/80 p-6">
              <div className="grid gap-4">
                {contactCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="rounded-2xl border border-[#6366F1]/10 bg-[#1E293B]/70 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
                          <Icon size={18} className="text-[#6366F1]" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-1">{card.title}</h3>
                          <p className="text-sm text-white">{card.value}</p>
                          <p className="text-sm text-[#94A3B8]">{card.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mt-20 grid lg:grid-cols-[0.95fr_1.05fr] gap-8">
          <div className="rounded-[28px] border border-[#6366F1]/15 bg-[#111827]/80 p-8">
            <div className="inline-flex items-center gap-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full px-4 py-1.5 mb-6">
              <MessageCircleMore size={14} className="text-[#06B6D4]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#06B6D4]">Send a message</span>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#94A3B8] block mb-2">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#6366F1]/15 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-[#6366F1]"
                    placeholder="Alex Morgan"
                  />
                  {errors.name ? <p className="mt-2 text-sm text-[#F87171]">{errors.name}</p> : null}
                </div>
                <div>
                  <label className="text-sm text-[#94A3B8] block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#6366F1]/15 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-[#6366F1]"
                    placeholder="alex@company.com"
                  />
                  {errors.email ? <p className="mt-2 text-sm text-[#F87171]">{errors.email}</p> : null}
                </div>
              </div>
              <div>
                <label className="text-sm text-[#94A3B8] block mb-2">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#6366F1]/15 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-[#6366F1]"
                  placeholder="Demo request"
                />
                {errors.subject ? <p className="mt-2 text-sm text-[#F87171]">{errors.subject}</p> : null}
              </div>
              <div>
                <label className="text-sm text-[#94A3B8] block mb-2">Message</label>
                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#6366F1]/15 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-[#6366F1]"
                  placeholder="Tell us about your team and what you want to build."
                />
                {errors.message ? <p className="mt-2 text-sm text-[#F87171]">{errors.message}</p> : null}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] text-white px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting ? <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /> : null}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-[#8B5CF6]/15 bg-[#111827]/80 p-8">
              <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full px-4 py-1.5 mb-5">
                <ShieldCheck size={14} className="text-[#8B5CF6]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#8B5CF6]">Support at every step</span>
              </div>
              <p className="text-[#94A3B8] leading-relaxed">
                Whether you’re evaluating WorkSync or scaling an existing rollout, our team is ready to help with onboarding, migration, and product guidance.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#CBD5E1]">
                <Clock3 size={16} className="text-[#6366F1]" />
                <span>Average response time: under 24 hours</span>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#6366F1]/15 bg-[#111827]/80 p-8">
              <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full px-4 py-1.5 mb-6">
                <Zap size={14} className="text-[#6366F1]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#6366F1]">Frequently asked questions</span>
              </div>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-[#6366F1]/10 bg-[#0F172A]/70 p-4">
                    <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Toaster richColors closeButton position="top-right" />

      <footer className="border-t border-[#6366F1]/10 py-8 px-6 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#475569]">
          <p>© 2026 WorkSync. Designed for modern teams.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate("/about")} className="hover:text-white transition-colors">About</button>
            <button onClick={() => navigate("/contact")} className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
