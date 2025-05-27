import type { TrpcRouter } from "@jobless/backend/src/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import * as routes from "./lib/routes";
import { TRPCProvider } from "./lib/trpc";
import { HomePage } from "./pages/HomePage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { JobPage } from "./pages/JobPage";
import { SignInPage } from "./pages/SignInPage";

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
				<BrowserRouter>
					<Routes>
						<Route element={<Layout />}>
							<Route path={routes.getHomeRoute()} element={<HomePage />} />
							<Route path={routes.getJobRoute()} element={<JobPage />} />
							<Route
								path={routes.getJobDetailRoute(routes.getJobDetailRouteParams)}
								element={<JobDetailPage />}
							/>
						</Route>
						<Route path={routes.getSignInRoute()} element={<SignInPage />} />
					</Routes>
				</BrowserRouter>
			</TRPCProvider>
		</QueryClientProvider>
	);
}
