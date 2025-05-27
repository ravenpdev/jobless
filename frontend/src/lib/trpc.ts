import type { TrpcRouter } from "@jobless/backend/src/trpc";
import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<TrpcRouter>();
