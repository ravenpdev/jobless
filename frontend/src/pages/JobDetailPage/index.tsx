import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useTRPC } from "@/lib/trpc";

export function JobDetailPage() {
	const { jobId } = useParams() as { jobId: string };
	const trpc = useTRPC();
	const { data, error, isLoading, isFetching, isError } = useQuery(
		trpc.getJobListing.queryOptions({ jobId }),
	);

	if (isLoading || isFetching) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	if (!data?.jobListing) {
		return <span>Job not found.</span>;
	}

	return (
		<div>
			<h2>{data.jobListing.title}</h2>
			<p>{format(data.jobListing.createdAt, "yyyy-MM-dd")}</p>
			<p>{data.jobListing.description}</p>
		</div>
	);
}
