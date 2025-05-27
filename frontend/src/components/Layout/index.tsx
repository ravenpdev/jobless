import { Link, Outlet } from "react-router-dom";
import { getHomeRoute } from "../../routes";

export function Layout() {
	return (
		<>
			<header className="flex text-sm justify-between h-16 px-8 items-center border-b-1 border-b-slate-200">
				<div className="flex gap-4 items-center">
					<Link to={getHomeRoute()}>
						<h1 className="font-bold text-xl">JOBLESS</h1>
					</Link>
					<nav>
						<ul className="flex gap-4">
							<li>
								<Link to={getHomeRoute()}>Home</Link>
							</li>
							<li>Company Reviews</li>
							<li>Find salaries</li>
						</ul>
					</nav>
				</div>

				<div className="flex gap-4">
					<Link className="hover:underline text-blue-600 font-bold" to={""}>
						Sign in
					</Link>
					<div className="border-l-1"></div>
					<Link className="hover:underline" to={""}>
						Employer / Post Job
					</Link>
				</div>
			</header>

			<main>
				<Outlet />
			</main>

			<footer>Footer</footer>
		</>
	);
}
