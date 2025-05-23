import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCProvider } from "./utils/trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TrpcRouter } from "@jobless/backend/src/trpc";
import { useState } from "react";
import { HomePage } from "./pages/HomePage";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Development mode options
				retry: false,
				refetchOnWindowFocus: false,

				// Production mode options
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				// staleTime: 60 * 1000,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	}
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}

export function App() {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<TrpcRouter>({
			links: [
				httpBatchLink({
					url: "http://localhost:3000/trpc",
				}),
			],
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				<div>
					<header>
						<h1>App</h1>
					</header>

					<HomePage />
				</div>
			</TRPCProvider>
		</QueryClientProvider>
	);
	// return (
	// 	<div>
	// 		<header>
	// 			<h1>Jobless</h1>
	// 		</header>

	// 		<main>
	// 			<section>
	// 				{jobListings.map((jobListing) => (
	// 					<div key={jobListing.id}>
	// 						<h2>{jobListing.title}</h2>
	// 						<p>{jobListing.description}</p>
	// 					</div>
	// 				))}
	// 			</section>
	// 		</main>

	// 		<footer>
	// 			<p>&cpy; 2025</p>
	// 		</footer>
	// 	</div>
	// );
}
