const getRouteParams = <T extends Record<string, boolean>>(
	object: T,
): Record<keyof T, string> => {
	return Object.keys(object).reduce((acc, key) => {
		return Object.assign(acc, { [key]: `:${key}` });
	}, {}) as Record<keyof T, string>;
};

export const getHomeRoute = () => "/";

export const getJobRoute = () => "/jobs";

export const getJobDetailRouteParams = getRouteParams({ jobId: true });
type GetJobDetailRouteParams = typeof getJobDetailRouteParams;
export const getJobDetailRoute = ({ jobId }: GetJobDetailRouteParams) =>
	`/jobs/${jobId}`;

// export const getJobDetailRoute = ({ jobId }: { jobId: string }) =>
// `/jobs/:${jobId}`;
