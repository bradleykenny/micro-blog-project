"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = "123";
const BlogPostSchema = new Schema({
    creator: String,
    title: String,
    body: String,
    date: Date,
});
exports.BlogPost = mongoose_1.default.model("BlogPost", BlogPostSchema);
//# sourceMappingURL=posts.js.map