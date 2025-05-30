import cors from "cors";
import express from "express";
import { trpcToExpress } from "./lib/trpc";
import { trpcRouter } from "./routes";

const expressApp = express();
expressApp.use(cors());

trpcToExpress(expressApp, trpcRouter);

expressApp.get("/ping", (_req, res) => {
	res.send("pong");
});

expressApp.listen(3000, () => {
	console.info("Listening at http://localhost:3000");
});
