function App() {
	const jobListings = [
		{
			id: 1,
			title: 'ReactJS Developer',
			description: 'lorem ipsum dolor emmet',
		},
		{
			id: 2,
			title: 'Backend Developer',
			description: 'lorem ipsum dolor emmet',
		},
		{
			id: 3,
			title: 'SQL Developer',
			description: 'lorem ipsum dolor emmet',
		},
		{
			id: 4,
			title: 'Go Developer',
			description: 'lorem ipsum dolor emmet',
		},
		{
			id: 5,
			title: 'Rust Developer',
			description: 'lorem ipsum dolor emmet',
		},
	];

	return (
		<div>
			<header>
				<h1>Jobless</h1>
			</header>

			<main>
				<section>
					{jobListings.map((jobListing) => (
						<div key={jobListing.id}>
							<h2>{jobListing.title}</h2>
							<p>{jobListing.description}</p>
						</div>
					))}
				</section>
			</main>

			<footer></footer>
		</div>
	);
}

export { App };
