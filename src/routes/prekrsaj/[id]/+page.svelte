<script lang="ts">
	let { data } = $props();
	let v = $derived(data.v);
	let copied = $state(false);

	async function copyReport() {
		const txt = `${v.naziv}\n${v.clan_norme} -> ${v.clan_sankcije}\nKazna: ${v.kazna_min}-${v.kazna_max} KM\nBodovi: ${v.bodovi}\nZabrana: ${v.zabrana}`;
		await navigator.clipboard.writeText(txt);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<a href="/" class="text-sm text-blue-700 hover:underline">← Nazad na pretragu</a>

<article class="mt-3 space-y-4">
	<div class="rounded-xl bg-slate-900 p-5 text-white">
		<p class="text-xs uppercase tracking-wide text-slate-300">{v.kategorija}</p>
		<h1 class="mt-1 text-2xl font-bold">{v.naziv}</h1>
		<p class="mt-2 text-3xl font-extrabold">
			{v.kazna_min === v.kazna_max ? `${v.kazna_min} KM` : `${v.kazna_min}–${v.kazna_max} KM`}
		</p>
		{#if v.kazna_min !== v.kazna_max}
			<p class="mt-2 text-xs text-slate-300">
				Tačan iznos u rasponu određuje policijski službenik prekršajnim nalogom ili sud za
				prekršaje.
			</p>
		{/if}
		<div class="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
			<div class="rounded-lg bg-white/10 p-2">
				<p class="text-xs text-slate-300">Bodovi</p>
				<p class="font-bold">{v.bodovi}</p>
			</div>
			<div class="rounded-lg bg-white/10 p-2">
				<p class="text-xs text-slate-300">Zabrana</p>
				<p class="font-bold">{v.zabrana}</p>
			</div>
			<div class="rounded-lg bg-white/10 p-2">
				<p class="text-xs text-slate-300">Zatvor</p>
				<p class="font-bold">{v.zatvor}</p>
			</div>
		</div>
		<button
			onclick={copyReport}
			class="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500"
		>
			{copied ? ' Kopirano ✓' : 'Kopiraj za zapisnik'}
		</button>
	</div>

	<section class="rounded-xl border bg-white p-4">
		<h2 class="font-bold">Pravna osnova</h2>
		<p class="mt-1 text-sm"><strong>Norma:</strong> {v.clan_norme}</p>
		<p class="mt-1 text-sm text-slate-700 italic">“{v.citat_norme}”</p>
		<p class="mt-3 text-sm"><strong>Sankcija:</strong> {v.clan_sankcije}</p>
		<p class="mt-1 text-sm text-slate-700 italic">“{v.citat_sankcije}”</p>
		<p class="mt-2 text-sm text-slate-600">{v.opis}</p>
		<p class="mt-2 text-xs text-slate-500">
			Status: {v.status} · Izvor: {v.source_md} ·
			<a
				class="text-blue-700 underline"
				href="https://www.parlament.ba/law/LawDetails?lawId=1218"
				target="_blank"
				rel="noreferrer">parlament.ba lawId=1218</a
			>
		</p>
	</section>
</article>
