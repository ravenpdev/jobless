import { trpc } from "../lib/trpc";
import { getJobListingTrpcRoute } from "./getJobListing";
import { getJobListingsTrpcRoute } from "./getJobListings";

export const trpcRouter = trpc.router({
	getJobListings: getJobListingsTrpcRoute,
	getJobListing: getJobListingTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
