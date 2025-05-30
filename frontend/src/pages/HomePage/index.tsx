import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { JobLists } from "@/components/JobLists";
import { SearchForm } from "@/components/SearchForm";
import { Wrapper } from "@/components/Wrapper/Wrapper";
import { useTRPC } from "@/lib/trpc";

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
					{data?.jobListings.length ? (
						<>
							<h2 className="text-slate-500 text-xs mb-4">Most recent jobs</h2>
							<JobLists jobListings={data?.jobListings} />
						</>
					) : (
						<p>No available jobs</p>
					)}
				</Wrapper>
			</section>
		</>
	);
}
