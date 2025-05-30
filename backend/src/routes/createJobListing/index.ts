import { jobListings } from "../../lib/joblistings";
import { trpc } from "../../lib/trpc";
import { zCreateJobListingTrpcInput } from "./input";

export const createJobListingTrpcRoute = trpc.procedure
	.input(zCreateJobListingTrpcInput)
	.mutation(({ input }) => {
		jobListings.unshift({
			...input,
			id: jobListings.length + 1,
			rating: 0,
		});

		return true;
	});
