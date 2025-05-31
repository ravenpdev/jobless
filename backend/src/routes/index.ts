import { trpc } from "../lib/trpc";
import { createJobListingTrpcRoute } from "./createJobListing";
import { getJobListingTrpcRoute } from "./getJobListing";
import { getJobListingsTrpcRoute } from "./getJobListings";
import { signUpTrpcRoute } from "./signUp";

export const trpcRouter = trpc.router({
	getJobListings: getJobListingsTrpcRoute,
	getJobListing: getJobListingTrpcRoute,
	createJobListing: createJobListingTrpcRoute,
	signUp: signUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
