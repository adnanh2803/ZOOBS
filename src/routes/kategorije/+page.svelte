<script lang="ts">
	import { base } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { violations } from '$lib/search';
	import { KATEGORIJE } from '$lib/types';
</script>

<h1 class="mb-4 text-2xl font-bold tracking-tight">Kategorije</h1>
<ul class="grid gap-3">
	{#each KATEGORIJE as k}
		{@const n = violations.filter((v) => v.kategorija === k).length}
		<li>
			<a href={`${base}/?kat=${encodeURIComponent(k)}`} class="block">
				<Card.Root class="transition-colors hover:border-primary">
					<Card.Content class="flex items-center justify-between gap-2 p-4">
						<span class="text-lg font-semibold">{k}</span>
						<Badge variant="secondary">{n} zapisa</Badge>
					</Card.Content>
				</Card.Root>
			</a>
		</li>
	{/each}
</ul>
