import { Wrapper } from "@/components/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	title: z.string().min(1, "title is required."),
	company: z.string().min(1, "company name is required."),
	location: z.string().min(1, "location is required."),
	// jobType: z.enum(["full-time", "part-time"]),
	jobType: z.string().min(1, "job type is required."),
	description: z.string().min(1, "description is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function NewJobListingPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

	return (
		<div>
			<Wrapper>
				<h1>Create New Job</h1>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="title">Title</label>
						<input
							id="title"
							{...register("title")}
							aria-invalid={errors.title ? "true" : "false"}
						/>
						{errors.title && (
							<p className="text-xs text-red-500">{errors.title.message}</p>
						)}
					</div>
					<div>
						<label htmlFor="company">Company name</label>
						<input id="company" {...register("company")} />
						{errors.company && dirtyFields.company && (
							<p className="text-xs text-red-500">{errors.company.message}</p>
						)}
					</div>
					<div>
						<label htmlFor="location">Location</label>
						<input id="location" {...register("location")} />
						{errors.location && dirtyFields.location && (
							<p className="text-xs text-red-500">{errors.location.message}</p>
						)}
					</div>
					<div>
						<label htmlFor="jobType">Job Type</label>
						<select id="jobType" {...register("jobType")}>
							<option value="">Select Job Type</option>
							<option value="fulltime">Fulltime</option>
							<option value="parttime">Parttime</option>
						</select>
						{errors.jobType && dirtyFields.jobType && (
							<p className="text-xs text-red-500">{errors.jobType.message}</p>
						)}
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<textarea id="description" {...register("description")} />
						{errors.description && dirtyFields.description && (
							<p className="text-xs text-red-500">
								{errors.description.message}
							</p>
						)}
					</div>
					<Button type="submit" size={"sm"} className="cursor-pointer">
						Create Job
					</Button>
				</form>
			</Wrapper>
		</div>
	);
}
