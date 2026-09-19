import { violations } from '$lib/search';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const v = violations.find((x) => x.id === params.id);
	if (!v) throw error(404, 'Nije pronađeno');
	return { v };
};

export function entries() {
	return violations.map((v) => ({ id: v.id }));
}
