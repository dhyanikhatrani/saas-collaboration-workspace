import { useEffect, useState, useRef, type FormEvent } from "react";


import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import {
  Zap, Hash, Lock, Plus, Search, Bell, ChevronDown, Settings,
  Smile, Paperclip, Send, MoreHorizontal, AtSign, Bookmark,
  Users, FileText, Download, BarChart3, Pin, X, Check, Mic, Video,
  Phone, Star, ArrowRight, MessageSquare, ChevronRight, Layers
} from "lucide-react";

const WORKSPACES = [
  { id: "pd", name: "Product Design", color: "from-[#6366F1] to-[#8B5CF6]", unread: 3 },
  { id: "mk", name: "Marketing", color: "from-[#06B6D4] to-[#6366F1]", unread: 0 },
  { id: "en", name: "Engineering", color: "from-[#8B5CF6] to-[#EC4899]", unread: 7 },
  { id: "sa", name: "Sales", color: "from-[#10B981] to-[#06B6D4]", unread: 1 },
];

const getInitials = (name: string) => {
  if (!name) return "ME";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const getMessageColor = (name: string) => {
  const colors = [
    "from-[#6366F1] to-[#8B5CF6]",
    "from-[#06B6D4] to-[#6366F1]",
    "from-[#8B5CF6] to-[#EC4899]",
    "from-[#10B981] to-[#06B6D4]",
    "from-[#F59E0B] to-[#EF4444]",
  ];

  if (!name) return colors[0];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

type WorkspaceModalProps = {
  onClose: () => void;
  onWorkspaceCreated: (workspace: any) => void;
};
function WorkspaceModal({
  onClose,
  onWorkspaceCreated,
}: WorkspaceModalProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [created, setCreated] = useState(false);

 const handleCreate = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const token =
      localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/workspaces/create",
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    onWorkspaceCreated(res.data.workspace);

    alert("Workspace Created ✅");

    setCreated(true);

    setTimeout(() => {
      onClose();
    }, 1000);

  } catch (error: any) {
    alert(
      error.response?.data?.message ||
      "Workspace Creation Failed ❌"
    );
  }
};

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#6366F1]/25 overflow-hidden shadow-2xl shadow-[#6366F1]/10"
        style={{background: 'linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(15,23,42,0.99) 100%)'}}>
        <div className="h-px bg-gradient-to-r from-transparent via-[#6366F1]/60 to-transparent" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold">Create a Workspace</h3>
              <p className="text-[#94A3B8] text-xs mt-0.5">A workspace is where your team communicates and collaborates</p>
            </div>
            <button onClick={onClose} className="text-[#475569] hover:text-white transition-colors"><X size={18} /></button>
          </div>

          {created ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-[#10B981]" />
              </div>
              <p className="text-white font-medium">Workspace created!</p>
              <p className="text-[#94A3B8] text-sm mt-1">Redirecting you now…</p>
            </div>
          ) : (
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[#CBD5E1] text-sm mb-2">Workspace Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Acme Marketing, Design Team" required
                  className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/15 transition-all" />
              </div>
              <div>
                <label className="block text-[#CBD5E1] text-sm mb-2">Workspace Icon <span className="text-[#475569] font-normal">(optional)</span></label>
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#263148] border border-[#6366F1]/15 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-[#6366F1]/40 transition-colors">
                    <Plus size={18} className="text-[#475569]" />
                    <span className="text-[#475569] text-xs mt-1">Upload</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#475569] text-xs leading-relaxed">Recommended: 512×512px PNG or JPG. Or we'll use your workspace name initials.</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[#CBD5E1] text-sm mb-2">Invite Members</label>
                <input placeholder="Comma-separated emails…" className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#6366F1]/50 transition-all" />
              </div>
              <div>
                <label className="block text-[#CBD5E1] text-sm mb-2">Default Role</label>
                <select className="w-full bg-[#263148] border border-[#6366F1]/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6366F1]/50 transition-all">
                  <option className="bg-[#1E293B]">Member</option>
                  <option className="bg-[#1E293B]">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 border border-[#6366F1]/25 text-[#94A3B8] hover:text-white py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-[#6366F1] hover:bg-[#5558E8] text-white py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#6366F1]/30">Create Workspace</button>
              </div>
              <p className="text-center text-[#475569] text-xs">By creating a workspace, you agree to our <span className="text-[#6366F1] cursor-pointer">Terms of Service</span>.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const socketRef = useRef<any>(null);

  const [activeWS, setActiveWS] = useState("");
  const [activeChannel, setActiveChannel] = useState("");
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [selectedDmUser, setSelectedDmUser] = useState<any>(null);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [dmMessage, setDmMessage] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [dmMessages, setDmMessages] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [typingUser, setTypingUser] = useState("");
  const [socketReady, setSocketReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeChannelRef = useRef("");
  const activeConversationRef = useRef<string | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const activeRoomRef = useRef<string | null>(null);

  const getItemId = (item: any) => item?._id ?? item?.id ?? "";

  const mapServerMessage = (msg: any) => ({
    id: msg._id,
    user: msg.sender?.name || "Unknown",
    avatar: getInitials(msg.sender?.name || "Me"),
    color: getMessageColor(msg.sender?.name || "Me"),
    time: new Date(msg.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    content: msg.content || msg.fileName || "",
    file: msg.fileName
      ? {
          name: msg.fileName,
          url: msg.fileUrl ? `http://localhost:5000${msg.fileUrl}` : "",
          type: msg.fileType,
        }
      : undefined,
  });

  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const isImageFile = (fileType: string) => {
    return ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(fileType);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
    e.target.value = "";
  };

  const uploadFile = async (file: File) => {
    try {
      if (!activeChannel && !activeConversation) {
        alert("Select a channel or direct conversation first.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) return;

      const formData = new FormData();
      formData.append("file", file);
      if (activeChannel) formData.append("channelId", activeChannel);
      if (activeConversation) formData.append("conversationId", activeConversation);

      setUploadingFile(true);
      setUploadProgress(0);

      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            setUploadProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      const newMessage = res.data?.message || res.data;
      if (newMessage?._id) {
        const mapped = mapServerMessage(newMessage);
        if (activeConversation) {
          setDmMessages((prev) => {
            if (prev.some((message: any) => message.id === mapped.id)) return prev;
            return [...prev, mapped];
          });
        } else {
          setMessages((prev) => {
            if (prev.some((message: any) => message.id === mapped.id)) return prev;
            return [...prev, mapped];
          });
        }
      }
    } catch (error: any) {
      console.error("File upload failed", error);
      alert(error.response?.data?.message || "File upload failed");
    } finally {
      setUploadingFile(false);
      setUploadProgress(0);
    }
  };

  const isUserOnline = (userId: string) => onlineUserIds.includes(userId?.toString());

  const fetchMessages = async (channelId: string) => {
    if (!channelId) return;
    console.debug("fetchMessages", channelId);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        `http://localhost:5000/api/messages/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.debug("Loaded messages", res.data?.length, res.data);

      setMessages(res.data.map((msg: any) => mapServerMessage(msg)));
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };
  const fetchConversationMessages = async (conversationId: string) => {
    if (!conversationId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        `http://localhost:5000/api/conversations/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDmMessages(res.data.map((msg: any) => mapServerMessage(msg)));
    } catch (error) {
      console.error("Failed to load direct messages", error);
    }
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUserData(storedUser);
    }

    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.get("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const workspaceRes = await axios.get(
          "http://localhost:5000/api/workspaces",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWorkspaces(workspaceRes.data);

        if (workspaceRes.data.length > 0) {
          setActiveWS(getItemId(workspaceRes.data[0]));
        }

        const usersRes = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(usersRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

useEffect(() => {
  const fetchChannels = async () => {
    try {
      if (!activeWS) return;

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/channels/${activeWS}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChannels(res.data);
      console.log("Channels:", res.data);
      if (res.data.length > 0) {
        setActiveChannel((prev) => prev || getItemId(res.data[0]));
      }

    } catch (error) {
      console.log(error);
    }
  };

  fetchChannels();
}, [activeWS]);

useEffect(() => {
  if (!activeChannel) return;
  fetchMessages(activeChannel);
}, [activeChannel]);

  const [showModal, setShowModal] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");

  const emitTypingStatus = (
    isTyping: boolean,
    conversationId?: string | null,
    channelId?: string | null
  ) => {
    const socket = socketRef.current;
    if (!socket) return;

    const storedUser = getStoredUser();
    const senderId = storedUser?._id || storedUser?.id || "";
    const senderName = storedUser?.name || "Me";

    if (!senderId || (!conversationId && !channelId)) return;

    if (isTyping) {
      socket.emit("user-typing", {
        senderId,
        senderName,
        conversationId,
        channelId,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = window.setTimeout(() => {
        socket.emit("user-stop-typing", {
          senderId,
          conversationId,
          channelId,
        });
      }, 1000);
      return;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    socket.emit("user-stop-typing", {
      senderId,
      conversationId,
      channelId,
    });
  };

  const sendMessage = async () => {
    
    if (!message.trim() || !activeChannel) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      if (!activeChannel) {
        console.warn("sendMessage blocked because activeChannel is empty", { channels });
        return;
      }

      console.debug("sendMessage", { activeChannel, message });

      const res = await axios.post(
        "http://localhost:5000/api/messages/send",
        {
          content: message,
          channelId: activeChannel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.debug("sendMessage response", res.data);

      const newMessage = res.data?.message || res.data;
      emitTypingStatus(false, undefined, activeChannel);
      setMessage("");

      if (newMessage?._id) {
        setMessages((prev) => [
          ...prev,
          {
            id: newMessage._id,
            user: newMessage.sender?.name || "You",
            avatar: getInitials(newMessage.sender?.name || "You"),
            color: getMessageColor(newMessage.sender?.name || "You"),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            content: newMessage.content,
          },
        ]);
      } else {
        console.warn("sendMessage did not return a message object", newMessage);
      }

      await fetchMessages(activeChannel);
    } catch (error: any) {
      console.error("Failed to send message", error.response || error);
    }
  };

  useEffect(() => {
    activeChannelRef.current = activeChannel;
  }, [activeChannel]);

  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);

  useEffect(() => {
    if (!socketReady || !socketRef.current) return;

    const previousRoom = activeRoomRef.current;
    const nextRoomName = activeConversation
      ? `conversation:${activeConversation}`
      : activeChannel
        ? `channel:${activeChannel}`
        : null;

    if (previousRoom && previousRoom !== nextRoomName) {
      socketRef.current.emit("leave-room", { roomName: previousRoom });
    }

    if (nextRoomName) {
      socketRef.current.emit("join-room", { roomName: nextRoomName });
    }

    activeRoomRef.current = nextRoomName;
    setTypingUser("");

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, [activeConversation, activeChannel, socketReady]);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    socketRef.current = socketInstance;

    socketInstance.on("connect", () => {
      console.log("Socket Connected");
      setSocketReady(true);
      const storedUser = getStoredUser();
      if (storedUser?.id) {
        socketInstance.emit("user-online", storedUser.id);
        socketInstance.emit("join-user-room", storedUser.id);
      }
    });

    socketInstance.on("online-users", (onlineIds: string[]) => {
      if (Array.isArray(onlineIds)) {
        setOnlineUserIds(onlineIds.map((id) => id.toString()));
      }
    });

    socketInstance.on("new-message", (newMessage: any) => {
      if (newMessage?.channel && newMessage.channel === activeChannelRef.current) {
        setMessages((prev: any) => {
          const id = newMessage._id || newMessage.id;
          if (prev.some((message: any) => message.id === id)) {
            return prev;
          }
          return [...prev, mapServerMessage(newMessage)];
        });
      }
    });

    socketInstance.on("new-direct-message", (newMessage: any) => {
      if (
        newMessage?.conversation &&
        newMessage.conversation === activeConversationRef.current
      ) {
        setDmMessages((prev: any) => {
          const id = newMessage._id || newMessage.id;
          if (prev.some((message: any) => message.id === id)) {
            return prev;
          }
          return [...prev, mapServerMessage(newMessage)];
        });
      }
    });

    socketInstance.on("user-typing", ({ senderId, senderName, conversationId, channelId }: any) => {
      const storedUser = getStoredUser();
      const currentUserId = storedUser?._id || storedUser?.id || "";

      if (!senderName || senderId?.toString() === currentUserId?.toString()) {
        return;
      }

      if (
        (conversationId && activeConversationRef.current && conversationId === activeConversationRef.current) ||
        (channelId && activeChannelRef.current && channelId === activeChannelRef.current)
      ) {
        setTypingUser(senderName);
      }
    });

    socketInstance.on("user-stop-typing", ({ senderId, conversationId, channelId }: any) => {
      const storedUser = getStoredUser();
      const currentUserId = storedUser?._id || storedUser?.id || "";

      if (senderId?.toString() === currentUserId?.toString()) {
        return;
      }

      if (
        (conversationId && activeConversationRef.current && conversationId === activeConversationRef.current) ||
        (channelId && activeChannelRef.current && channelId === activeChannelRef.current)
      ) {
        setTypingUser("");
      }
    });

    return () => {
      setSocketReady(false);
      socketInstance.disconnect();
    };
  }, []);

  const sendDirectMessage = async () => {
    if (!dmMessage.trim() || !activeConversation) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        `http://localhost:5000/api/conversations/${activeConversation}/messages`,
        {
          content: dmMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newMessage = res.data?.message || res.data;
      emitTypingStatus(false, activeConversation, undefined);
      setDmMessage("");

      if (newMessage?._id) {
        setDmMessages((prev) => {
          const id = newMessage._id;
          if (prev.some((message: any) => message.id === id)) {
            return prev;
          }
          return [
            ...prev,
            {
              id: newMessage._id,
              user: newMessage.sender?.name || "You",
              avatar: getInitials(newMessage.sender?.name || "You"),
              color: getMessageColor(newMessage.sender?.name || "You"),
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              content: newMessage.content,
            },
          ];
        });
      }
    } catch (error: any) {
      console.error("Failed to send direct message", error.response || error);
    }
  };

  const handleSelectUserForDM = async (user: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        "http://localhost:5000/api/conversations",
        { participantId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const conversation = res.data?.conversation;
      if (conversation?._id) {
        setActiveConversation(conversation._id);
        setSelectedDmUser(user);
        setActiveChannel("");
        await fetchConversationMessages(conversation._id);
      }
    } catch (error: any) {
      console.error("Failed to open conversation", error.response || error);
    }
  };

  const handleSendSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage();
  };

  const handleDirectMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendDirectMessage();
  };

  const channelMsgs = messages;
  const isDmView = Boolean(activeConversation && selectedDmUser);
  const activeMessages = isDmView ? dmMessages : channelMsgs;
  const ws: any = workspaces.find(
    (w: any) => getItemId(w) === activeWS
  );
  const currentChannel = channels.find(
    (c: any) => getItemId(c) === activeChannel
  );
  const chatTitle = isDmView ? selectedDmUser?.name || "Direct Message" : currentChannel?.name || "Channel";
  const chatSubtitle = isDmView
    ? "Private conversation"
    : activeChannel === "general"
      ? "General team communication — everyone here"
      : "Team channel";
  const chatIcon = isDmView ? <MessageSquare size={16} className="text-[#94A3B8] flex-shrink-0" /> : <Hash size={16} className="text-[#94A3B8] flex-shrink-0" />;
  return (
    <div className="h-screen bg-[#0F172A] flex overflow-hidden text-[#F8FAFC]">
      
      {showModal && (
      <WorkspaceModal
      onClose={() => setShowModal(false)}
       onWorkspaceCreated={(workspace) => {
      setWorkspaces((prev) => [...prev, workspace]);
    }}
  />
)}

      {/* Workspace rail */}
      <div className="w-16 bg-[#0B1120] border-r border-[#6366F1]/10 flex flex-col items-center py-4 gap-2 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mb-2 cursor-pointer" onClick={() => navigate("/")}>
          <Zap size={16} className="text-white" />
        </div>
        <div className="w-px h-5 bg-[#6366F1]/20 my-1" />
        {workspaces.map((w: any) => {
          const workspaceId = getItemId(w);
          return (
            <div key={workspaceId} className="relative group" onClick={() => setActiveWS(workspaceId)}>
              <div className={`w-10 h-10 rounded-xl cursor-pointer transition-all bg-gradient-to-br ${w.color} ${activeWS === workspaceId ? 'ring-2 ring-[#6366F1] ring-offset-2 ring-offset-[#0B1120]' : 'opacity-70 hover:opacity-100'}`} title={w.name}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {w.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              {w.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] border border-[#0B1120] flex items-center justify-center">
                  <span className="text-white text-xs" style={{fontSize: '9px'}}>{w.unread}</span>
                </div>
              )}
            </div>
          );
        })}

        <button onClick={() => setShowModal(true)} className="w-10 h-10 rounded-xl border-2 border-dashed border-[#6366F1]/30 hover:border-[#6366F1]/60 flex items-center justify-center cursor-pointer transition-colors mt-1 group">
          <Plus size={16} className="text-[#6366F1]/50 group-hover:text-[#6366F1] transition-colors" />
        </button>
        <div className="mt-auto flex flex-col items-center gap-2">
          <button className="w-9 h-9 rounded-xl bg-[#1E293B] hover:bg-[#263148] flex items-center justify-center transition-colors" onClick={() => navigate("/profile")}>
            <Settings size={15} className="text-[#94A3B8]" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center cursor-pointer" onClick={() => navigate("/profile")}>
            <span className="text-white text-xs font-bold">ME</span>
          </div>
        </div>
      </div>

      {/* Channels sidebar */}
      <div className="w-56 bg-[#0D1829] border-r border-[#6366F1]/10 flex flex-col flex-shrink-0">
        {/* Workspace header */}
        <div className="px-4 py-4 border-b border-[#6366F1]/10">
          <button className="w-full flex items-center justify-between hover:bg-[#1E293B]/40 rounded-lg px-1 py-1 transition-colors group">
            <span className="text-white font-semibold text-sm truncate">{ws?.name}</span>
            <ChevronDown size={14} className="text-[#94A3B8] group-hover:text-white transition-colors flex-shrink-0" />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <div className="flex items-center gap-2 bg-[#1E293B]/60 border border-[#6366F1]/10 rounded-lg px-3 py-2">
            <Search size={13} className="text-[#475569] flex-shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" className="bg-transparent text-white placeholder-[#475569] text-xs flex-1 focus:outline-none w-0" />
          </div>
        </div>

        {/* Channels list */}
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5 scrollbar-hidden">
          <div className="px-2 py-1.5 flex items-center justify-between">
            <span className="text-[#475569] text-xs font-semibold uppercase tracking-wider">Channels</span>
            <button className="text-[#475569] hover:text-[#94A3B8] transition-colors"><Plus size={13} /></button>
          </div>

          {channels.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())).map((ch: any) => {
            const channelId = getItemId(ch);
            return (
              <button key={channelId} onClick={() => {
                setActiveChannel(channelId);
                setActiveConversation(null);
                setSelectedDmUser(null);
                setDmMessages([]);
              }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ${activeChannel === channelId ? 'bg-[#6366F1]/15 text-white' : 'text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-white'}`}>
                {ch.type === "private" ? <Lock size={13} className="flex-shrink-0" /> : <Hash size={13} className="flex-shrink-0" />}
                <span className="text-xs flex-1 truncate">{ch.name}</span>
                {ch.unread > 0 && (
                  <div className="w-4 h-4 rounded-full bg-[#6366F1] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs" style={{fontSize: '9px'}}>{ch.unread}</span>
                  </div>
                )}
              </button>
            );
          })}

          <div className="px-2 py-1.5 flex items-center justify-between mt-3">
            <span className="text-[#475569] text-xs font-semibold uppercase tracking-wider">Direct Messages</span>
            <button className="text-[#475569] hover:text-[#94A3B8] transition-colors"><Plus size={13} /></button>
          </div>

          {users.map((u: any) => {
            const online = isUserOnline(u._id);
            return (
              <button
                key={u._id}
                onClick={() => handleSelectUserForDM(u)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ${selectedDmUser?._id === u._id ? "bg-[#6366F1]/15 text-white" : "text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-white"}`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                    <span className="text-white font-bold" style={{fontSize: '8px'}}>{getInitials(u.name)}</span>
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#0D1829] ${online ? 'bg-[#10B981]' : 'bg-[#475569]'}`} />
                </div>
                <span className="text-xs truncate">{u.name}</span>
              </button>
            );
          })}


        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel header */}
        <div className="h-14 border-b border-[#6366F1]/10 flex items-center px-5 gap-4 flex-shrink-0 bg-[#0F172A]">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {chatIcon}
            <span className="text-white font-semibold">{chatTitle}</span>
            <div className="w-px h-4 bg-[#263148] mx-1" />
            <span className="text-[#475569] text-sm truncate hidden sm:block">{chatSubtitle}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <button onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }} className="relative w-8 h-8 rounded-lg bg-[#1E293B] hover:bg-[#263148] flex items-center justify-center transition-colors">
                <Bell size={15} className="text-[#94A3B8]" />
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EF4444] border border-[#0F172A]" />
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-10 w-72 bg-[#1E293B] border border-[#6366F1]/20 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#6366F1]/10 flex items-center justify-between">
                    <span className="text-white font-semibold text-sm">Notifications</span>
                    <span className="text-[#6366F1] text-xs cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  {[
                    { text: "Sarah Chen mentioned you in #general", time: "2m ago", unread: true },
                    { text: "New message in #design-sprint", time: "15m ago", unread: true },
                    { text: "David Miller shared a file", time: "1h ago", unread: false },
                  ].map((n, i) => (
                    <div key={i} className={`px-4 py-3 flex gap-3 hover:bg-[#263148] cursor-pointer border-b border-[#6366F1]/5 transition-colors ${n.unread ? 'bg-[#6366F1]/5' : ''}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-[#6366F1]' : 'bg-transparent'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#CBD5E1] text-xs leading-relaxed">{n.text}</p>
                        <p className="text-[#475569] text-xs mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }} className="flex items-center gap-2 hover:bg-[#1E293B] rounded-lg px-2 py-1 transition-colors">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ME</span>
                </div>
                <ChevronDown size={13} className="text-[#94A3B8]" />
              </button>
              {showProfile && (
                <div className="absolute right-0 top-10 w-56 bg-[#1E293B] border border-[#6366F1]/20 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#6366F1]/10">
                    <div className="text-white text-sm font-medium">Alex Thompson</div>
                    <div className="text-[#475569] text-xs">alex@company.com</div>
                  </div>
                  {[
                    { label: "Profile", icon: Users, action: () => navigate("/profile") },
                    { label: "Documents", icon: FileText, action: () => navigate("/documents") },
                    { label: "Settings", icon: Settings, action: () => navigate("/profile") },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#263148] transition-colors text-[#94A3B8] hover:text-white text-sm">
                      <item.icon size={14} />
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-[#6366F1]/10">
                    <button onClick={() => navigate("/login")} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#263148] transition-colors text-[#EF4444] text-sm">
                      <X size={14} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 scrollbar-hidden">
          <div className="text-center">
            <div className="inline-block bg-[#1E293B] border border-[#6366F1]/10 rounded-full px-4 py-1 text-xs text-[#475569]">Today</div>
          </div>

          {activeMessages.map((msg, idx) => {
            const showAvatar = idx === 0 || activeMessages[idx-1].user !== msg.user;
            return (
              <div key={msg.id} className={`flex gap-3 group ${!showAvatar ? 'ml-11' : ''}`}>
                {showAvatar && (
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className="text-white text-xs font-bold">{msg.avatar}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {showAvatar && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-semibold">{msg.user}</span>
                      <span className="text-[#475569] text-xs">{msg.time}</span>
                    </div>
                  )}
                  <p className="text-[#CBD5E1] text-sm leading-relaxed">{msg.content}</p>
                  {msg.file && (
                    <div className="mt-2 bg-[#1E293B] border border-[#6366F1]/15 rounded-2xl overflow-hidden transition-all">
                      {isImageFile(msg.file.type) ? (
                        <div className="relative">
                          <img src={msg.file.url} alt={msg.file.name} className="w-full max-h-64 object-cover" />
                          <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white uppercase tracking-[0.15em]">
                            Image
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3">
                          <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
                            <FileText size={18} className="text-[#6366F1]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-xs font-medium truncate">{msg.file.name}</div>
                            <div className="text-[#475569] text-[11px] truncate">{msg.file.type}</div>
                          </div>
                          <a href={msg.file.url} download className="inline-flex items-center gap-1 rounded-lg bg-[#6366F1] px-3 py-2 text-[11px] text-white hover:bg-[#5558E8] transition-colors">
                            <Download size={12} />
                            Download
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex gap-1.5 mt-2">
                     {msg.reactions?.map((r: any) => (
                        <button key={r.emoji} className="flex items-center gap-1 bg-[#1E293B] hover:bg-[#263148] border border-[#6366F1]/15 rounded-full px-2 py-0.5 text-xs transition-colors">
                          <span>{r.emoji}</span>
                          <span className="text-[#94A3B8]">{r.count}</span>
                        </button>
                      ))}
                      <button className="w-6 h-6 rounded-full border border-[#6366F1]/15 hover:border-[#6366F1]/40 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                        <Smile size={11} className="text-[#475569]" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-1 mt-1 flex-shrink-0">
                  <button className="w-7 h-7 rounded-lg bg-[#1E293B] hover:bg-[#263148] border border-[#6366F1]/10 flex items-center justify-center transition-colors">
                    <Smile size={12} className="text-[#475569]" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-[#1E293B] hover:bg-[#263148] border border-[#6366F1]/10 flex items-center justify-center transition-colors">
                    <Bookmark size={12} className="text-[#475569]" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-[#1E293B] hover:bg-[#263148] border border-[#6366F1]/10 flex items-center justify-center transition-colors">
                    <MoreHorizontal size={12} className="text-[#475569]" />
                  </button>
                </div>
              </div>
            );
          })}

          {typingUser && (
            <div className="flex items-center gap-2 ml-11">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" style={{animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite`}} />
                ))}
              </div>
              <span className="text-[#475569] text-xs"> {typingUser} is typing…</span>
            </div>
          )}
        </div>

        {/* Message input */}
        {isDmView ? (
          <form onSubmit={handleDirectMessageSubmit} className="px-5 pb-5 flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.pdf,.docx,.xlsx,.zip"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="bg-[#1E293B] border border-[#6366F1]/15 rounded-2xl overflow-hidden focus-within:border-[#6366F1]/40 focus-within:ring-2 focus-within:ring-[#6366F1]/10 transition-all">
              <div className="flex items-center gap-3 px-4 py-3">
                <input
                  value={dmMessage}
                  onChange={(e) => {
                    setDmMessage(e.target.value);
                    emitTypingStatus(Boolean(e.target.value.trim()), activeConversation, undefined);
                  }}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendDirectMessage(); } }}
                  placeholder={`Message ${selectedDmUser?.name || "user"}`}
                  className="flex-1 bg-transparent text-white placeholder-[#475569] text-sm focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#6366F1]/10">
                <div className="flex items-center gap-1">
                  <button type="button" onClick={triggerFileUpload} title="Attach file" className="w-8 h-8 rounded-lg hover:bg-[#263148] flex items-center justify-center transition-colors">
                    <Paperclip size={15} className="text-[#475569] hover:text-[#94A3B8] transition-colors" />
                  </button>
                  {[
                    { Icon: AtSign, title: "Mention" },
                    { Icon: Smile, title: "Emoji" },
                    { Icon: Mic, title: "Voice message" },
                  ].map(({ Icon, title }) => (
                    <button key={title} type="button" title={title} className="w-8 h-8 rounded-lg hover:bg-[#263148] flex items-center justify-center transition-colors">
                      <Icon size={15} className="text-[#475569] hover:text-[#94A3B8] transition-colors" />
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={!dmMessage.trim()}
                  className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-[#6366F1]/30"
                >
                  Send <Send size={12} />
                </button>
              </div>
              {uploadingFile && (
                <div className="px-4 pb-3">
                  <div className="h-2 rounded-full bg-[#475569] overflow-hidden">
                    <div className="h-full bg-[#6366F1] transition-all" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <div className="text-[#94A3B8] text-[10px] mt-1">Uploading {uploadProgress}%</div>
                </div>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={handleSendSubmit} className="px-5 pb-5 flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.pdf,.docx,.xlsx,.zip"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="bg-[#1E293B] border border-[#6366F1]/15 rounded-2xl overflow-hidden focus-within:border-[#6366F1]/40 focus-within:ring-2 focus-within:ring-[#6366F1]/10 transition-all">
              <div className="flex items-center gap-3 px-4 py-3">
                <input
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    emitTypingStatus(Boolean(e.target.value.trim()), undefined, activeChannel);
                  }}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder={`Message #${currentChannel?.name || ""}`}
                  className="flex-1 bg-transparent text-white placeholder-[#475569] text-sm focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#6366F1]/10">
                <div className="flex items-center gap-1">
                  <button type="button" onClick={triggerFileUpload} title="Attach file" className="w-8 h-8 rounded-lg hover:bg-[#263148] flex items-center justify-center transition-colors">
                    <Paperclip size={15} className="text-[#475569] hover:text-[#94A3B8] transition-colors" />
                  </button>
                  {[
                    { Icon: AtSign, title: "Mention" },
                    { Icon: Smile, title: "Emoji" },
                    { Icon: Mic, title: "Voice message" },
                  ].map(({ Icon, title }) => (
                    <button key={title} type="button" title={title} className="w-8 h-8 rounded-lg hover:bg-[#263148] flex items-center justify-center transition-colors">
                      <Icon size={15} className="text-[#475569] hover:text-[#94A3B8] transition-colors" />
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558E8] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-[#6366F1]/30"
                >
                  Send <Send size={12} />
                </button>
              </div>
              {uploadingFile && (
                <div className="px-4 pb-3">
                  <div className="h-2 rounded-full bg-[#475569] overflow-hidden">
                    <div className="h-full bg-[#6366F1] transition-all" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <div className="text-[#94A3B8] text-[10px] mt-1">Uploading {uploadProgress}%</div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        .scrollbar-hidden { scrollbar-width: none; }
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
