import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
	id: String;
	password: String;
	avatar: String;
	follows: [String];
}

const UserSchema = new Schema({
	id: String,
	password: String,
	avatar: String,
	follows: [String],
});

export const User = mongoose.model<IUser>("User", UserSchema);
