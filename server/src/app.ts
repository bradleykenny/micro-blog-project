import express from "express";

const app = express();

app.set("port", 5000);

// Test routes to ensure up and running

app.get("/test", (req: any, res: any) => {
	return res.send("test");
});

app.listen(app.get("port"), () => {
	console.log(`Server running on port ${app.get("port")}`);
}).on("error", (e: object) => console.error(e));
