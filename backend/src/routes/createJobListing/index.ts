import { z } from "zod";
import { trpc } from "../../lib/trpc";

export const createJobListingTrpcRoute = trpc.procedure
	.input(
		z.object({
			title: z.string().min(1, "title is required."),
			company: z.string().min(1, "company name is required."),
			location: z.string().min(1, "location is required."),
			// jobType: z.enum(["full-time", "part-time"]),
			jobType: z.string().min(1, "job type is required."),
			description: z.string().min(1, "description is required."),
		}),
	)
	.mutation(({ input }) => {
		// TODO
	});
