import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useTRPC } from "../../utils/trpc";

export function JobDetailPage() {
	const { jobId } = useParams() as { jobId: string };
	const trpc = useTRPC();
	const { data, error, isLoading, isFetching, isError } = useQuery(
		trpc.getJobDetail.queryOptions({ jobId }),
	);

	if (isLoading || isFetching) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	if (!data?.job) {
		return <span>Job not found.</span>;
	}

	return (
		<div>
			<h2>{data?.job?.title}</h2>
			<p>{data?.job?.jobDescription}</p>
		</div>
	);
}
