import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IPost extends mongoose.Document {
	id: Number;
	user: String;
	timestamp: String;
	content: String;
	likes: [String];
}

const PostSchema = new Schema({
	id: Number,
	user: String,
	timestamp: String,
	content: String,
	likes: [String],
});

export const Post = mongoose.model<IPost>("Post", PostSchema);
