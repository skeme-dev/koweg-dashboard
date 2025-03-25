import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createDepartment: async ({ request, locals }) => {
		const keys = ['label', 'description', 'leader', 'teams', 'relatedPosts'];
		const form = await request.formData();

		let data = {};

		for (const key of keys) {
			if (form.has(key)) {
				data[key] = form.getAll(key).length == 1 ? form.get(key) : form.getAll(key);
			}
		}

		try {
			const created = await locals.pb.collection('departments').create(data);
			return { departmentId: created.id };
		} catch (error) {
			console.error(error);
			return { error: true };
		}
	}
};
