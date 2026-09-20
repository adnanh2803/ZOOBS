<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
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
	<header class="sticky top-0 z-10 border-b bg-slate-900 text-white">
		<div class="mx-auto flex max-w-4xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
			<a href="{base}/" class="truncate text-base font-bold sm:text-lg">🚔 Saobraćajni priručnik BiH</a>
			<nav class="flex shrink-0 gap-3 text-sm">
				<a href="{base}/" class="underline-offset-4 hover:underline">Pretraga</a>
				<a href="{base}/kategorije" class="underline-offset-4 hover:underline">Kategorije</a>
			</nav>
		</div>
	</header>
	<main class="mx-auto max-w-4xl px-4 py-6">
		{@render children()}
	</main>
	<footer class="mx-auto max-w-4xl px-4 pb-10 text-xs text-slate-500">
		<p>
			Informativno. Mjerodavan je Službeni glasnik BiH. Izvor: Parlamentarna skupština BiH,
			lawId=1218, Neslužbeni prečišćeni tekst novembar 2024.
		</p>
	</footer>
</div>
