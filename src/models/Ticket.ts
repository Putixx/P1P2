import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket {
    name: string;
    type: string;
    price: number;
    date: Date;
    eventId: string;
}

export interface ITicketModel extends ITicket, Document {}

const TicketSchema: Schema = new Schema(
    {
        name: { type: String },
        type: { type: String },
        price: { type: Number },
        date: { type: Date },
        eventId: { type: Schema.Types.ObjectId, ref: 'Event' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ITicketModel>('Ticket', TicketSchema);