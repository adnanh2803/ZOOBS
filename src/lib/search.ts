import type { Violation } from '$lib/types';
import data from '$lib/data/violations.json';

export const violations = data as Violation[];

export function searchViolations(q: string, kategorija = ''): Violation[] {
	const query = q.trim().toLowerCase();
	return violations.filter((v) => {
		const matchKat = kategorija ? v.kategorija === kategorija : true;
		if (!matchKat) return false;
		if (!query) return true;
		const hay = [v.naziv, v.clan_norme, v.clan_sankcije, v.opis, ...v.keywords]
			.join(' ')
			.toLowerCase();
		return query.split(/\s+/).every((w) => hay.includes(w));
	});
}
