import { zodResolver } from "@hookform/resolvers/zod";
import { zSignUpTrpcInput } from "@jobless/backend/src/routes/signUp/input";
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Wrapper } from "@/components/Wrapper/Wrapper";
import { useTRPC } from "@/lib/trpc";

const zSignUpTrpcInputExtended = zSignUpTrpcInput
	.extend({
		confirmPassword: z.string(),
	})
	.superRefine((val, ctx) => {
		if (val.password !== val.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Password must be the same",
				path: ["confirmPassword"],
			});
		}
	});

type FormValues = z.infer<typeof zSignUpTrpcInputExtended>;

export function SignUpPage() {
	const trpc = useTRPC();
	const signUpUser = useMutation(trpc.signUp.mutationOptions());

	const form = useForm<FormValues>({
		resolver: zodResolver(zSignUpTrpcInputExtended),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			await signUpUser.mutateAsync(data);

			toast("Congrats!", {
				position: "top-center",
			});

			form.reset();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Wrapper className="max-w-sm py-20">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
						size={"sm"}
						className="cursor-pointer"
					>
						{form.formState.isSubmitting ? "Creating..." : "Sign up"}
					</Button>
				</form>
			</Form>

			<div>
				<span className="text-xs">
					Already have an account?{" "}
					<Button
						asChild
						variant={"link"}
						className="text-blue-500 text-xs px-0"
					>
						<Link to="/signin">Sign in</Link>
					</Button>
				</span>
			</div>
		</Wrapper>
	);
}
