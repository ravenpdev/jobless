import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { publicProcedure, router } from "./trpc";

const jobListings = [
	{
		id: 1,
		title: "ReactJS Developer",
		description: "lorem ipsum dolor emmet",
	},
	{
		id: 2,
		title: "Backend Developer",
		description: "lorem ipsum dolor emmet",
	},
	{
		id: 3,
		title: "SQL Developer",
		description: "lorem ipsum dolor emmet",
	},
	{
		id: 4,
		title: "Go Developer",
		description: "lorem ipsum dolor emmet",
	},
	{
		id: 5,
		title: "Rust Developer",
		description: "lorem ipsum dolor emmet",
	},
];

const trpcRouter = router({
	getJobListings: publicProcedure.query(async () => {
		return { jobListings };
	}),
});

export type TrpcRouter = typeof trpcRouter;

const expressApp = express();

expressApp.get("/ping", (req, res) => {
	res.send("pong");
});

expressApp.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: trpcRouter,
	}),
);

// expressApp.get("/job-listings", (req, res) => {
// 	res.send(jobListings);
// });

expressApp.listen(3000, () => {
	console.info("Listening at http://localhost:3000");
});
