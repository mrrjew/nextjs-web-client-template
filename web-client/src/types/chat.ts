import { DbResponseToUser, User } from "./user";

export interface Conversation {
  id: string;
  name: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  FILE = "FILE",
}

export enum MessageStatus {
  SENDING = "SENDING",
  SENT = "SENT",
  // RECEIVED = 'RECEIVED',
  // READ = 'READ',
}
export interface SendingMessage {
  id: string;
  message: string;
  type: MessageType;
  conversationId: string;
  sender: { id: string };
  file?: File;
  createdAt: Date;
  status: MessageStatus;
}
export interface Message {
  id: string;
  sender: User;
  conversationId: string;
  message: string;
  url?: string;
  readyBy?: User[];
  type: MessageType;
  createdAt: Date;
  updatedAt: Date;
}

export type InboxMessage = Message | SendingMessage;

export const isSendingMessage = (
  message: InboxMessage,
): message is SendingMessage => {
  return (message as SendingMessage).status !== undefined;
};
export const MessageTypeTextToEnum = (type: string): MessageType => {
  switch (type) {
    case "text":
      return MessageType.TEXT;
    case "image":
      return MessageType.IMAGE;
    case "file":
      return MessageType.FILE;
    case "video":
      return MessageType.VIDEO;
    default:
      return MessageType.TEXT;
  }
};

export const DbResponseToConversation = (conversation: any): Conversation => {
  return {
    id: conversation._id,
    name: conversation.name,
    isGroupChat: conversation.isGroupChat,
    users: conversation.users.map((user: any) => DbResponseToUser(user)),
    latestMessage: conversation.latestMessage
      ? DbResponseToMessage(conversation.latestMessage)
      : undefined,
    createdAt: new Date(conversation.createdAt),
    updatedAt: new Date(conversation.updatedAt),
  };
};

export const DbResponseToMessage = (message: any): Message => {
  return {
    id: message._id,
    sender: DbResponseToUser(message.sender),
    conversationId: message.chat,
    message: message.message,
    readyBy:
      message.readBy && message.readBy.length
        ? message.readBy.map((user: any) => DbResponseToUser(user))
        : [],
    type: MessageTypeTextToEnum(message.type),
    url: message.url,
    createdAt: new Date(message.createdAt),
    updatedAt: new Date(message.updatedAt),
  };
};
