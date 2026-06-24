import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Zap, ArrowLeft, MoreHorizontal, Share2, Star, Clock,
  Bold, Italic, Underline, Link, List, Code, Type,
  Hash, Image, Table, Columns, Users, MessageSquare,
  ChevronRight, Plus, FileText, Check, Eye
} from "lucide-react";
import ToolbarButton from "./editor/ToolbarButton";

const DOCS = [
  { id: "1", title: "Q3 Product Roadmap", emoji: "🗺️", updated: "2 minutes ago", editors: ["SC", "MR", "EV"] },
  { id: "2", title: "Design System Guidelines", emoji: "🎨", updated: "1 hour ago", editors: ["SC", "AP"] },
  { id: "3", title: "Engineering RFC: Auth Flow", emoji: "⚙️", updated: "3 hours ago", editors: ["MR", "EV"] },
  { id: "4", title: "Sprint Retrospective — June", emoji: "📋", updated: "Yesterday", editors: ["DM", "SC", "MR"] },
  { id: "5", title: "Onboarding Flow v3", emoji: "🚀", updated: "2 days ago", editors: ["AP"] },
];

const ACTIVITY = [
  { user: "Sarah Chen", avatar: "SC", color: "from-[#6366F1] to-[#8B5CF6]", action: "edited the introduction", time: "2m ago" },
  { user: "Marcus Rodriguez", avatar: "MR", color: "from-[#06B6D4] to-[#6366F1]", action: "added a table in Section 3", time: "15m ago" },
  { user: "Elena Vasquez", avatar: "EV", color: "from-[#8B5CF6] to-[#EC4899]", action: "resolved 2 comments", time: "1h ago" },
  { user: "David Miller", avatar: "DM", color: "from-[#10B981] to-[#06B6D4]", action: "created this document", time: "Yesterday" },
];

const BLOCKS = [
  { type: "h1", content: "Q3 Product Roadmap" },
  { type: "p", content: "This document outlines the key initiatives, milestones, and deliverables for the third quarter of 2026. All teams should align their sprint planning around these priorities." },
  { type: "h2", content: "🎯 Goals & OKRs" },
  { type: "p", content: "Our primary focus this quarter is to ship the redesigned dashboard experience, improve performance by 40%, and expand into 3 new market segments." },
  { type: "callout", content: "Key deadline: Design handoff by June 30. Engineering complete by July 25. Launch: August 1st." },
  { type: "h2", content: "📦 Feature Releases" },
  { type: "li", content: "WorkSync 2.0 — AI co-pilot integration" },
  { type: "li", content: "Advanced analytics dashboard with real-time metrics" },
  { type: "li", content: "Document collaboration v2 with inline comments" },
  { type: "li", content: "Workspace-level audit logs (Enterprise)" },
  { type: "h2", content: "👥 Team Assignments" },
  { type: "p", content: "Each initiative has a directly responsible individual (DRI). Cross-functional collaboration is expected and should be coordinated via the #product-design and #engineering channels." },
];

