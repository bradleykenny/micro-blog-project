import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
	username: string;
	password: string;
	avatar: string;
	follows: string[];
}

const UserSchema = new Schema({
	username: String,
	password: String,
	avatar: String,
	follows: [String],
});

export const User = mongoose.model<IUser>("User", UserSchema);
