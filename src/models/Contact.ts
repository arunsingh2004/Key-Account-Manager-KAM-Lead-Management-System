import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  leadId: mongoose.Types.ObjectId; // Reference to the Lead
  name: string;
  role: string;
  contactInfo: string;
}

const ContactSchema: Schema = new Schema({
  leadId: { type: mongoose.Types.ObjectId, ref: "Lead", required: true }, // Required field
  name: { type: String, required: true },
  role: { type: String, required: true },
  contactInfo: { type: String, required: true },
});

export default mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);
