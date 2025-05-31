import cors from "cors";
import express from "express";
import { type AppContext, createAppContext } from "./lib/ctx";
import { trpcToExpress } from "./lib/trpc";
import { trpcRouter } from "./routes";

let ctx: AppContext | null = null;

(async () => {
	try {
		ctx = createAppContext();
		const expressApp = express();
		expressApp.use(cors());

		trpcToExpress(expressApp, ctx, trpcRouter);

		expressApp.get("/ping", (_req, res) => {
			res.send("pong");
		});

		expressApp.listen(3000, () => {
			console.info("Listening at http://localhost:3000");
		});
	} catch (error) {
		console.error(error);
		await ctx?.stop();
	}
})();
