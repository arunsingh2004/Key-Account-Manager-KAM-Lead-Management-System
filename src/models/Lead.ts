import mongoose, { Schema, Document } from "mongoose";

export interface IContact {
  name: string;
  role: string;
  contactInfo: string;
}

export interface IInteraction {
  date: Date;
  details: string;
  orderStatus?: string;
}

export interface ILead extends Document {
  name: string;
  address: string;
  status: string;
  callFrequency: number;
  lastCallDate?: Date;
  contacts: IContact[];
  interactions: IInteraction[];
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  contactInfo: { type: String, required: true },
});

const InteractionSchema: Schema = new Schema({
  date: { type: Date, required: true },
  details: { type: String, required: true },
  orderStatus: { type: String },
});

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true },
  callFrequency: { type: Number, required: true },
  lastCallDate: { type: Date },
  contacts: [ContactSchema],
  interactions: [InteractionSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead ||
  mongoose.model<ILead>("Lead", LeadSchema);
