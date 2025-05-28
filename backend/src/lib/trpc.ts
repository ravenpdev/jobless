import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import type { Express } from "express";
import type { TrpcRouter } from "../routes";

export const trpc = initTRPC.create();

export function trpcToExpress(expressApp: Express, trpcRouter: TrpcRouter) {
	expressApp.use(
		"/trpc",
		trpcExpress.createExpressMiddleware({
			router: trpcRouter,
		}),
	);
}
