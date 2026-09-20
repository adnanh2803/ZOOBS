<script lang="ts">
	import { base } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	let { data } = $props();
	let v = $derived(data.v);
	let copied = $state(false);
	let copiedOsnov = $state(false);

	async function copyReport() {
		const txt = `${v.naziv}\n${v.clan_norme} -> ${v.clan_sankcije}\nKazna: ${v.kazna_min}-${v.kazna_max} KM\nBodovi: ${v.bodovi}\nZabrana: ${v.zabrana}`;
		await navigator.clipboard.writeText(txt);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	async function copyOsnov() {
		const txt = `${v.clan_sankcije} Zakona o osnovama sigurnosti saobraćaja na putevima u Bosni i Hercegovini\nU vezi s ${v.clan_norme} istog Zakona.`;
		await navigator.clipboard.writeText(txt);
		copiedOsnov = true;
		setTimeout(() => (copiedOsnov = false), 2000);
	}
</script>

<Button variant="link" href="{base}/" class="h-11 px-0">← Nazad na pretragu</Button>

<article class="mt-1 space-y-4">
	<Card.Root class="border-0 bg-primary text-primary-foreground">
		<Card.Content class="p-5">
			<div class="flex flex-wrap items-center gap-2">
				<Badge variant="secondary">{v.kategorija}</Badge>
				{#if v.izmjena}
					<Badge variant="outline" class="border-primary-foreground/40 text-primary-foreground"
						>🟢 Važeće · Izmijenjeno: {v.izmjena}</Badge
					>
				{/if}
			</div>
			<h1 class="mt-2 text-2xl font-bold tracking-tight">{v.naziv}</h1>
			<p class="mt-2 text-4xl font-extrabold tracking-tight">
				{v.kazna_min === v.kazna_max ? `${v.kazna_min} KM` : `${v.kazna_min}–${v.kazna_max} KM`}
			</p>
			{#if v.kazna_min !== v.kazna_max}
				<p class="mt-2 text-sm opacity-80">
					Tačan iznos u rasponu određuje policijski službenik prekršajnim nalogom ili sud za
					prekršaje.
				</p>
			{/if}
			<div class="mt-4 grid grid-cols-3 gap-2 text-center">
				<div class="rounded-lg bg-primary-foreground/10 p-3">
					<p class="text-xs opacity-70">Bodovi</p>
					<p class="text-lg font-bold">{v.bodovi}</p>
				</div>
				<div class="rounded-lg bg-primary-foreground/10 p-3">
					<p class="text-xs opacity-70">Zabrana</p>
					<p class="text-lg font-bold">{v.zabrana}</p>
				</div>
				<div class="rounded-lg bg-primary-foreground/10 p-3">
					<p class="text-xs opacity-70">Zatvor</p>
					<p class="text-lg font-bold">{v.zatvor}</p>
				</div>
			</div>
			<Button
				variant="secondary"
				onclick={copyReport}
				class="mt-4 h-12 w-full text-base font-semibold"
			>
				{copied ? 'Kopirano ✓' : 'Kopiraj za zapisnik'}
			</Button>
			<Button
				variant="outline"
				onclick={copyOsnov}
				class="mt-2 h-12 w-full border-primary-foreground/30 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
			>
				{copiedOsnov ? 'Kopirano ✓' : '📋 Kopiraj pravni osnov'}
			</Button>
		</Card.Content>
	</Card.Root>

	{#if v.postupanje?.length}
		<Card.Root>
			<Card.Header>
				<Card.Title>Šta da radim?</Card.Title>
				<Card.Description>Pomoćni podsjetnik — provjeri prema važećem službenom postupku.</Card.Description>
			</Card.Header>
			<Card.Content>
				<ol class="list-decimal space-y-2 pl-5 text-sm">
					{#each v.postupanje as korak}
						<li>{korak}</li>
					{/each}
				</ol>
			</Card.Content>
		</Card.Root>
	{/if}

	<Card.Root>
		<Card.Header>
			<Card.Title>Pravna osnova</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-5 text-sm">
			<section>
				<h3 class="text-xs font-bold tracking-wide text-muted-foreground uppercase">
					Šta je zabranjeno?
				</h3>
				<p class="mt-1"><strong>Norma:</strong> {v.clan_norme}</p>
				<p class="text-muted-foreground italic">“{v.citat_norme}”</p>
			</section>
			<section>
				<h3 class="text-xs font-bold tracking-wide text-muted-foreground uppercase">
					Kolika je kazna?
				</h3>
				<p class="mt-1"><strong>Sankcija:</strong> {v.clan_sankcije}</p>
				<p class="text-muted-foreground italic">“{v.citat_sankcije}”</p>
			</section>
			<section>
				<h3 class="text-xs font-bold tracking-wide text-muted-foreground uppercase">
					Dodatne mjere
				</h3>
				<p class="mt-1 text-muted-foreground">{v.opis}</p>
			</section>
			{#if v.povezano?.length}
				<section>
					<h3 class="text-xs font-bold tracking-wide text-muted-foreground uppercase">
						Povezani članovi
					</h3>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each v.povezano as p}
							<a href={`${base}/?q=${encodeURIComponent(p)}`}>
								<Badge variant="outline" class="h-9 px-3 text-sm">{p}</Badge>
							</a>
						{/each}
					</div>
				</section>
			{/if}
			<p class="text-xs text-muted-foreground">
				Status: {v.status} · Izvor: {v.source_md} ·
				<a
					class="text-primary underline"
					href="https://www.parlament.ba/law/LawDetails?lawId=1218"
					target="_blank"
					rel="noreferrer">parlament.ba lawId=1218</a
				>
			</p>
		</Card.Content>
	</Card.Root>
</article>
