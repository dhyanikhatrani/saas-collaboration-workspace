const Notification = require("../models/Notification");
const User = require("../models/User");
const Workspace = require("../models/Workspace");
const Channel = require("../models/Channel");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createNotificationRecord = async ({
  app,
  recipientId,
  senderId,
  workspaceId,
  channelId,
  messageId,
  type,
  title,
  message,
}) => {
  if (!recipientId || !senderId || !type || !title || !message) {
    return null;
  }

  if (recipientId.toString() === senderId.toString()) {
    return null;
  }

  const duplicateQuery = {
    recipient: recipientId,
    sender: senderId,
    type,
    title,
    message,
  };

  if (type === "invite") {
    const existingInvite = await Notification.findOne({
      recipient: recipientId,
      sender: senderId,
      type,
      workspace: workspaceId,
      isRead: false,
    });

    if (existingInvite) {
      return existingInvite;
    }
  } else if (messageId) {
    const existingMessageNotification = await Notification.findOne({
      recipient: recipientId,
      sender: senderId,
      type,
      messageId,
    });

    if (existingMessageNotification) {
      return existingMessageNotification;
    }
  }

  const notification = await Notification.create({
    recipient: recipientId,
    sender: senderId,
    workspace: workspaceId || null,
    channel: channelId || null,
    messageId: messageId || null,
    type,
    title,
    message,
  });

  const io = app.get("io");
  io.to(recipientId.toString()).emit("notification-created", { notification });

  return notification;
};

const createChannelMessageNotifications = async ({
  app,
  senderId,
  workspaceId,
  channelId,
  messageId,
  content,
  channelViewers,
}) => {
  if (!senderId || !workspaceId || !channelId || !messageId) {
    return [];
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    return [];
  }

  const memberIds = [
    ...(workspace.members || []).map((memberId) => memberId.toString()),
    workspace.owner?.toString(),
  ].filter(Boolean);

  const uniqueMemberIds = [...new Set(memberIds)];
  const currentViewers = channelViewers?.get(channelId.toString()) || new Set();
  const recipients = uniqueMemberIds.filter(
    (memberId) => memberId !== senderId.toString() && !currentViewers.has(memberId)
  );

  const sender = await User.findById(senderId).select("name");
  const senderName = sender?.name || "Someone";
  const channelDoc = channelId ? await Channel.findById(channelId).select("name") : null;
  const channelLabel = channelDoc?.name ? `#${channelDoc.name}` : channelId ? `#${channelId}` : "a channel";

  const notifications = [];
  for (const recipientId of recipients) {
    const notification = await createNotificationRecord({
      app,
      recipientId,
      senderId,
      workspaceId,
      channelId,
      messageId,
      type: "message",
      title: "New Message",
      message: `${senderName} sent a new message in ${channelLabel}`,
    });

    if (notification) {
      notifications.push(notification);
    }
  }

  const mentionRegex = /(?:^|\s)@([a-zA-Z0-9._-]+)/g;
  const mentionMatches = [...(content || "" ).matchAll(mentionRegex)];
  const mentionedNames = mentionMatches.map((match) => match[1].toLowerCase());

  for (const mentionedName of mentionedNames) {
    const mentionedUser = await User.findOne({
      name: { $regex: new RegExp(`^${escapeRegExp(mentionedName)}$`, "i") },
    }).select("_id name");

    if (!mentionedUser) {
      continue;
    }

    const recipientId = mentionedUser._id;
    if (uniqueMemberIds.includes(recipientId.toString()) && recipientId.toString() !== senderId.toString()) {
      const mentionedNotification = await createNotificationRecord({
        app,
        recipientId,
        senderId,
        workspaceId,
        channelId,
        messageId,
        type: "mention",
        title: "Mention",
        message: `${senderName} mentioned you in ${channelLabel}`,
      });

      if (mentionedNotification) {
        notifications.push(mentionedNotification);
      }
    }
  }

  return notifications;
};

module.exports = {
  createNotificationRecord,
  createChannelMessageNotifications,
};
