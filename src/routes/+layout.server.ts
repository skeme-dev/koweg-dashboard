import type { LayoutLoad } from './$types';
import { guard } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = (async ({ url, locals, pathname }) => {
	if (!url.pathname.startsWith('/login') && !locals.pb.authStore.isValid) {
		throw redirect(303, `/login?redirect=${url.pathname}`);
	}

	const user = locals.pb.authStore.record;

	return { user };
}) satisfies LayoutLoad;
