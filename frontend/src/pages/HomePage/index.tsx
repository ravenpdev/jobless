import { JobCard } from "@/components/JobCard";
import { SearchForm } from "@/components/SearchForm";
import { Wrapper } from "@/components/Wrapper/Wrapper";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTRPC } from "../../lib/trpc";

export function HomePage() {
	const navigate = useNavigate();

	const trpc = useTRPC();

	const { data, error, isLoading, isFetching, isError } = useQuery(
		trpc.getJobListings.queryOptions({}),
	);

	if (isLoading || isFetching) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	function searchHandle(keyword: string, location: string) {
		const params = new URLSearchParams();
		params.set("q", keyword);
		params.set("l", location);

		navigate({
			pathname: "/jobs",
			search: `${params.toString()}`,
		});
	}

	return (
		<>
			<section className="py-8 border-b-1 border-b-slate-200 px-4 md:px-0">
				<SearchForm searchHandle={searchHandle} />
			</section>

			<section className="mt-4 px-4 md:px-0">
				<Wrapper>
					<h2 className="text-slate-500 text-xs">Most recent jobs</h2>
				</Wrapper>
				<Wrapper className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-4">
					<div className="col-span-1 md:col-span-2">
						<section className="space-y-4">
							{data?.jobListings.map((job) => (
								<JobCard key={job.id} {...job} />
							))}
						</section>
					</div>
					<div className="md:col-span-2 hidden md:block">
						<p>job details</p>
					</div>
				</Wrapper>
			</section>
		</>
	);
}
