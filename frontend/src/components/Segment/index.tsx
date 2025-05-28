type Props = {
	title: string;
	size: 1 | 2;
	description?: string;
	children: React.ReactNode;
};

export function Segment({ title, size = 1, description, children }: Props) {
	return (
		<div>
			{size === 1 ? <h1>{title}</h1> : <h2>{title}</h2>}
			{description && <p>{description}</p>}
			{children && <div>{children}</div>}
		</div>
	);
}
