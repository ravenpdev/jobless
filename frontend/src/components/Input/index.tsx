import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export function Input({ label, name, ...rest }: Props) {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input id={name} {...rest} />
		</div>
	);
}
