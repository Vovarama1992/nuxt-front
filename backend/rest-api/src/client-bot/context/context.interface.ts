import { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import { Context, SessionFlavor } from 'grammy';

export interface ISessionData {
  profileId: number;
  fullPhotos: string[];
  compressPhotos: string[];
}

export type IAppContext = Context &
  SessionFlavor<ISessionData> &
  ConversationFlavor;
export type AppConversation = Conversation<IAppContext>;
