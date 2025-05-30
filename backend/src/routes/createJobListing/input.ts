import { z } from "zod";

export const zCreateJobListingTrpcInput = z.object({
	title: z.string().min(1, "title is required."),
	company: z.string().min(1, "company name is required."),
	location: z.string().min(1, "location is required."),
	jobType: z.string().min(1, "job type is required."),
	description: z.string().min(1, "description is required."),
});
