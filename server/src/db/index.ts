import mongoose from "mongoose";

export class Mongo {
	url: string = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

	static connect(url: string): boolean {
		mongoose.connect(url);
		return true;
	}
}
