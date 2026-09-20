<script lang="ts">
	import { base } from '$app/paths';
	import { violations } from '$lib/search';
	import { KATEGORIJE } from '$lib/types';
</script>

<h1 class="mb-4 text-2xl font-bold">Kategorije</h1>
<ul class="grid gap-3">
	{#each KATEGORIJE as k}
		{@const n = violations.filter((v) => v.kategorija === k).length}
		<li>
			<a
				href={`${base}/?kat=${encodeURIComponent(k)}`}
				class="block rounded-xl border bg-white p-4 shadow-sm hover:border-blue-600"
			>
				<span class="text-lg font-semibold">{k}</span>
				<span class="ml-2 text-sm text-slate-500">{n} zapisa</span>
			</a>
		</li>
	{/each}
</ul>
