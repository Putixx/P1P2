import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent {
    name: string;
    type: string;
    owner: string;
    description: string;
    image: string;
    latitude: number;
    longtitude: number;
    participants: string[];
    price: number;
    isPromoted: boolean;
}

export interface IEventModel extends IEvent, Document {}

const EventSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        description: { type: String, required: true },
        image: { type: String, required: true },
        latitude: { type: Number, required: true },
        longtitude: { type: Number, required: true },
        participants: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        price: { type: Number, required: true },
        isPromoted: { type: Boolean, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IEventModel>('Event', EventSchema);