import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const users = await locals.pb.collection('users').getFullList();

	return { users };
}) satisfies PageServerLoad;
