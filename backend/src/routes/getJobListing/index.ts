import { z } from "zod";
import { trpc } from "../../lib/trpc";

const jobListings = [
	{
		id: 1,
		title: "ReactJS Developer",
		company: "FrontendDev",
		location: "Philippines",
		rating: 4.8,
		jobType: "full-time",
		jobDescription:
			"Lorem ipsum is a placeholder text derived from a Latin text by Cicero, used in graphic design, publishing, and web development. Learn how it was discovered, how it works, and how it differs from other types of filler text.",
	},
	{
		id: 2,
		title: "Fullstack Developer",
		company: "FullstackDev",
		location: "Philippines",
		rating: 4.5,
		jobType: "full-time",
		jobDescription:
			"Lorem ipsum is a placeholder text derived from a Latin text by Cicero, used in graphic design, publishing, and web development. Learn how it was discovered, how it works, and how it differs from other types of filler text.",
	},
	{
		id: 3,
		title: "NodeJs Developer",
		company: "BackendDev",
		location: "Philippines",
		rating: 4.7,
		jobType: "full-time",
		jobDescription:
			"Lorem ipsum is a placeholder text derived from a Latin text by Cicero, used in graphic design, publishing, and web development. Learn how it was discovered, how it works, and how it differs from other types of filler text.",
	},
];

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
