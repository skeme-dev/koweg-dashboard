import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params, parent }) => {
	const { departments } = await parent();

	console.log(departments);
	const departmentId = params.departmentId;

	const department = departments.find((dep) => {
		return dep.id === departmentId;
	});

	return { department };
}) satisfies PageServerLoad;
