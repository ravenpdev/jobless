import { Input } from "@/components/Input";
import { Wrapper } from "@/components/Wrapper/Wrapper";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type JobType = "full-time" | "part-time";

interface IFormInput {
	title: string;
	company: string;
	location: string;
	jobType: JobType | null;
	description: string;
}

const formInitialValue: IFormInput = {
	title: "",
	company: "",
	location: "",
	jobType: null,
	description: "",
};

export function NewJobListingPage() {
	const [state, setState] = useState(formInitialValue);

	const { register, handleSubmit } = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

	return (
		<div>
			<Wrapper>
				<h1>Create New Job</h1>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Input label="Title" {...register("title")} />
					<div>
						<label htmlFor="company">Company name</label>
						<input
							id="company"
							value={state.company}
							onChange={(e) => setState({ ...state, company: e.target.value })}
							type="text"
						/>
					</div>
					<div>
						<label htmlFor="location">Location</label>
						<input
							id="location"
							value={state.location}
							onChange={(e) => setState({ ...state, location: e.target.value })}
							type="text"
						/>
					</div>
					<div>
						<label htmlFor="jobType">Job Type</label>
						<select
							name="jobType"
							id="jobType"
							onChange={(e) =>
								setState({ ...state, jobType: e.target.value as JobType })
							}
						>
							<option value="">Select Job Type</option>
							<option value="fulltime">Fulltime</option>
							<option value="parttime">Parttime</option>
						</select>
					</div>
					<div>
						<label htmlFor="description">Description</label>
						<textarea
							id="description"
							value={state.description}
							onChange={(e) =>
								setState({ ...state, description: e.target.value })
							}
							name="description"
						/>
					</div>

					<button
						className="py-1 px-2 bg-blue-500 text-blue-50 rounded-xs cursor-pointer"
						type="submit"
					>
						Create Job
					</button>
				</form>
			</Wrapper>
		</div>
	);
}
