"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Mongo {
    constructor() {
        this.url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
    }
    static connect(url) {
        mongoose_1.default.connect(url);
        return true;
    }
}
exports.Mongo = Mongo;
//# sourceMappingURL=index.js.map