"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const controllers_1 = require("./controllers");
let bodyParser = require("body-parser");
const app = express_1.default();
app.use(cors_1.default());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express_1.default.static("../client/build"));
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.eisaa.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Connected to MongoDB.");
})
    .catch((error) => {
    console.log("NOT connected to MongoDB.");
    console.error(error);
});
app.set("port", process.env.PORT || 5000);
app.get("/api/ping", (req, res) => {
    return res.send("pong");
});
app.use(controllers_1.postRouter);
app.use(controllers_1.userRouter);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build/index.html"));
});
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}.`);
}).on("error", (e) => console.error(e));
//# sourceMappingURL=app.js.map