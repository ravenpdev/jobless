import crypto from "node:crypto";
import { trpc } from "../../lib/trpc";
import { zSignUpTrpcInput } from "./input";

export const signUpTrpcRoute = trpc.procedure
	.input(zSignUpTrpcInput)
	.mutation(async ({ ctx, input }) => {
		const exist = await ctx.prisma.user.findUnique({
			where: {
				email: input.email,
			},
		});

		if (exist) {
			throw new Error("User already exists.");
		}

		await ctx.prisma.user.create({
			data: {
				email: input.email,
				password: crypto
					.createHash("sha256")
					.update(input.password)
					.digest("hex"),
			},
		});

		return true;
	});
