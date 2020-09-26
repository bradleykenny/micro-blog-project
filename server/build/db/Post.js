"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PostSchema = new Schema({
    id: Number,
    user: String,
    timestamp: String,
    content: String,
    likes: [String],
});
exports.Post = mongoose_1.default.model("Post", PostSchema);
//# sourceMappingURL=post.js.map