import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IPost extends mongoose.Document {
	id: string;
	user: string;
	avatar?: string | undefined;
	timestamp: string;
	content: string;
	likes: [string];
}

export type TPost = {
	id: string;
	user: string;
	avatar?: string | undefined;
	timestamp: string;
	content: string;
	likes: [string];
};

const PostSchema = new Schema({
	id: String,
	user: String,
	timestamp: String,
	content: String,
	likes: [String],
});

export const Post = mongoose.model<IPost>("Post", PostSchema);
