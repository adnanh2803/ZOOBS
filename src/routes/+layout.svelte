<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();
	let installEvt = $state<(Event & { prompt: () => Promise<void> }) | null>(null);

	onMount(() => {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			installEvt = e as Event & { prompt: () => Promise<void> };
		});
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register(`${base}/sw.js`).catch(() => {
				// Offline unavailable (e.g. dev server) — app still works online.
			});
		}
	});

	async function installApp() {
		if (!installEvt) return;
		await installEvt.prompt();
		installEvt = null;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="manifest" href="{base}/manifest.webmanifest" />
	<link rel="apple-touch-icon" href="{base}/icons/icon-180.png" />
	<meta name="theme-color" content="#171717" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
		<p>Izvor: Parlamentarna skupština BiH, lawId=1218. Posljednja provjerena izmjena: 35/2026.</p>
		{#if installEvt}
			<p>
				<Button variant="outline" size="sm" onclick={installApp} class="h-11">
					📲 Instaliraj aplikaciju (offline)
				</Button>
			</p>
		{/if}
	</footer>
</div>
