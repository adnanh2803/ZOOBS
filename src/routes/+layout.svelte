<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Saobraćajni priručnik BiH — brza pretraga prekršaja</title>
	<meta
		name="description"
		content="Brza pretraga prekršaja iz Zakona o osnovama sigurnosti saobraćaja na putevima u BiH za policijske službenike."
	/>
</svelte:head>

<div class="min-h-screen bg-slate-100 text-slate-900">
	<header class="sticky top-0 z-10 border-b bg-primary text-primary-foreground">
		<div class="mx-auto flex max-w-4xl items-center justify-between gap-2 px-3 py-2 sm:px-4">
			<a href="{base}/" class="truncate text-base font-bold sm:text-lg">🚔 Saobraćajni priručnik BiH</a>
			<nav class="flex shrink-0 gap-1 text-sm">
				<Button variant="ghost" size="sm" href="{base}/" class="h-11 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Pretraga</Button>
				<Button variant="ghost" size="sm" href="{base}/kategorije" class="h-11 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Kategorije</Button>
			</nav>
		</div>
	</header>
	<main class="mx-auto max-w-4xl px-4 py-6">
		{@render children()}
	</main>
	<footer class="mx-auto max-w-4xl space-y-1 px-4 pb-10 text-xs text-muted-foreground">
		<p>
			⚠️ Pravna napomena: aplikacija služi kao pomoćno sredstvo za brzo pronalaženje propisa.
			U slučaju neslaganja, mjerodavan je tekst objavljen u „Službenom glasniku Bosne i
			Hercegovine“.
		</p>
		<p>Izvor: Parlamentarna skupština BiH, lawId=1218. Posljednja provjerena izmjena: novembar 2024.</p>
	</footer>
</div>
