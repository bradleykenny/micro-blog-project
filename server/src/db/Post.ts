import mongoose from "mongoose";
import { IUser } from "./user";

const Schema = mongoose.Schema;

export interface IPost extends mongoose.Document {
	id: number;
	user: string;
	avatar?: string | undefined;
	timestamp: string;
	content: string;
	likes: [string];
}

export type TPost = {
	id: number;
	user: string;
	avatar?: string | undefined;
	timestamp: string;
	content: string;
	likes: [string];
};

const PostSchema = new Schema({
	id: Number,
	user: String,
	timestamp: String,
	content: String,
	likes: [String],
});

export const Post = mongoose.model<IPost>("Post", PostSchema);
