"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    id: Number,
    user: String,
    timestamp: String,
    content: String,
    likes: [String],
});
exports.Post = mongoose_1.default.model("Post", PostSchema);
//# sourceMappingURL=Post.js.map