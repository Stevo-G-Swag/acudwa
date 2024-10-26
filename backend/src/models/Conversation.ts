import { Schema, model, Document } from 'mongoose';

interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface Tool {
  name: string;
  executions: number;
  averageResponseTime: number;
}

interface ConversationSchema extends Document {
  userId: string;
  provider: string;
  messages: Message[];
  tools: Tool[];
  created_at: Date;
  updated_at: Date;
}

const messageSchema = new Schema<Message>({
  role: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  metadata: { type: Map, of: Schema.Types.Mixed },
});

const toolSchema = new Schema<Tool>({
  name: { type: String, required: true },
  executions: { type: Number, required: true },
  averageResponseTime: { type: Number, required: true },
});

const conversationSchema = new Schema<ConversationSchema>({
  userId: { type: String, required: true },
  provider: { type: String, required: true },
  messages: { type: [messageSchema], required: true },
  tools: { type: [toolSchema], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Conversation = model<ConversationSchema>('Conversation', conversationSchema);

export default Conversation;
