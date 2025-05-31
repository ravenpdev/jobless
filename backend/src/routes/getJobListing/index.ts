import { z } from "zod";
import { trpc } from "../../lib/trpc";

export const getJobListingTrpcRoute = trpc.procedure
	.input(
		z.object({
			jobId: z.string(),
		}),
	)
	.query(async ({ ctx, input }) => {
		const jobListing = await ctx.prisma.jobListing.findUnique({
			where: {
				id: input.jobId,
			},
		});
		return { jobListing };
	});
