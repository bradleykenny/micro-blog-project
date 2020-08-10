import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	id: String,
	password: String,
	avatar: String,
	follows: [String],
});

export const User = mongoose.model("User", UserSchema);
