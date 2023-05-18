import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    image: string;
    events: string[];
    tickets: string[];
    role: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String },
        image: { type: String },
        events: { type: Schema.Types.ObjectId, ref: 'Event' },
        tickets: { type: Schema.Types.ObjectId, ref: 'Ticket' },
        role: { type: String }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);