import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { TrpcRouter } from "@jobless/backend/src/trpc";

export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<TrpcRouter>();
