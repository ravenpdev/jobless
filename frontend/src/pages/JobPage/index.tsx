import { useQuery } from "@tanstack/react-query";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTRPC } from "../../utils/trpc";

export function JobPage() {
	const trpc = useTRPC();

	const [sortBy, setSortBy] = useState<"relevance" | "date">("relevance");

	const { data, error, isLoading, isFetching, isError } = useQuery(
		trpc.getJobListings.queryOptions(),
	);

	if (isLoading || isFetching) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	function sortByHandle() {
		setSortBy((prev) => (prev === "date" ? "relevance" : "date"));
	}

	return (
		<>
			<section className="py-8 border-b-1 border-b-slate-200">
				<div className="max-w-4xl mx-auto">
					<form className="flex flex-col md:flex-row gap-0 md:gap-4 md:border-1 md:border-slate-500 p-1 rounded">
						<div className="flex-1 flex items-center gap-4 px-4 border-1 md:border-0">
							<Search className="text-slate-500" />
							<input
								className="focus:ring-0 focus:outline-0 flex-1 py-1.5"
								type="text"
								placeholder="Job title, keywords, or company"
							/>
						</div>
						<div className="flex-1 flex items-center gap-4 px-4 border-1 border-t-0 md:border-0">
							<MapPin className="text-slate-500" />
							<input
								className="focus:ring-0 focus:outline-0 flex-1"
								type="text"
								placeholder='City, state, zip code, or "remote"'
							/>
						</div>
						<button
							className="mt-2 md:mt-0 bg-blue-500 text-blue-50 py-1 px-4 cursor-pointer hover:bg-blue-600 rounded-sm"
							type="submit"
						>
							Find Jobs
						</button>
					</form>
				</div>
			</section>

			<section className="mt-8">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-slate-500 text-xs">Find your dream job!</h2>

					<div className="mt-4">
						<p className="text-sm">
							Sort by:{" "}
							<button
								className={`cursor-pointer ${sortBy === "relevance" ? "font-bold" : ""}`}
								type="button"
								onClick={sortByHandle}
							>
								relevance
							</button>{" "}
							-{" "}
							<button
								className={`cursor-pointer ${sortBy === "date" ? "font-bold" : ""}`}
								type="button"
								onClick={sortByHandle}
							>
								date
							</button>
						</p>
					</div>
				</div>
				<div className="max-w-5xl mt-8 mx-auto gap-4 grid grid-cols-4">
					<div className="col-span-2">
						<section className="space-y-4">
							{data?.jobListings.map((job) => (
								<div
									className="group/card hover:border-slate-400 p-4 rounded border-1 cursor-pointer border-slate-200 text-sm"
									key={job.id}
								>
									<h3 className="group-hover/card:underline font-bold text-lg">
										<Link to={`/jobs/${job.id}`}>{job.title}</Link>
									</h3>
									<p>{job.description}</p>
								</div>
							))}
						</section>
					</div>
					<div className="col-span-2">
						<p>job details</p>
					</div>
				</div>
			</section>
		</>
	);
}
