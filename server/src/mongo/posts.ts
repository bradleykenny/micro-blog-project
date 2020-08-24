import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = "123";

const BlogPostSchema = new Schema({
	creator: String,
	title: String,
	body: String,
	date: Date,
});

export const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
