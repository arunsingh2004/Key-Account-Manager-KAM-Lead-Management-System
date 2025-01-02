import mongoose, { Schema, Document } from "mongoose";

export interface IInteraction extends Document {
  leadId: string;
  interactionType: string;
  details?: string;
  date: Date;
}

const InteractionSchema = new Schema<IInteraction>({
  leadId: { type: Schema.Types.String, ref: "Lead", required: true },
  interactionType: { type: String, enum: ["Call", "Order"], required: true },
  details: { type: String },
  date: { type: Date, default: Date.now },
});

// Check if the model already exists
export default mongoose.models.Interaction ||
  mongoose.model<IInteraction>("Interaction", InteractionSchema);
