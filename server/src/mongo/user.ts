import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	id: String,
	password: String,
	avatar: String,
	follows: [String],
});

export const User = mongoose.model("User", UserSchema);
