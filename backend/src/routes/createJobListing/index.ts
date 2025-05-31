import { trpc } from "../../lib/trpc";
import { zCreateJobListingTrpcInput } from "./input";

export const createJobListingTrpcRoute = trpc.procedure
	.input(zCreateJobListingTrpcInput)
	.mutation(async ({ ctx, input }) => {
		await ctx.prisma.jobListing.create({
			data: {
				...input,
				rating: 0,
			},
		});

		return true;
	});
