import { Schema, model, Document } from 'mongoose';

interface ToolExecutionSchema extends Document {
  conversationId: string;
  toolName: string;
  input: string;
  output: string;
  status: 'success' | 'error' | 'timeout';
  duration: number;
  timestamp: Date;
}

const toolExecutionSchema = new Schema<ToolExecutionSchema>({
  conversationId: { type: String, required: true },
  toolName: { type: String, required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
  status: { type: String, enum: ['success', 'error', 'timeout'], required: true },
  duration: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

const ToolExecution = model<ToolExecutionSchema>('ToolExecution', toolExecutionSchema);

export default ToolExecution;
