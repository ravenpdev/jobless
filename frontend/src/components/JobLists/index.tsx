import { useEffect, useState } from "react";
import { JobCard } from "../JobCard";

type Job = {
	id: number;
	title: string;
	company: string;
	location: string;
	rating: number;
	jobType: string;
	description: string;
};

type Props = {
	jobListings?: Job[];
};

export function JobLists({ jobListings = [] }: Props) {
	// INFO in the future maybe it is best to fetch the job details on click for now its ok to have stale data
	const [selected, setSelected] = useState<Job | null>(null);

	useEffect(() => {
		setSelected(jobListings[0] ?? null);
	}, [jobListings[0]]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
			<div className="col-span-1 md:col-span-2">
				<section className="space-y-4">
					{jobListings.map((job) => (
						<JobCard key={job.id} job={job} setSelected={setSelected} />
					))}
				</section>
			</div>
			<div className="hidden md:col-span-2 md:block">
				{selected && (
					<>
						<h2>{selected.title}</h2>
						<p>{selected.company}</p>
						<p>{selected.description}</p>
					</>
				)}
			</div>
		</div>
	);
}
