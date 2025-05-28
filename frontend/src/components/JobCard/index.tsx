import { CheckIcon, EllipsisVerticalIcon, StarIcon } from "lucide-react";

type Props = {
	id: number;
	title: string;
	company: string;
	location: string;
	rating: number;
	jobType: string;
	jobDescription: string;
};

export function JobCard(props: Props) {
	return (
		<div className="group/jobcard text-slate-700 cursor-pointer space-y-2 hover:border-slate-300 p-4 rounded border-1 border-slate-200 text-sm">
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
					{props.title}
				</h3>
				<p className="flex gap-2 mt-2 space-y-1">
					{props.company}{" "}
					<span className="flex gap-2 items-center">
						{props.rating} <StarIcon size={16} />
					</span>
				</p>
				<p>{props.location}</p>
			</div>
			<div className="flex flex-wrap">
				<p className="mt-2 flex items-center gap-2 bg-green-100 text-green-600 px-1.5 py-0.5 rounded">
					{props.jobType} <CheckIcon size={16} />
				</p>
			</div>
			<p className="mt-4 text-ellipsis">{props.jobDescription}</p>
		</div>
	);
}
