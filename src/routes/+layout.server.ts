import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = (async ({ url, locals }) => {
	if (!url.pathname.startsWith('/login') && !locals.pb.authStore.isValid) {
		throw redirect(303, `/login?redirect=${url.pathname}`);
	}

	const user = locals.pb.authStore.record;

	return { user };
}) satisfies LayoutLoad;
