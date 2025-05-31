import { z } from "zod";

export const zSignUpTrpcInput = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password must be alteast 8 characters long."),
});
