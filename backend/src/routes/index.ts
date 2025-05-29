import { trpc } from "../lib/trpc";
import { createJobListingTrpcRoute } from "./createJobListing";
import { getJobListingTrpcRoute } from "./getJobListing";
import { getJobListingsTrpcRoute } from "./getJobListings";

export const trpcRouter = trpc.router({
	getJobListings: getJobListingsTrpcRoute,
	getJobListing: getJobListingTrpcRoute,
	createJobListing: createJobListingTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
