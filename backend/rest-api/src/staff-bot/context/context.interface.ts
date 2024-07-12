import { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import { Context, SessionFlavor } from 'grammy';
import { ObjectId } from 'mongodb';

export interface ISessionData {
  profileId: number;
  fullPhotos: string[];
  compressPhotos: string[];
  selectedProdutId: ObjectId | null;
}

export type IAppContext = Context &
  SessionFlavor<ISessionData> &
  ConversationFlavor;
export type AppConversation = Conversation<IAppContext>;
