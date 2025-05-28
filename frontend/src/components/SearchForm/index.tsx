import { MapPin, Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Wrapper } from "../Wrapper/Wrapper";

interface Props {
	searchHandle: (keyword: string, location: string) => void;
	keyword?: string;
	location?: string;
}

export function SearchForm({
	searchHandle,
	keyword = "",
	location = "",
}: Props) {
	const [searchKeyword, setSearchKeyword] = useState<string>(keyword);
	const [searchLocation, setSearchLocation] = useState<string>(location);

	function onSubmitHandle(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		searchHandle(searchKeyword, searchLocation);
	}

	return (
		<Wrapper>
			<form
				onSubmit={onSubmitHandle}
				className="flex flex-col md:flex-row gap-0 md:gap-4 md:border-1 md:border-slate-500 p-1 rounded"
			>
				<div className="flex-1 flex items-center gap-4 px-4 border-1 md:border-0">
					<Search className="text-slate-500" />
					<input
						className="focus:ring-0 focus:outline-0 flex-1 py-1.5"
						type="search"
						placeholder="Job title, keywords, or company"
						value={searchKeyword}
						onChange={(e) => setSearchKeyword(e.target.value)}
					/>
				</div>
				<div className="flex-1 flex items-center gap-4 px-4 border-1 border-t-0 md:border-0">
					<MapPin className="text-slate-500" />
					<input
						className="focus:ring-0 focus:outline-0 flex-1 py-1.5"
						type="search"
						placeholder='City, state, zip code, or "remote"'
						value={searchLocation}
						onChange={(e) => setSearchLocation(e.target.value)}
					/>
				</div>
				<button
					className="mt-2 md:mt-0 bg-blue-500 text-blue-50 py-1 px-4 cursor-pointer hover:bg-blue-600 rounded-sm"
					type="submit"
				>
					Find Jobs
				</button>
			</form>
		</Wrapper>
	);
}
