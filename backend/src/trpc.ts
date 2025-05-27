import { initTRPC } from "@trpc/server";
import { z } from "zod";

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
		return { jobListings };
	}),
	getJobDetail: trpc.procedure
		.input(
			z.object({
				jobId: z.string(),
			}),
		)
		.query(({ input }) => {
			const job = jobListings.find((job) => job.id === Number(input.jobId));
			// if (!job) throw new Error(`Job ${input.jobId} not found`);
			return { job: job || null };
		}),
});

export type TrpcRouter = typeof trpcRouter;
