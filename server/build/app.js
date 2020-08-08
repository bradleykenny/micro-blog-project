"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://brad:MpDAlv8t7hdQkzjE@cluster0.eisaa.mongodb.net/some?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
    const collection = client.db("test").collection("devices");
    collection.insertOne({ hello: "test" });
    console.log(collection.find({}));
    client.close();
});
const app = express_1.default();
app.set("port", 5000);
app.get("/test", (req, res) => {
    return res.send("test");
});
app.get("/ping", (req, res) => {
    return res.send("pong");
});
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}`);
}).on("error", (e) => console.error(e));
//# sourceMappingURL=app.js.map