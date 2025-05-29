import { z } from "zod";
import { jobListings } from "../../lib/joblistings";
import { trpc } from "../../lib/trpc";

export const getJobListingTrpcRoute = trpc.procedure
	.input(
		z.object({
			jobId: z.string(),
		}),
	)
	.query(({ input }) => {
		const jobListing = jobListings.find(
			(job) => job.id === Number(input.jobId),
		);

		return { jobListing: jobListing || null };
	});
