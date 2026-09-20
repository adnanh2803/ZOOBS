<script lang="ts">
	import { base } from '$app/paths';
	import { searchViolations } from '$lib/search';
	import { KATEGORIJE } from '$lib/types';

	let q = $state('');
	let kat = $state('');
	let results = $derived(searchViolations(q, kat));
</script>

<div class="space-y-4">
	<h1 class="text-2xl font-bold">Brza pretraga prekršaja</h1>
	<p class="text-sm text-slate-600">
		Za policijske službenike. Upišite pojam, član ili situaciju — npr. “brzina”, “alkohol 1.5”,
		“pojas”, “član 44”.
	</p>

	<div class="flex flex-col gap-3 sm:flex-row">
		<input
			bind:value={q}
			placeholder="Pretraga… npr. brzina, alkohol, pojas"
			class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base shadow-sm focus:border-blue-600 focus:outline-none"
		/>
		<select
			bind:value={kat}
			class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base"
		>
			<option value="">Sve kategorije</option>
			{#each KATEGORIJE as k}
				<option value={k}>{k}</option>
			{/each}
		</select>
	</div>

	<p class="text-sm text-slate-500">{results.length} rezultata</p>

	<ul class="grid gap-3">
		{#each results as v}
			<li>
				<a
					href={`${base}/prekrsaj/${v.id}`}
					class="block rounded-xl border bg-white p-4 shadow-sm transition hover:border-blue-600"
				>
					<div class="flex items-center justify-between gap-2">
						<span class="text-xs font-semibold uppercase tracking-wide text-blue-700"
							>{v.kategorija}</span
						>
						<span class="text-sm font-bold whitespace-nowrap"
							>{v.kazna_min === v.kazna_max ? `${v.kazna_min} KM` : `${v.kazna_min}–${v.kazna_max} KM`}</span
						>
					</div>
					<h2 class="mt-1 text-lg font-semibold">{v.naziv}</h2>
					<p class="text-sm text-slate-600">{v.clan_norme} → {v.clan_sankcije}</p>
				</a>
			</li>
		{/each}
	</ul>

	{#if results.length === 0}
		<p class="rounded-lg bg-yellow-50 p-4 text-sm">
			Nema rezultata. Pokušajte sa kraćim pojmom, npr. “brzina” ili “174”.
		</p>
	{/if}
</div>
