import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
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

	return (
		<main>
			<h2>All Jobs</h2>
			<section>
				{data?.jobListings.map((job) => (
					<div key={job.id}>
						<h2>
							<Link to={`/jobs/${job.id}`}>{job.title}</Link>
						</h2>
						<p>{job.description}</p>
					</div>
				))}
			</section>
		</main>
	);
}
