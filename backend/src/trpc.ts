import { initTRPC } from "@trpc/server";
import { z } from "zod";

// title: string;
// company: string;
// location: string;
// rating: number;
// jobType: string;
// jobDescription: string;

const jobListings = [
	{
		id: 1,
		title: "ReactJS Developer",
		company: "FrontendDev",
		location: "Philippines",
		rating: 4.8,
		jobType: "full-time",
		jobDescription:
			"Lorem ipsum is a placeholder text derived from a Latin text by Cicero, used in graphic design, publishing, and web development. Learn how it was discovered, how it works, and how it differs from other types of filler text.",
	},
	{
		id: 2,
		title: "Fullstack Developer",
		company: "FullstackDev",
		location: "Philippines",
		rating: 4.5,
		jobType: "full-time",
		jobDescription:
			"Lorem ipsum is a placeholder text derived from a Latin text by Cicero, used in graphic design, publishing, and web development. Learn how it was discovered, how it works, and how it differs from other types of filler text.",
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