export default function DocumentEditor() {
  const navigate = useNavigate();
  const [activeDoc, setActiveDoc] = useState("1");
  const [starred, setStarred] = useState(false);
  const [blocks, setBlocks] = useState(BLOCKS);
  const [editingBlock, setEditingBlock] = useState<number | null>(null);
  const [showCollab, setShowCollab] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);

  const doc = DOCS.find(d => d.id === activeDoc)!;

  return (
    <div className="h-screen bg-[#0F172A] flex overflow-hidden text-[#F8FAFC]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0B1120] border-r border-[#6366F1]/10 flex flex-col flex-shrink-0">
        {/* Header */}
        <div className="px-4 py-4 border-b border-[#6366F1]/10 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center cursor-pointer" onClick={() => navigate("/dashboard")}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm flex-1">WorkSync Docs</span>
        </div>

        {/* Back to dashboard */}
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 px-4 py-3 border-b border-[#6366F1]/10 text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/40 transition-colors text-sm">
          <ArrowLeft size={14} />
          Back to workspace
        </button>

        {/* New doc button */}
        <div className="px-3 py-3">
          <button className="w-full flex items-center gap-2 bg-[#6366F1]/15 hover:bg-[#6366F1]/25 border border-[#6366F1]/25 rounded-xl px-3 py-2 text-[#6366F1] text-sm font-medium transition-all">
            <Plus size={15} />
            New document
          </button>
        </div>

        {/* Doc list */}
        <div className="flex-1 overflow-y-auto px-2 scrollbar-hidden">
          <div className="px-2 py-1.5 text-[#475569] text-xs font-semibold uppercase tracking-wider">Recent Documents</div>
          {DOCS.map(d => (
            <button key={d.id} onClick={() => setActiveDoc(d.id)}
              className={`w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors mb-0.5 ${activeDoc === d.id ? 'bg-[#6366F1]/15 text-white' : 'text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-white'}`}>
              <span className="text-base flex-shrink-0">{d.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium truncate">{d.title}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={10} className="text-[#475569]" />
                  <span className="text-[#475569] text-xs">{d.updated}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Profile at bottom */}
        <div className="border-t border-[#6366F1]/10 p-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-[#1E293B]/60 cursor-pointer" onClick={() => navigate("/profile")}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">ME</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white text-xs font-medium">Alex Thompson</div>
              <div className="text-[#475569] text-xs">Admin</div>
            </div>
            <Settings size={13} className="text-[#475569]" />
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-12 border-b border-[#6366F1]/10 flex items-center px-5 gap-4 flex-shrink-0 bg-[#0F172A]">
          {/* Formatting tools */}
          <div className="flex items-center gap-0.5 border-r border-[#263148] pr-4">
            <ToolbarButton icon={Bold} label="Bold" />
            <ToolbarButton icon={Italic} label="Italic" />
            <ToolbarButton icon={Underline} label="Underline" />
            <ToolbarButton icon={Link} label="Link" />
          </div>
          <div className="flex items-center gap-0.5 border-r border-[#263148] pr-4">
            <ToolbarButton icon={Type} label="Heading" />
            <ToolbarButton icon={List} label="List" />
            <ToolbarButton icon={Code} label="Code" />
          </div>
          <div className="flex items-center gap-0.5 border-r border-[#263148] pr-4">
            <ToolbarButton icon={Image} label="Image" />
            <ToolbarButton icon={Table} label="Table" />
            <ToolbarButton icon={Columns} label="Columns" />
          </div>

          <div className="flex-1" />

          {/* Collaborators */}
          <div className="flex -space-x-1.5">
            {["SC", "MR", "EV"].map((a, i) => (
              <div key={i} className={`w-7 h-7 rounded-full border-2 border-[#0F172A] flex items-center justify-center bg-gradient-to-br ${i === 0 ? 'from-[#6366F1] to-[#8B5CF6]' : i === 1 ? 'from-[#06B6D4] to-[#6366F1]' : 'from-[#8B5CF6] to-[#EC4899]'}`}>
                <span className="text-white font-bold" style={{fontSize: '9px'}}>{a}</span>
              </div>
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-[#0F172A] bg-[#263148] flex items-center justify-center">
              <span className="text-[#94A3B8] text-xs">+2</span>
            </div>
          </div>

          <div className="relative">
            <button onClick={() => setShareOpen(!shareOpen)} className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:shadow-lg hover:shadow-[#6366F1]/30">
              <Share2 size={12} />
              Share
            </button>
            {shareOpen && (
              <div className="absolute right-0 top-9 w-72 bg-[#1E293B] border border-[#6366F1]/20 rounded-xl shadow-2xl shadow-black/40 z-50 p-4">
                <h4 className="text-white font-semibold text-sm mb-3">Share document</h4>
                <input placeholder="Invite by email…" className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-lg px-3 py-2 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 mb-3" />
                <div className="space-y-2 mb-3">
                  {["Anyone with link can view", "Anyone with link can edit"].map((opt, i) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="share" defaultChecked={i === 0} className="accent-[#6366F1]" />
                      <span className="text-[#94A3B8] text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                <button className="w-full bg-[#6366F1] hover:bg-[#5558E8] text-white text-sm py-2 rounded-lg transition-colors" onClick={() => setShareOpen(false)}>
                  Copy link
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setShowCollab(!showCollab)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${showCollab ? 'bg-[#6366F1]/15 text-[#6366F1]' : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'}`}>
            <Users size={14} />
          </button>
          <button className="w-8 h-8 rounded-lg bg-[#1E293B] hover:bg-[#263148] flex items-center justify-center transition-colors">
            <Eye size={14} className="text-[#94A3B8]" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Doc content */}
          <div className="flex-1 overflow-y-auto scrollbar-hidden">
            <div className="max-w-3xl mx-auto px-8 py-12">
              {/* Doc header */}
              <div className="mb-10">
                <div className="flex items-center gap-2 text-[#475569] text-sm mb-4">
                  <button onClick={() => navigate("/dashboard")} className="hover:text-[#94A3B8] transition-colors">Product Design</button>
                  <ChevronRight size={14} />
                  <span className="text-[#94A3B8]">Documents</span>
                  <ChevronRight size={14} />
                  <span className="text-white">{doc.title}</span>
                </div>

                <div className="text-5xl mb-6">🗺️</div>

                <div className="flex items-center gap-3 mb-3">
                  <input
                    defaultValue={doc.title}
                    className="flex-1 bg-transparent text-white font-bold focus:outline-none placeholder-[#475569]"
                    style={{fontSize: '2.25rem', lineHeight: '1.2'}}
                  />
                  <button onClick={() => setStarred(!starred)} className={`p-1 rounded-lg transition-colors ${starred ? 'text-[#F59E0B]' : 'text-[#475569] hover:text-[#94A3B8]'}`}>
                    <Star size={18} className={starred ? 'fill-[#F59E0B]' : ''} />
                  </button>
                  <button className="text-[#475569] hover:text-[#94A3B8] transition-colors p-1">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-[#475569]">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>Last edited {doc.updated}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye size={13} />
                    <span>142 views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={13} />
                    <span>8 comments</span>
                  </div>
                </div>
              </div>

              {/* Document blocks */}
              <div className="space-y-2">
                {blocks.map((block, idx) => (
                  <div key={idx} onClick={() => setEditingBlock(idx)}
                    className={`group relative rounded-lg transition-colors ${editingBlock === idx ? 'bg-[#6366F1]/5' : 'hover:bg-[#1E293B]/30'} cursor-text`}>

                    {/* Block add button */}
                    <button className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-[#1E293B] border border-[#6366F1]/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#6366F1]/40">
                      <Plus size={11} className="text-[#475569]" />
                    </button>

                    {block.type === "h1" && (
                      <div className="px-3 py-1">
                        <span className="text-white font-bold" style={{fontSize: '2rem'}}>{block.content}</span>
                      </div>
                    )}
                    {block.type === "h2" && (
                      <div className="px-3 py-1 mt-4">
                        <span className="text-white font-semibold" style={{fontSize: '1.35rem'}}>{block.content}</span>
                      </div>
                    )}
                    {block.type === "p" && (
                      <div className="px-3 py-1">
                        <p className="text-[#CBD5E1] leading-relaxed">{block.content}</p>
                      </div>
                    )}
                    {block.type === "li" && (
                      <div className="px-3 py-0.5 flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-2.5 flex-shrink-0" />
                        <p className="text-[#CBD5E1] leading-relaxed">{block.content}</p>
                      </div>
                    )}
                    {block.type === "callout" && (
                      <div className="mx-3 my-1 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-xl px-4 py-3 flex items-start gap-3">
                        <span className="text-lg flex-shrink-0">💡</span>
                        <p className="text-[#CBD5E1] text-sm leading-relaxed">{block.content}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* New block hint */}
                <div className="px-3 py-3">
                  <button className="text-[#475569] text-sm hover:text-[#94A3B8] transition-colors flex items-center gap-2">
                    <Plus size={15} />
                    Click to add a block, or press '/' for commands
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration panel */}
          {showCollab && (
            <div className="w-72 border-l border-[#6366F1]/10 bg-[#0B1120] flex flex-col flex-shrink-0">
              <div className="px-4 py-4 border-b border-[#6366F1]/10">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">Activity</span>
                  <button onClick={() => setShowCollab(false)} className="text-[#475569] hover:text-white transition-colors"><X size={14} /></button>
                </div>
              </div>

              {/* Active collaborators */}
              <div className="px-4 py-4 border-b border-[#6366F1]/10">
                <div className="text-[#475569] text-xs font-medium uppercase tracking-wider mb-3">Now editing</div>
                <div className="space-y-2">
                  {[
                    { name: "Sarah Chen", avatar: "SC", color: "from-[#6366F1] to-[#8B5CF6]", section: "Introduction" },
                    { name: "Marcus R.", avatar: "MR", color: "from-[#06B6D4] to-[#6366F1]", section: "Feature Releases" },
                  ].map(u => (
                    <div key={u.name} className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center relative flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{u.avatar}</span>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#0B1120]" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">{u.name}</div>
                        <div className="text-[#475569] text-xs">Editing: {u.section}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity timeline */}
              <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hidden">
                <div className="text-[#475569] text-xs font-medium uppercase tracking-wider mb-3">Recent Activity</div>
                <div className="space-y-4">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{a.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#CBD5E1] text-xs leading-relaxed">
                          <span className="text-white font-medium">{a.user}</span> {a.action}
                        </p>
                        <span className="text-[#475569] text-xs">{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment box */}
              <div className="border-t border-[#6366F1]/10 p-4">
                <div className="text-[#475569] text-xs font-medium uppercase tracking-wider mb-2">Add Comment</div>
                <div className="bg-[#1E293B] border border-[#6366F1]/15 rounded-xl p-3 focus-within:border-[#6366F1]/40 transition-all">
                  <textarea placeholder="Leave a comment…" rows={2}
                    className="w-full bg-transparent text-white placeholder-[#475569] text-xs focus:outline-none resize-none" />
                  <div className="flex justify-end mt-2">
                    <button className="bg-[#6366F1] hover:bg-[#5558E8] text-white text-xs px-3 py-1.5 rounded-lg transition-colors">Post</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`.scrollbar-hidden { scrollbar-width: none; } .scrollbar-hidden::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
