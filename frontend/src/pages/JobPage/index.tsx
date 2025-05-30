import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { JobLists } from "@/components/JobLists";
import { SearchForm } from "@/components/SearchForm";
import { useTRPC } from "@/lib/trpc";

type SortBy = "relevance" | "date";

export function JobPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const trpc = useTRPC();

	const [sortBy, setSortBy] = useState<SortBy>("relevance");
	const { data, error, isLoading, isFetching, isError } = useQuery(
		trpc.getJobListings.queryOptions({
			q: searchParams.get("q") ?? "",
			l: searchParams.get("l") ?? "",
			sortBy: (searchParams.get("sortBy") as SortBy) ?? "relevance",
		}),
	);

	if (isLoading || isFetching) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	function sortByHandle(value: SortBy) {
		setSortBy(value);
		setSearchParams((searchParams) => {
			searchParams.set("sortBy", value);

			return searchParams;
		});
		navigate({
			pathname: "/jobs",
			search: `${searchParams.toString()}`,
		});
	}

	function searchHandle(keyword: string, location: string) {
		setSearchParams((searchParams) => {
			searchParams.set("q", keyword);
			searchParams.set("l", location);

			return searchParams;
		});

		navigate({
			pathname: "/jobs",
			search: `${searchParams.toString()}`,
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
					<h2 className="text-slate-500 text-xs">
						{searchParams.get("q")} jobs {searchParams.get("l") ? "in" : ""}{" "}
						{searchParams.get("l")}
					</h2>

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
				<div className="max-w-5xl mx-auto">
					<JobLists jobListings={data?.jobListings} />
				</div>
			</section>
		</>
	);
}
