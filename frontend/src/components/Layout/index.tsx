import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as routes from "@/lib/routes";

export function Layout() {
	return (
		<>
			<header className="flex text-sm justify-between h-16 px-8 items-center border-b-1 border-b-slate-200">
				<div className="flex gap-4 items-center">
					<Link to={routes.getHomeRoute()}>
						<h1 className="font-bold text-xl">JOBLESS</h1>
					</Link>
					<nav>
						<ul className="flex space-x-4 items-center">
							<li>
								<NavLink to={routes.getHomeRoute()}>Home</NavLink>
							</li>
							<li>Company Reviews</li>
							<li>Find salaries</li>
						</ul>
					</nav>
				</div>

				<ul className="flex space-x-2">
					<li>
						<Button asChild variant={"ghost"} size={"sm"}>
							<Link to={routes.getSignUpRoute()}>Sign up</Link>
						</Button>
					</li>
					<li>
						<Separator orientation="vertical" />
					</li>
					<li>
						<Button
							className="text-slate-900"
							asChild
							variant={"link"}
							size={"sm"}
						>
							<Link to={""}>Employer / Post Job</Link>
						</Button>
					</li>
				</ul>
			</header>

			<main>
				<Outlet />
			</main>

			<footer>Footer</footer>
		</>
	);
}

export function BlankLayout() {
	return (
		<>
			<main>
				<Outlet />
			</main>
			<footer>Footer</footer>
		</>
	);
}
