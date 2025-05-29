import { z } from "zod";
import { jobListings } from "../../lib/joblistings";
import { trpc } from "../../lib/trpc";

export const getJobListingsTrpcRoute = trpc.procedure
	.input(
		z.object({
			q: z.string().default(""),
			l: z.string().default(""),
			sortBy: z.enum(["relevance", "date"]).default("relevance"),
		}),
	)
	.query(({ input }) => {
		if (input.q) {
			const filteredJobListings = jobListings.filter((job) =>
				job.title.toLocaleLowerCase().includes(input.q.toLocaleLowerCase()),
			);

			return { jobListings: filteredJobListings };
		}

		return { jobListings };
	});
