import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	let correspondingDepartment;

	const users = await locals.pb.collection('users').getFullList();

	if (locals.pb.authStore.baseModel.role == 'DEPARTMENT_LEADER') {
		correspondingDepartment = await locals.pb
			.collection('departments')
			.getFirstListItem(
				locals.pb.filter('leader = {:id}', { id: locals.pb.authStore.baseModel.id })
			);

		throw redirect(303, '/dashboard/departments/' + correspondingDepartment.items[0].id);
	}

	const departments = await locals.pb
		.collection('departments')
		.getFullList({ expand: 'teams,leader' });

	return { departments, users };
}) satisfies PageServerLoad;
