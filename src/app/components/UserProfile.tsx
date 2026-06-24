import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Zap, ArrowLeft, Camera, Check, Bell, Shield, Users,
  Globe, Palette, Key, Trash2, AlertTriangle, Eye, EyeOff,
  Smartphone, Mail, MessageSquare, BarChart3, X
} from "lucide-react";
import Toggle from "./shared/Toggle";

const TABS = [
  { id: "profile", label: "Profile", icon: Users },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const NOTIF_SETTINGS = [
  {
    section: "Messages",
    items: [
      { label: "Direct messages", desc: "Notify me of all DMs", enabled: true },
      { label: "Channel mentions", desc: "When someone @mentions me", enabled: true },
      { label: "Thread replies", desc: "When someone replies in my threads", enabled: false },
      { label: "Channel activity", desc: "New messages in joined channels", enabled: false },
    ]
  },
  {
    section: "System",
    items: [
      { label: "Security alerts", desc: "Login from new device or location", enabled: true },
      { label: "Workspace invites", desc: "When I'm invited to a workspace", enabled: true },
      { label: "Product updates", desc: "New features and announcements", enabled: false },
    ]
  }
];

const SESSIONS = [
  { device: "MacBook Pro — Chrome", location: "San Francisco, CA", time: "Active now", current: true },
  { device: "iPhone 15 Pro — Safari", location: "San Francisco, CA", time: "2 hours ago", current: false },
  { device: "Windows PC — Edge", location: "New York, NY", time: "3 days ago", current: false },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [notifs, setNotifs] = useState(
    NOTIF_SETTINGS.map(s => ({...s, items: s.items.map(i => ({...i}))}))
  );
  const [profile, setProfile] = useState({
    name: "Alex Thompson",
    title: "Senior Product Designer",
    email: "alex@company.com",
    timezone: "America/Los_Angeles",
    bio: "Building beautiful products for high-performance teams. Passionate about design systems and developer experience.",
    github: "alexthompson",
    twitter: "alexdesigns",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotif = (secIdx: number, itemIdx: number) => {
    setNotifs(prev => prev.map((s, si) => ({
      ...s,
      items: s.items.map((it, ii) => si === secIdx && ii === itemIdx ? {...it, enabled: !it.enabled} : it)
    })));
  };

  return (
    <div className="h-screen bg-[#0F172A] flex overflow-hidden text-[#F8FAFC]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0B1120] border-r border-[#6366F1]/10 flex flex-col flex-shrink-0">
        <div className="px-4 py-4 border-b border-[#6366F1]/10 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center cursor-pointer" onClick={() => navigate("/dashboard")}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm">Settings</span>
        </div>

        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 px-4 py-3 border-b border-[#6366F1]/10 text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/40 transition-colors text-sm">
          <ArrowLeft size={14} />
          Back to workspace
        </button>

        <div className="flex-1 px-3 py-4">
          <div className="text-[#475569] text-xs font-semibold uppercase tracking-wider px-2 mb-2">Account</div>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors mb-0.5 ${activeTab === tab.id ? 'bg-[#6366F1]/15 text-white' : 'text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-white'}`}>
              <tab.icon size={15} className={activeTab === tab.id ? 'text-[#6366F1]' : ''} />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}

          <div className="text-[#475569] text-xs font-semibold uppercase tracking-wider px-2 mb-2 mt-5">Workspace</div>
          {[
            { id: "members", label: "Members & Roles", icon: Users },
            { id: "integrations", label: "Integrations", icon: Globe },
            { id: "billing", label: "Billing & Plans", icon: BarChart3 },
          ].map(item => (
            <button key={item.id}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-white transition-colors mb-0.5">
              <item.icon size={15} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* User card */}
        <div className="border-t border-[#6366F1]/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">AT</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white text-sm font-medium truncate">{profile.name}</div>
              <div className="text-[#475569] text-xs truncate">{profile.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="max-w-2xl mx-auto px-8 py-10">

          {/* Profile tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-white font-bold mb-1" style={{fontSize: '22px'}}>Profile Settings</h1>
                <p className="text-[#94A3B8] text-sm">Manage your personal information and how others see you.</p>
              </div>

              {/* Avatar */}
              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Profile Photo</h3>
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">AT</span>
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#6366F1] border-2 border-[#1E293B] flex items-center justify-center hover:bg-[#5558E8] transition-colors">
                      <Camera size={12} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <button className="bg-[#6366F1]/15 hover:bg-[#6366F1]/25 border border-[#6366F1]/25 text-[#6366F1] text-sm font-medium px-4 py-2 rounded-xl transition-all mb-2 block">Upload photo</button>
                    <p className="text-[#475569] text-xs">JPG, PNG or GIF. Max 5MB.</p>
                  </div>
                </div>
              </div>

              {/* Personal info */}
              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-semibold">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#CBD5E1] text-sm mb-2">Full Name</label>
                    <input value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))}
                      className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/10 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[#CBD5E1] text-sm mb-2">Job Title</label>
                    <input value={profile.title} onChange={e => setProfile(p => ({...p, title: e.target.value}))}
                      className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/10 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#CBD5E1] text-sm mb-2">Email</label>
                  <input type="email" value={profile.email} onChange={e => setProfile(p => ({...p, email: e.target.value}))}
                    className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/10 transition-all" />
                </div>
                <div>
                  <label className="block text-[#CBD5E1] text-sm mb-2">Bio</label>
                  <textarea value={profile.bio} onChange={e => setProfile(p => ({...p, bio: e.target.value}))} rows={3}
                    className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/10 transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-[#CBD5E1] text-sm mb-2">Timezone</label>
                  <select value={profile.timezone} onChange={e => setProfile(p => ({...p, timezone: e.target.value}))}
                    className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 transition-all">
                    <option className="bg-[#1E293B]">America/Los_Angeles</option>
                    <option className="bg-[#1E293B]">America/New_York</option>
                    <option className="bg-[#1E293B]">Europe/London</option>
                    <option className="bg-[#1E293B]">Europe/Berlin</option>
                    <option className="bg-[#1E293B]">Asia/Singapore</option>
                  </select>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-semibold">Social Links</h3>
                {[
                  { label: "GitHub", icon: Key, value: profile.github, key: "github" as const, prefix: "github.com/" },
                  { label: "Twitter / X", icon: MessageSquare, value: profile.twitter, key: "twitter" as const, prefix: "x.com/" },
                ].map(field => (
                  <div key={field.label}>
                    <label className="block text-[#CBD5E1] text-sm mb-2">{field.label}</label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-[#1E293B] border border-[#6366F1]/15 border-r-0 rounded-l-xl text-[#475569] text-sm">{field.prefix}</div>
                      <input value={field.value} onChange={e => setProfile(p => ({...p, [field.key]: e.target.value}))}
                        className="flex-1 bg-[#263148] border border-[#6366F1]/15 border-l-0 rounded-r-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 transition-all" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-[#10B981] text-white' : 'bg-[#6366F1] hover:bg-[#5558E8] text-white hover:shadow-lg hover:shadow-[#6366F1]/30'}`}>
                  {saved ? <><Check size={15} /> Saved!</> : 'Save changes'}
                </button>
              </div>
            </div>
          )}

          {/* Security tab */}
          {activeTab === "security" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-white font-bold mb-1" style={{fontSize: '22px'}}>Security Settings</h1>
                <p className="text-[#94A3B8] text-sm">Manage your password, two-factor authentication, and active sessions.</p>
              </div>

              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-semibold">Change Password</h3>
                {["Current password", "New password", "Confirm new password"].map((label, i) => (
                  <div key={label}>
                    <label className="block text-[#CBD5E1] text-sm mb-2">{label}</label>
                    <div className="relative">
                      <input type={showPass ? "text" : "password"} placeholder="••••••••"
                        className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/10 transition-all pr-11" />
                      {i === 0 && (
                        <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors">
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button className="bg-[#6366F1] hover:bg-[#5558E8] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#6366F1]/30">Update password</button>
              </div>

              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">Two-Factor Authentication</h3>
                    <p className="text-[#94A3B8] text-sm mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span className="text-[#10B981] text-xs font-medium">Enabled</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Smartphone, label: "Authenticator app", desc: "Google Authenticator, Authy, or 1Password", active: true },
                    { icon: Mail, label: "Email backup codes", desc: "Receive codes at alex@company.com", active: false },
                  ].map(opt => (
                    <div key={opt.label} className="flex items-center justify-between p-3 rounded-xl bg-[#0F172A] border border-[#6366F1]/10">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${opt.active ? 'bg-[#6366F1]/20' : 'bg-[#263148]'}`}>
                          <opt.icon size={15} className={opt.active ? 'text-[#6366F1]' : 'text-[#475569]'} />
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{opt.label}</div>
                          <div className="text-[#475569] text-xs">{opt.desc}</div>
                        </div>
                      </div>
                      {opt.active ? (
                        <div className="flex items-center gap-1 text-[#10B981] text-xs"><Check size={12} /> Active</div>
                      ) : (
                        <button className="text-[#6366F1] text-xs hover:underline">Enable</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {SESSIONS.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0F172A] border border-[#6366F1]/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-medium">{s.device}</span>
                          {s.current && <span className="bg-[#6366F1]/20 text-[#6366F1] text-xs px-2 py-0.5 rounded-full">Current</span>}
                        </div>
                        <div className="text-[#475569] text-xs mt-0.5">{s.location} · {s.time}</div>
                      </div>
                      {!s.current && (
                        <button className="text-[#EF4444] text-xs hover:underline flex items-center gap-1">
                          <X size={11} /> Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger zone */}
              <div className="bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">Danger Zone</h3>
                    <p className="text-[#94A3B8] text-sm mb-4">Permanently delete your account and all associated data. This cannot be undone.</p>
                    <button className="flex items-center gap-2 border border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444]/10 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                      <Trash2 size={14} /> Delete account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications tab */}
          {activeTab === "notifications" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-white font-bold mb-1" style={{fontSize: '22px'}}>Notification Preferences</h1>
                <p className="text-[#94A3B8] text-sm">Choose when and how WorkSync notifies you.</p>
              </div>

              {notifs.map((section, secIdx) => (
                <div key={section.section} className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">{section.section}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div>
                          <div className="text-white text-sm font-medium">{item.label}</div>
                          <div className="text-[#475569] text-xs mt-0.5">{item.desc}</div>
                        </div>
                        <Toggle enabled={item.enabled} onToggle={() => toggleNotif(secIdx, itemIdx)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Quiet Hours</h3>
                <p className="text-[#94A3B8] text-sm mb-4">Suppress notifications during these hours.</p>
                <div className="grid grid-cols-2 gap-4">
                  {["Start time", "End time"].map(t => (
                    <div key={t}>
                      <label className="block text-[#CBD5E1] text-sm mb-2">{t}</label>
                      <select className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 transition-all">
                        {["10:00 PM", "11:00 PM", "12:00 AM"].map(h => <option key={h} className="bg-[#1E293B]">{h}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-[#10B981] text-white' : 'bg-[#6366F1] hover:bg-[#5558E8] text-white hover:shadow-lg hover:shadow-[#6366F1]/30'}`}>
                  {saved ? <><Check size={15} /> Saved!</> : 'Save preferences'}
                </button>
              </div>
            </div>
          )}

          {/* Appearance tab */}
          {activeTab === "appearance" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-white font-bold mb-1" style={{fontSize: '22px'}}>Appearance</h1>
                <p className="text-[#94A3B8] text-sm">Customize how WorkSync looks and feels for you.</p>
              </div>

              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Dark", active: true, preview: "bg-[#0F172A]" },
                    { name: "Darker", active: false, preview: "bg-[#060B14]" },
                    { name: "Light", active: false, preview: "bg-gray-100" },
                  ].map(theme => (
                    <button key={theme.name} className={`rounded-xl border-2 overflow-hidden transition-all ${theme.active ? 'border-[#6366F1]' : 'border-[#263148] hover:border-[#6366F1]/40'}`}>
                      <div className={`h-16 ${theme.preview} flex items-end p-2 gap-1`}>
                        <div className="w-4 bg-[#1E293B] rounded-sm h-8" />
                        <div className="flex-1 bg-[#263148] rounded-sm h-6" />
                      </div>
                      <div className="bg-[#263148] px-3 py-2 flex items-center justify-between">
                        <span className="text-white text-xs">{theme.name}</span>
                        {theme.active && <Check size={12} className="text-[#6366F1]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Accent Color</h3>
                <div className="flex gap-3">
                  {[
                    { color: "bg-[#6366F1]", name: "Indigo", active: true },
                    { color: "bg-[#8B5CF6]", name: "Violet", active: false },
                    { color: "bg-[#06B6D4]", name: "Cyan", active: false },
                    { color: "bg-[#10B981]", name: "Emerald", active: false },
                    { color: "bg-[#F59E0B]", name: "Amber", active: false },
                    { color: "bg-[#EF4444]", name: "Red", active: false },
                  ].map(c => (
                    <button key={c.name} title={c.name}
                      className={`w-8 h-8 rounded-full ${c.color} transition-all ${c.active ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1E293B] scale-110' : 'hover:scale-110'}`} />
                  ))}
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#6366F1]/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-semibold">Display Preferences</h3>
                {[
                  { label: "Compact message density", desc: "Show more messages per screen", enabled: false },
                  { label: "Animate transitions", desc: "Smooth animations throughout the app", enabled: true },
                  { label: "Show user avatars", desc: "Display avatars next to messages", enabled: true },
                ].map((pref, i) => (
                  <div key={pref.label} className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{pref.label}</div>
                      <div className="text-[#475569] text-xs mt-0.5">{pref.desc}</div>
                    </div>
                    <Toggle enabled={pref.enabled} onToggle={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`.scrollbar-hidden { scrollbar-width: none; } .scrollbar-hidden::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
