import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    image: string;
    events: string[];
    tickets: string[];
    role: string;
    token: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String, select: false },
        image: { type: String },
        events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
        tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
        role: { type: String },
        token: { type: String, select: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);