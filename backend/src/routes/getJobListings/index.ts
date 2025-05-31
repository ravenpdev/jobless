import { z } from "zod";
import { trpc } from "../../lib/trpc";

export const getJobListingsTrpcRoute = trpc.procedure
	.input(
		z.object({
			q: z.string().default(""),
			l: z.string().default(""),
			sortBy: z.enum(["relevance", "date"]).default("relevance"),
		}),
	)
	.query(async ({ ctx, input }) => {
		const jobListings = await ctx.prisma.jobListing.findMany({
			where: {
				OR: [
					{
						title: {
							contains: input.q,
							mode: "insensitive",
						},
					},
				],
			},
			orderBy:
				input.sortBy === "date"
					? { createdAt: "desc" }
					: {
							_relevance: {
								fields: ["title"],
								search: "database",
								sort: "asc",
							},
						},
			select: {
				id: true,
				title: true,
				company: true,
				location: true,
				rating: true,
				jobType: true,
				description: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return { jobListings };
	});
