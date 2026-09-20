<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { searchViolations } from '$lib/search';
	import { KATEGORIJE } from '$lib/types';

	let q = $state('');
	let kat = $state('');
	// Deep links: detail "Povezano" chips and kategorije cards navigate to /?q= / ?kat=.
	// Sync on URL change (same-route client nav reuses the component instance).
	$effect(() => {
		const uq = page.url.searchParams.get('q');
		if (uq !== null && uq !== q) q = uq;
		const uk = page.url.searchParams.get('kat');
		if (uk !== null && uk !== kat) kat = uk;
	});
	let results = $derived(searchViolations(q, kat));
</script>

<div class="space-y-4">
	<div>
		<h1 class="text-2xl font-bold tracking-tight">Brza pretraga prekršaja</h1>
		<p class="text-sm text-muted-foreground">
			Za policijske službenike. Upišite pojam, član ili situaciju — npr. “brzina”, “alkohol 1.5”,
			“pojas”, “član 44”.
		</p>
	</div>

	<div class="flex flex-col gap-3 sm:flex-row">
		<Input
			bind:value={q}
			placeholder="Pretraga… npr. brzina, alkohol, pojas"
			aria-label="Pretraga prekršaja"
			class="h-12 text-base"
		/>
		<select
			bind:value={kat}
			aria-label="Filter po kategoriji"
			class="h-12 rounded-lg border border-input bg-background px-3 text-base"
		>
			<option value="">Sve kategorije</option>
			{#each KATEGORIJE as k}
				<option value={k}>{k}</option>
			{/each}
		</select>
	</div>

	<div class="flex gap-2 overflow-x-auto pb-1">
		<Button size="sm" variant={kat === '' ? 'default' : 'outline'} onclick={() => (kat = '')}>
			Sve
		</Button>
		{#each KATEGORIJE as k}
			<Button
				size="sm"
				variant={kat === k ? 'default' : 'outline'}
				onclick={() => (kat = kat === k ? '' : k)}
			>
				{k}
			</Button>
		{/each}
	</div>

	<p class="text-sm text-muted-foreground">{results.length} rezultata</p>

	<ul class="grid gap-3">
		{#each results as v}
			<li>
				<a href={`${base}/prekrsaj/${v.id}`} class="block">
					<Card.Root class="transition-colors hover:border-primary">
						<Card.Content class="p-4">
							<div class="flex items-center justify-between gap-2">
								<Badge variant="secondary" class="min-w-0 max-w-[60%] truncate"
									>{v.kategorija}</Badge
								>
								<span class="shrink-0 text-lg font-bold whitespace-nowrap"
									>{v.kazna_min === v.kazna_max
										? `${v.kazna_min} KM`
										: `${v.kazna_min}–${v.kazna_max} KM`}</span
								>
							</div>
							<h2 class="mt-2 text-lg font-semibold">{v.naziv}</h2>
							<p class="text-sm text-muted-foreground">{v.clan_norme} → {v.clan_sankcije}</p>
						</Card.Content>
					</Card.Root>
				</a>
			</li>
		{/each}
	</ul>

	{#if results.length === 0}
		<Card.Root class="border-dashed">
			<Card.Content class="p-4 text-sm">
				Nema rezultata. Pokušajte sa kraćim pojmom, npr. “brzina” ili “174”.
			</Card.Content>
		</Card.Root>
	{/if}
</div>
