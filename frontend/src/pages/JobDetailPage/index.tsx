import { useParams } from "react-router-dom";

export function JobDetailPage() {
	const { jobId } = useParams() as { jobId: string };

	return (
		<div>
			<h2>Job Title - {jobId}</h2>
			<p>Job Description</p>
			<p>Created at: {Date.now()}</p>
		</div>
	);
}
