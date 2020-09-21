import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	id: Number,
	user: String,
	timestamp: String,
	content: String,
	likes: [String],
});

export const Post = mongoose.model("Post", PostSchema);
