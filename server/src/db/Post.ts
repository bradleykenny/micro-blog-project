import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
	id: Number,
	user: String,
	timestamp: String,
	content: String,
	likes: [String],
});

export const Post = mongoose.model("Post", PostSchema);
