import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import type { Express } from "express";
import type { TrpcRouter } from "../routes";
import type { AppContext } from "./ctx";

export const trpc = initTRPC.context<AppContext>().create();

export function trpcToExpress(
	expressApp: Express,
	appContext: AppContext,
	trpcRouter: TrpcRouter,
) {
	expressApp.use(
		"/trpc",
		trpcExpress.createExpressMiddleware({
			router: trpcRouter,
			createContext: () => appContext,
		}),
	);
}
