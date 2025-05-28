type Props = {
	label: string;
} & React.ComponentProps<"input">;

export function Input({ label, name, ...rest }: Props) {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input id={name} {...rest} />
		</div>
	);
}
