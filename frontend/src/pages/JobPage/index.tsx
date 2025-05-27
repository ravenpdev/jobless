import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { JobCard } from "../../components/JobCard";
import { SearchForm } from "../../components/SearchForm";
import { useTRPC } from "../../utils/trpc";

type SortBy = "relevance" | "date";

export function JobPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const trpc = useTRPC();

	const [sortBy, setSortBy] = useState<SortBy>("relevance");
	const { data, error, isLoading, isFetching, isError } = useQuery(
		trpc.getJobListings.queryOptions(),
	);

	if (isLoading || isFetching) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	function sortByHandle(value: SortBy) {
		setSortBy(value);
		searchParams.set("sortBy", value);
		navigate({
			pathname: "/jobs",
			search: `${searchParams.toString()}`,
		});
	}

	function searchHandle(keyword: string, location: string) {
		const params = searchParams;
		params.set("q", keyword);
		params.set("l", location);
		navigate({
			pathname: "/jobs",
			search: `${params.toString()}`,
		});
	}

	return (
		<>
			<section className="py-8 border-b-1 border-b-slate-200">
				<SearchForm
					searchHandle={searchHandle}
					keyword={searchParams.get("q") ?? ""}
					location={searchParams.get("l") ?? ""}
				/>
			</section>

			<section className="mt-4">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-slate-500 text-xs">Find your dream job!</h2>

					<div className="mt-2">
						<p className="text-sm">
							Sort by:{" "}
							<button
								className={`cursor-pointer ${sortBy === "relevance" ? "font-bold" : ""}`}
								type="button"
								onClick={() => sortByHandle("relevance")}
							>
								relevance
							</button>{" "}
							-{" "}
							<button
								className={`cursor-pointer ${sortBy === "date" ? "font-bold" : ""}`}
								type="button"
								onClick={() => sortByHandle("date")}
							>
								date
							</button>
						</p>
					</div>
				</div>
				<div className="max-w-5xl mt-4 mx-auto gap-4 grid grid-cols-4">
					<div className="col-span-2">
						<section className="space-y-4">
							{data?.jobListings.map((job) => (
								<JobCard key={job.id} {...job} />
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
