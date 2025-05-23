import { initTRPC } from "@trpc/server";

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

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
	getJobListings: trpc.procedure.query(() => {
		// throw new Error("Test Err");
		return { jobListings };
	}),
});

export type TrpcRouter = typeof trpcRouter;
