import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";

type Props = {
	className?: ClassValue;
	children: React.ReactNode;
};

export function Wrapper({ children, className }: Props) {
	return <div className={cn("max-w-5xl mx-auto", className)}>{children}</div>;
}
