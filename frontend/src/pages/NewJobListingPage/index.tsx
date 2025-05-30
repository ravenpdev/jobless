import { zodResolver } from "@hookform/resolvers/zod";
import { zCreateJobListingTrpcInput } from "@jobless/backend/src/routes/createJobListing/input";
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wrapper } from "@/components/Wrapper/Wrapper";
import { useTRPC } from "@/lib/trpc";

type FormValues = z.infer<typeof zCreateJobListingTrpcInput>;

export function NewJobListingPage() {
	const trpc = useTRPC();
	const createJobListing = useMutation(trpc.createJobListing.mutationOptions());

	const form = useForm<FormValues>({
		resolver: zodResolver(zCreateJobListingTrpcInput),
		defaultValues: {
			title: "",
			company: "",
			location: "",
			jobType: "",
			description: "",
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			await createJobListing.mutateAsync(data);

			toast("Job listing has been created.", {
				position: "top-center",
			});

			form.reset();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<Wrapper>
				<h1>Create New Job</h1>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Job title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="company"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company name</FormLabel>
									<FormControl>
										<Input placeholder="Company name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input placeholder="Location" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="jobType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Job type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select job type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="full-time">Full-time</SelectItem>
											<SelectItem value="part-time">Part-time</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Job description"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting ? "Creating..." : "Create"}
						</Button>
					</form>
				</Form>
			</Wrapper>
		</div>
	);
}
