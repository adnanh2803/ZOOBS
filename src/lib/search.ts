import type { Violation } from '$lib/types';
import data from '$lib/data/violations.json';

export const violations = data as Violation[];

/**
 * Numeric police queries: "1.6 promila" -> alcohol bracket containing 1.6,
 * "brzina 25 preko" / "30 preko ograničenja" -> speed bracket for excess 25/30.
 * Boundaries follow the law text (e.g. "preko 0,8 do 1,5" => 0.8 < v <= 1.5).
 * Returns null when the query has no numeric context (falls back to text search).
 */
function parseRangeQuery(query: string): Violation[] | null {
	const m = query.match(/(\d+(?:[.,]\d+)?)/);
	if (!m) return null;
	const value = parseFloat(m[1].replace(',', '.'));
	const promilCtx = /promil|g\/kg|‰|alkohol|pijan|alkotest/.test(query);
	const speedCtx = /preko|prekora|brzin|ogranič|km\/?h|\+/.test(query);
	if (promilCtx && !speedCtx) {
		return violations.filter(
			(v) =>
				v.opseg_jedinica === 'promil' &&
				value > (v.opseg_min ?? -Infinity) &&
				(v.opseg_max == null || value <= v.opseg_max)
		);
	}
	if (speedCtx && !promilCtx) {
		return violations.filter(
			(v) =>
				v.opseg_jedinica === 'kmh' &&
				value > (v.opseg_min ?? -Infinity) &&
				(v.opseg_max == null || value <= v.opseg_max)
		);
	}
	return null;
}

export function searchViolations(q: string, kategorija = ''): Violation[] {
	const query = q.trim().toLowerCase();
	const inKat = (v: Violation) => (kategorija ? v.kategorija === kategorija : true);
	if (!query) return violations.filter(inKat);
	const ranged = parseRangeQuery(query);
	if (ranged && ranged.length > 0) return ranged.filter(inKat);
	return violations.filter((v) => {
		if (!inKat(v)) return false;
		const hay = [v.naziv, v.clan_norme, v.clan_sankcije, v.opis, ...v.keywords]
			.join(' ')
			.toLowerCase();
		return query.split(/\s+/).every((w) => hay.includes(w));
	});
}
