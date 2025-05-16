import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const response = await fetch(`${PUBLIC_POCKETBASE_URL}/public/meta.txt`, {
		method: "GET"
	})

	if (!response.ok) {
		return {
			files: [],
			error: true
		}
	}

	const text = await response.text();

	const t = text.split('\n').filter(line => line.length > 0);

	const resp = await fetch(`${PUBLIC_POCKETBASE_URL}/public/downloads/${t[1]}`, {
		method: "GET"	
	})

	const blob = await resp.blob();
	const file = new File([blob], t[0])

	return {
		files: text.split('\n').filter(line => line.length > 0)
	};
}) satisfies PageServerLoad;
