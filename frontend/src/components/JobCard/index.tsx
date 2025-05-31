import { CheckIcon, EllipsisVerticalIcon, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Job = {
	id: string;
	title: string;
	company: string;
	location: string;
	rating: number;
	jobType: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

type Props = {
	job: Job;
	setSelected: React.Dispatch<React.SetStateAction<Job | null>>;
};

export function JobCard({ job, setSelected }: Props) {
	const navigate = useNavigate();
	const [windowSize, setWindowSize] = useState([0, 0]);

	useEffect(() => {
		setWindowSize([window.innerWidth, window.innerHeight]);
	}, []);

	useEffect(() => {
		function updateSize() {
			setWindowSize([window.innerWidth, window.innerHeight]);
		}

		window.addEventListener("resize", updateSize);

		return () => window.removeEventListener("resize", updateSize);
	}, []);

	function selectJobHandle() {
		if (windowSize[0] < 768) {
			navigate({
				pathname: `/jobs/${job.id}`,
			});
			return;
		}
		setSelected(job);
	}

	return (
		<div
			className="group/jobcard text-slate-700 cursor-pointer space-y-2 hover:border-slate-300 p-4 rounded border-1 border-slate-200 text-sm"
			onClick={selectJobHandle}
		>
			<div className="flex justify-between items-center">
				<div className="flex text-xs flex-wrap gap-2 font-semibold">
					<p className="bg-orange-50 text-orange-500 py-0.5 px-2">New</p>
					<p className="bg-orange-50 text-orange-500 py-0.5 px-2">
						Hiring multiple candidates
					</p>
				</div>
				<div>
					<button
						type="button"
						className="cursor-pointer hover:bg-slate-200 p-0.5 rounded"
					>
						<EllipsisVerticalIcon size={16} />
					</button>
				</div>
			</div>
			<div>
				<h3 className="text-slate-900 group-hover/jobcard:underline font-bold text-lg">
					{job.title}
				</h3>
				<p className="flex gap-2 mt-2 space-y-1">
					{job.company}{" "}
					<span className="flex gap-2 items-center">
						{job.rating} <StarIcon size={16} />
					</span>
				</p>
				<p>{job.location}</p>
			</div>
			<div className="flex flex-wrap">
				<p className="mt-2 flex items-center gap-2 bg-green-100 text-green-600 px-1.5 py-0.5 rounded">
					{job.jobType} <CheckIcon size={16} />
				</p>
			</div>
			<p className="mt-4 text-ellipsis">{job.description}</p>
		</div>
	);
}
