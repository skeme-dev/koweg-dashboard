import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const sponsors = await locals.pb.collection('sponsors').getFullList();

    return { sponsors };
}) satisfies PageServerLoad;

export const actions = {
	createSponsor: async ({ locals, request }) => {
		const keys = ['name', 'logo', 'link', 'main_sponsor'];
		const form = await request.formData();

		let data = {};

		for (const key of keys) {
			if (form.has(key)) {
				data[key] = form.getAll(key).length == 1 ? form.get(key) : form.getAll(key);
			}
        }
        
        try {
			const created = await locals.pb.collection('sponsors').create(data);
			return { sponsorId: created.id };
		} catch (error) {
			console.error(error);
			return { error: true };
		}
	}
}