import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actionss = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		console.log(password);

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
			return redirect(303, '/');
		} catch (error) {
			console.log('Error:', error);
			return {
				error: true,
				email: email
			};
		}
	},
	logout: async ({ locals }) => {
		await locals.pb.authStore.clear();
		throw redirect(303, '/login');
	}
};
