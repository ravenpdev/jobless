import type { TrpcRouter } from "@jobless/backend/src/routes";
import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<TrpcRouter>();
