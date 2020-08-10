"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.set("port", 5000);
app.get("/test", (req, res) => {
    return res.send("test");
});
app.get("/ping", (req, res) => {
    return res.send("pong");
});
app.get("/user/:username", (req, res) => {
    return res.json({ username: req.params.username });
});
app.get("/data/import/test", (req, res) => {
    return res.send("Test data imported.");
});
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}`);
}).on("error", (e) => console.error(e));
//# sourceMappingURL=app.js.map