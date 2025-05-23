import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "../../utils/trpc";

export function HomePage() {
	const trpc = useTRPC();

	const { data, error, isLoading, isFetching, isError } = useQuery(
		trpc.getJobListings.queryOptions(),
	);

	if (isLoading || isFetching) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	// console.log(jobListingsQuery.data);

	return (
		<main>
			<h2>All Jobs</h2>
			<section>
				{data?.jobListings.map((job) => (
					<div key={job.id}>
						<h2>{job.title}</h2>
						<p>{job.description}</p>
					</div>
				))}
			</section>
		</main>
	);
}
